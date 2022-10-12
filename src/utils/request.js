// 实现对axios封装
import axios from 'axios'

import store from '@/store'
// import { Message } from 'element-ui'
// 通过axios创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基准地址
  timeout: 5000
})
// 请求拦截器
service.interceptors.request.use(
  config => {
    // 请求头
    if (store.getters.token) {
      config.headers.Authorization = `${store.getters.token}`
    }
    return config
  }
)
// 响应拦截器
// service.interceptors.response.use(response => {
//   const { data } = response
//   if (data.size) {
//     return data
//   }
//   if (response.data.success) {
//     // 业务逻辑成功时
//     return data
//   }
//   // 业务逻辑没有成功
//   Message.error(data.msg)
//   return Promise.reject(new Error(data.msg))
// }, error => {
//   Message.error(error.msg)
//   return Promise.reject(new Error(error))
// })
export default service
