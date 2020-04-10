import Vue from 'vue'
import Vuex from 'vuex'
import dialog from './modules/dialog'
import user from './modules/loginState'
import role from './modules/role'
import injectData from './modules/injectData'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    dialog,
    role,
    user,
    injectData,
  },
})
