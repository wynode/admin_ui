export default [
  {
    path: '/archive/detail/pure',
    name: 'archiveDetail',
    meta: {
      title: '净网明细',
      breadcrumb: ['归档管理', '净网明细'],
    },
    component: () => import('@/views/archive/pure_detail/PureDetail.vue'),
  },
  {
    path: '/archive/detail/content',
    name: 'archiveContentDetail',
    meta: {
      title: '内容明细',
      breadcrumb: ['归档管理', '内容明细'],
    },
    component: () =>
      import('@/views/archive/prue_content_detail/PureContentDetail.vue'),
  },
]
