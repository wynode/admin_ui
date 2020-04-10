export default [
  {
    path: '/purification/config',
    name: 'pureConfig',
    meta: {
      title: '净网配置',
      breadcrumb: ['净网管理', '净网配置'],
    },
    component: () => import('@/views/purification/pure_config/PureConfig.vue'),
  },
  {
    path: '/purification/customers',
    name: 'customersList',
    meta: {
      title: '净网配置',
      breadcrumb: ['客户列表', '净网配置'],
    },
    component: () => import('@/views/purification/customers/Customers.vue'),
  },
  {
    path: '/purification/customer/:id',
    name: 'customerProfile',
    meta: {
      title: '净网配置',
      breadcrumb: ['客户列表', '净网配置'],
    },
    component: () =>
      import('@/views/purification/customer_profile/CustomerProfile.vue'),
  },
  {
    path: '/purification/detail/pure',
    name: 'pureDetail',
    meta: {
      title: '净网明细',
      breadcrumb: ['净网管理', '净网明细'],
    },
    component: () => import('@/views/purification/pure_detail/PureDetail.vue'),
  },
  {
    path: '/purification/detail/content',
    name: 'pureContentDetail',
    meta: {
      title: '内容明细',
      breadcrumb: ['净网管理', '内容明细'],
    },
    component: () =>
      import('@/views/purification/prue_content_detail/PureContentDetail.vue'),
  },
  {
    path: '/purification/ranking',
    name: 'prueRanking',
    meta: {
      title: '净网排名',
      breadcrumb: ['净网管理', '净网排名'],
    },
    component: () =>
      import('@/views/purification/pure_ranking/PureRanking.vue'),
  },
  {
    path: '/purification/keywords',
    name: 'keywords',
    meta: {
      title: '净网关键词',
      breadcrumb: ['净网管理', '净网关键词'],
    },
    component: () => import('@/views/purification/keywords/index.vue'),
  },
  {
    path: '/purification/feedback',
    name: 'feedback',
    meta: {
      title: '异议反馈',
      breadcrumb: ['净网管理', '异议反馈'],
    },
    component: () => import('@/views/purification/feedback/Feedback.vue'),
  },
]
