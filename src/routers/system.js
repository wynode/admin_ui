export default [
  {
    path: '/notify-list',
    name: 'notifyList',
    meta: {
      title: '通知列表',
      breadcrumb: ['系统管理', '短信预警', '通知列表'],
    },
    component: () => import('@/views/system/NotifyList.vue'),
  },

  {
    path: '/phone-list',
    name: 'phoneList',
    meta: {
      title: '通知号码列表',
      breadcrumb: ['用户管理', '用户详情', '通知号码列表'],
    },
    component: () => import('@/views/system/PhoneList.vue'),
  },
]
