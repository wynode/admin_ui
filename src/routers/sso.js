import Vue from 'vue'
import axios from 'axios'
import store from 'store2'
import {
  SERVER_API,
  SSO_LOGIN,
  SSO_LOGOUT,
  SSO_CHANGE_PASSWORD,
  AUTH_TOKEN,
  USER_INFO,
} from '@/config'

export default [
  {
    path: '/login/',
    name: 'ssoLogin',
    beforeEnter(to) {
      const redirect = encodeURIComponent(to.query.redirect || '')
      if (redirect) {
        window.location.replace(`${SSO_LOGIN}?redirect=${redirect}`)
      }
      window.location.replace(SSO_LOGIN)
    },
  },
  {
    path: '/logout/',
    name: 'ssoLogout',
    beforeEnter() {
      store.clearAll()
      window.location.replace(SSO_LOGOUT)
    },
  },
  {
    path: '/changepwd/',
    name: 'ssoChangePwd',
    beforeEnter() {
      window.location.replace(SSO_CHANGE_PASSWORD)
    },
  },
  {
    path: '/sso/cas/auth/',
    name: 'ssoCasAuth',
    async beforeEnter(to, _, next) {
      try {
        const { ticket } = to.query
        const data = await axios
          .get(`${SERVER_API}/sso/cas/auth/?ticket=${ticket}`)
          .then((response) => response.data)
        const { token, permissions } = data
        store.set(AUTH_TOKEN, token)
        store.set(USER_INFO, data)
        store.set('perms', permissions || [])
        Vue.prototype.$_auth.updateAuthCode(permissions || [])
        next('/')
      } catch (error) {
        next('/logout')
      }
    },
  },
]
