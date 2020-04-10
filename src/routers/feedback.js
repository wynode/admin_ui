export default [
  {
    path: '/feedback',
    name: 'Feedback',
    meta: {
      title: '用户反馈',
      breadcrumb: ['首页', '问题反馈'],
    },
    component: () => import('@/views/feedback/Feedback.vue'),
  },
]
