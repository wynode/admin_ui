import Vue from 'vue'
import Router from 'vue-router'
import BasicWrapper from '@/layouts/BasicWrapper.vue'

import system from './system'
import user from './user'
import home from './home'
import login from './login'

Vue.use(Router)
/* eslint-disable */

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...login,
    {
      path: '/',
      redirect: '/home',
      component: BasicWrapper,
      children: [...user, ...home, ...system],
    },
  ],
})

export default router
