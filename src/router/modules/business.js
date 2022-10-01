import Layout from '@/layout'
export default {
  path: '/dashboard',
  name: 'dashboard',
  component: Layout,
  meta: { title: '工单管理', icon: 'gdgl' },
  children: [
    {
      path: '/task/business',
      name: 'business',
      component: () => import('@/views/task/business'),
      meta: { title: '运营工单' }

    },
    {
      path: '/task/operation',
      name: 'business',
      component: () => import('@/views/task/Operator'),
      meta: { title: '运维工单' }

    }
  ]
}
