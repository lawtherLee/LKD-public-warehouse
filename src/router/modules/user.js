import Layout from '@/layout'
export default {
  path: '/dashboard23',
  name: 'dashboard23',
  component: Layout,
  meta: { title: '人员管理', icon: 'rygl' },
  children: [
    {
      path: '/user/index',
      name: 'Index',
      component: () => import('@/views/user/index'),
      meta: { title: '人员列表' }

    },
    {
      path: '/user/user-task',
      name: 'user-task',
      component: () => import('@/views/user/user-task'),
      meta: { title: '人效统计' }

    },
    {
      path: '/user/user-work',
      name: 'user-work',
      component: () => import('@/views/user/user-work'),
      meta: { title: '工作量列表' }

    }
  ]
}
