import * as filters from '@/filters'

// 时间过滤器
export default (Vue) => {
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })
}
