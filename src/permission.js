import router from '@/router'
import store from '@/store'

const whiteList = ['/login', '/404'] // 定义白名单  所有不受权限控制的页面
router.beforeEach((to, from, next) => {
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
