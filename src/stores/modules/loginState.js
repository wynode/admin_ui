import store from 'store2'
import { AUTH_TOKEN, USER_INFO } from '@/config'

// const types = {}

const states = {}

const mutations = {}

const actions = {}

const getters = {
  isLoggedIn() {
    const token = store.get(AUTH_TOKEN)
    return Boolean(token)
  },

  userInfo() {
    return store.get(USER_INFO)
  },

  username() {
    const userInfo = store.get(USER_INFO)
    return userInfo
      ? userInfo.adminName || userInfo.adminAccount
      : '用户资料错误'
  },
}

export default {
  namespaced: true,
  state: states,
  mutations,
  actions,
  getters,
}
