import { loginAPI, userInfoAPI } from '@/api'
import { getToken, setToken, removeToken } from '@/utils/auth'

export default {
  namespaced: true,
  state: {
    token: getToken(),
    userInfo: {},
    likedTime: '' // 时间戳
  },
  mutations: {
    // 设置token
    setToken(state, token) {
      state.token = token
      // 缓存
      setToken(token)
    },

    // 删除token
    removeToken(state) {
      // vuex里删除
      state.token = null
      // cookie删除
      removeToken()
    },

    // 获取用户信息
    setUserInfo(state, userInfo) {
      state.userInfo = JSON.parse(JSON.stringify(userInfo))
    },
    // 删除用户信息
    removeUserInfo(state) {
      state.userInfo = {}
    },

    // 设置时间戳
    setLikedTime(state, time) {
      state.likedTime = time
    }
  },
  actions: {
    async login({ commit }, data) {
      const res = await loginAPI(data)
      commit('setToken', res.data.token)
      commit('setLikedTime', Date.now())

      const baseUserInfo = await userInfoAPI(res.data.userId)
      console.log(baseUserInfo)
      commit('setUserInfo', baseUserInfo)
    },
    logout({ commit }) {
      commit('removeToken')
      commit('removeUserInfo')
    }
  }
}
