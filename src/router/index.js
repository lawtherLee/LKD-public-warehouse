import Vue from 'vue'
import Router from 'vue-router'
// import business from './modules/business.js'
// import nodes from './modules/nodes'
// import facility from './modules/facility'
// import user from './modules/user'
// import sku from './modules/sku'
// import policy from './modules/policy'
// import order from './modules/order'
// import report from './modules/report'

Vue.use(Router)
// const asyncRoutes = [business, nodes, facility, user, sku, policy, order, report]
/* Layout */
import Layout from '@/layout'

// 一次性导入动态路由
const res = require.context('@/router/modules', false, /\.js$/)
const asyncRouters = res.keys().map(ele => res(ele).default)

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '帝可得', icon: 'home' }
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  // routes: constantRoutes
  routes: [...constantRoutes, ...asyncRouters]
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
