// 实现对axios
import axios from 'axios'
import store from '@/store'

// 通过axios创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基准地址
  timeout: 5000 // request timeout
})

service.interceptors.request.use()
// 请求拦截器
service.interceptors.request.use((config) => {
  const token = store.getters.token
  if (token) {
    // if (isCheckTimeOut()) {
    //   store.dispatch('user/logout')
    //   router.push('/login')
    //   return Promise.reject(new Error('token过期'))
    // }
    config.headers.Authorization = `${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 响应拦截器
// service.interceptors.response.use((response) => {
//   // console.log(response)
//   if (response.data.success) {
//     const { msg, success } = response.data
//     if (success) {
//       return response.data
//     } else {
//       Message.error(msg)
//       return Promise.reject(new Error(msg))
//     }
//   } else {
//     return response.data
//   }
// }, (error) => {
//   if (error.response && error.response.data && error.response.status === 401) {
//     store.dispatch('user/logout')
//     router.push('/login')
//   } else {
//     Message.error(error.response.data || error.message || '请求失败')
//   }
//   return Promise.reject(error)
// })

export default service
