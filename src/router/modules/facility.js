import Layout from '@/layout'
export default {
  path: '/dashboard11',
  name: 'dashboard11',
  component: Layout,
  meta: { title: '设备管理', icon: 'sbgl' },
  children: [
    {
      path: '/vm/index',
      name: 'index',
      component: () => import('@/views/Vm/index'),
      meta: { title: '设备管理' }

    },
    {
      path: '/vm/status',
      name: 'status',
      component: () => import('@/views/Vm/status'),
      meta: { title: '设备状态' }

    },
    {
      path: '/vm/type',
      name: 'type',
      component: () => import('@/views/Vm/type'),
      meta: { title: '设备类型管理管理' }

    }
  ]
}
