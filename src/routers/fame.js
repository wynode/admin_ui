export default [
  {
    path: '/fame/genius',
    name: 'geniusList',
    meta: {
      title: '段位配置',
      breadcrumb: ['称号管理', '段位配置'],
    },
    component: () => import('@/views/fame/genius/Genius.vue'),
  },
]
