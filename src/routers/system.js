export default [
  {
    path: '/notify-list',
    name: 'notifyList',
    component: () => import('@/views/system/NotifyList.vue'),
  },

  {
    path: '/phone-list',
    name: 'phoneList',
    component: () => import('@/views/system/PhoneList.vue'),
  },
]
