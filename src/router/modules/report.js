import Layout from '@/layout'
export default {
  path: '/report',

  component: Layout,
  children: [
    {
      path: '',
      name: 'report',
      component: () => import('@/views/report'),
      meta: { title: '对账统计', icon: 'total' }

    }
  ]
}
