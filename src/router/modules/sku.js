import Layout from '@/layout'
export default {
  path: '/dashboard44',
  name: 'dashboard44',
  component: Layout,
  meta: { title: '商品管理', icon: 'spgl' },
  children: [
    {
      path: '/sku/sku-class',
      name: 'sku-class',
      component: () => import('@/views/sku/sku-class'),
      meta: { title: '商品类型' }

    },
    {
      path: '/sku/sku',
      name: 'sku',
      component: () => import('@/views/sku/sku'),
      meta: { title: '商品管理' }

    }
  ]
}
