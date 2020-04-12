import Vue from 'vue'
import Router from 'vue-router'
import BasicWrapper from '@/layouts/BasicWrapper.vue'

import system from './system'
import user from './user'
import all from './all'
import login from './login'
import monitor from './monitor'

Vue.use(Router)
/* eslint-disable */

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...login,
    {
      path: '/',
      redirect: '/monitor',
      component: BasicWrapper,
      children: [...user, ...all, ...system, ...monitor],
    },
  ],
})

export default router
