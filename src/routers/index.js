import Vue from 'vue'
import Router from 'vue-router'
import store from 'store2'
import BasicWrapper from '@/layouts/BasicWrapper.vue'
import { postRefreshSSOToken } from '@/apis/sso'
import { AUTH_TOKEN, USER_INFO } from '@/config'
import ssoRouters from './sso'
import system from './system'
import checkpoint from './checkpoint'
import user from './user'
import fame from './fame'
import purification from './purification'
import playground from './playground'
import audit from './audit'
import feedback from './feedback'
import archive from './archive'
import operationdata from './operationdata'
import training from './training'
import client from './client'

Vue.use(Router)
/* eslint-disable */

const refreshSSOToken = async (next) => {
  try {
    const oldToken = store.get(AUTH_TOKEN)
    const data = await postRefreshSSOToken({ token: oldToken })
    const { token, permissions } = data
    store.set(AUTH_TOKEN, token)
    store.set(USER_INFO, data)
    store.set('perms', permissions || [])
    Vue.prototype.$_auth.updateAuthCode(permissions || [])
    next()
  } catch (error) {
    next('/login')
  }
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  },
  routes: [
    ...ssoRouters,
    {
      path: '/',
      component: BasicWrapper,
      beforeEnter: async (to, from, next) => {
        refreshSSOToken(next)
      },
      children: [
        ...system,
        ...checkpoint,
        ...user,
        ...fame,
        ...feedback,
        ...purification,
        ...playground,
        ...audit,
        ...archive,
        ...operationdata,
        ...training,
        ...client,
      ],
    },
  ],
})

// TODO 需要修改 vue-authplugin 插件逻辑，支持配置项目权限字段
router.beforeEach((to, from, next) => {
  const perms = store.get('perms')
  Vue.prototype.$_auth.updateAuthCode(perms || [])
  next()
})

export default router
