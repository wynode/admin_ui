export default [
  {
    path: '/log/access',
    name: 'logAccess',
    component: () => import('@/views/log/AccessLogList.vue'),
  },
  {
    path: '/log/attack',
    name: 'logAttack',
    component: () => import('@/views/log/AttackLogList.vue'),
  },
  {
    path: '/log/setting',
    name: 'logSetting',
    component: () => import('@/views/log/LogSetting.vue'),
  },
  {
    path: '/safe/ip',
    name: 'ipList',
    component: () => import('@/views/safe/ip/IpList.vue'),
  },
  {
    path: '/safe/base',
    name: 'baseSetting',
    component: () => import('@/views/safe/base/BaseSetting.vue'),
  },
  {
    path: '/safe/params',
    name: 'paramFilter',
    component: () => import('@/views/safe/params/ParamsFilter.vue'),
  },
]
