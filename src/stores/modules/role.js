import { fetchPermsConfig, fetchRoles } from '@/apis/role'

/* eslint-disable no-param-reassign */
export default {
  namespaced: true,

  state: {
    permsConfig: [],
    roles: [],
  },

  getters: {
    allPerms(state) {
      const result = []
      state.permsConfig.forEach((permObj) => {
        result.push(...permObj.perms.map((perm) => perm.codename))
      })
      return result
    },
  },

  mutations: {
    setpermsConfig(state, data) {
      state.permsConfig = data
    },
    setRoles(state, data) {
      state.roles = data
    },
  },

  actions: {
    async fetchPermsConfig(context) {
      const config = await fetchPermsConfig()
      context.commit('setpermsConfig', config)
    },

    async fetchAllRoles(context, params = {}) {
      const para = {
        page_size: 9999,
        ...params,
      }

      const roles = (await fetchRoles(para)).results || []
      context.commit('setRoles', roles)
    },
  },
}
