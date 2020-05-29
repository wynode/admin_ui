export default [
  {
    path: '/log/access',
    name: 'logAccess',
    meta: {
      title: '请求日志',
      breadcrumb: ['日志管理', '请求日志'],
    },
    component: () => import('@/views/log/AccessLogList.vue'),
  },
  {
    path: '/log/attack',
    name: 'logAttack',
    meta: {
      title: '攻击日志',
      breadcrumb: ['日志管理', '攻击日志'],
    },
    component: () => import('@/views/log/AttackLogList.vue'),
  },
  // {
  //   path: '/log/setting',
  //   name: 'logSetting',
  //   meta: {
  //     title: '日志设置',
  //     breadcrumb: ['日志管理', '日志设置'],
  //   },
  //   component: () => import('@/views/log/LogSetting.vue'),
  // },
  {
    path: '/safe/ip',
    name: 'ipList',
    meta: {
      title: 'IP黑白名单',
      breadcrumb: ['安全防护', 'IP黑白名单'],
    },
    component: () => import('@/views/safe/ip/IpList.vue'),
  },
  {
    path: '/safe/sql',
    name: 'sql',
    meta: {
      title: 'sql注入白名单路径',
      breadcrumb: ['安全防护', 'sql注入白名单路径'],
    },
    component: () => import('@/views/safe/sqlInject/SQLInject.vue'),
  },
  {
    path: '/safe/ip-forbidden',
    name: 'ipForbidden',
    meta: {
      title: 'IP地区禁用列表',
      breadcrumb: ['安全防护', 'IP地区禁用列表'],
    },
    component: () => import('@/views/safe/ipForbidden/IPForbidden.vue'),
  },
  {
    path: '/safe/country-ip-forbidden',
    name: 'countryIpForbidden',
    meta: {
      title: 'IP国家禁用列表',
      breadcrumb: ['安全防护', 'IP国家禁用列表'],
    },
    component: () =>
      import('@/views/safe/CountryIpForbidden/CountryIpForbidden.vue'),
  },
  {
    path: '/safe/base',
    name: 'baseSetting',
    meta: {
      title: '基础设置',
      breadcrumb: ['安全防护', '基础设置'],
    },
    component: () => import('@/views/safe/base/BaseSetting.vue'),
  },
  {
    path: '/safe/params',
    name: 'paramFilter',
    meta: {
      title: '参数过滤',
      breadcrumb: ['安全防护', '参数过滤'],
    },
    component: () => import('@/views/safe/params/ParamsFilter.vue'),
  },
  {
    path: '/safe/ua',
    name: 'UAFilter',
    meta: {
      title: 'UA禁用列表',
      breadcrumb: ['安全防护', 'UA禁用列表'],
    },
    component: () => import('@/views/safe/ua/UA.vue'),
  },
  {
    path: '/server-status',
    name: 'serverStatus',
    meta: {
      title: '服务器状态',
    },
    component: () => import('@/views/server/ServerStatus.vue'),
  },
]
