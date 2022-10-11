// 实现对axios
import axios from 'axios'
import store from '@/store'
// 通过axios创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基准地址
  timeout: 5000 // request timeout
})

service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = `${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})
// 请求拦截器
service.interceptors.response.use()

export default service
