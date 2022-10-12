import Layout from '@/layout'

export default {
  path: '/user',
  name: 'user',
  component: Layout,
  meta: { title: '人员管理', icon: 'rygl' },
  children: [
    {
      path: 'index',
      name: 'UserList',
      component: () => import('@/views/user/UserList'),
      meta: { title: '人员列表' }

    },
    {
      path: 'user-task-stats',
      name: 'user-task-stats',
      component: () => import('@/views/user/UserTaskStats'),
      meta: { title: '人效统计' }

    },
    {
      path: 'user-work',
      name: 'user-work',
      component: () => import('@/views/user/UserWork'),
      meta: { title: '工作量列表' }

    }
  ]
}
