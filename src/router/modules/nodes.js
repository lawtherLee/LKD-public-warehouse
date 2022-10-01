import Layout from '@/layout'
export default {
  path: '/dashboard1',
  name: 'dashboard1',
  component: Layout,
  meta: { title: '点位管理', icon: 'dwgl' },
  children: [
    {
      path: '/node/region',
      name: 'region',
      component: () => import('@/views/node/region'),
      meta: { title: '区域管理' }

    },
    {
      path: '/node/node',
      name: 'node',
      component: () => import('@/views/node/node'),
      meta: { title: '点位管理' }

    },
    {
      path: '/node/partner',
      name: 'partner',
      component: () => import('@/views/node/partner'),
      meta: { title: '合作商管理' }

    }
  ]
}
