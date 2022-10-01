import { loginAPI } from '@/api/login'
import { Message } from 'element-ui'
export default {
  namespaced: true,
  state: {
    token: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    RMOVE_TOKEN(state) {
      state.token = null
    }
  },
  actions: {
    async loginAction({ commit }, loginData) {
      const { data } = await loginAPI(loginData)
      try {
        if (data.token !== null) {
          commit('setToken', data.token)
          Message.success(data.msg)
        } else {
          Message.error(data.msg)
        }
      } catch (err) {
        throw Error(err.message)
      }
    },
    logout({ commit }) {
      // 清除用户数据  token
      commit('RMOVE_TOKEN')
    }
  }
}
