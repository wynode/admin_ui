export default [
  {
    path: '/operation_data',
    name: 'OperationData',
    meta: {
      title: '运营数据',
      breadcrumb: ['首页', '运营数据'],
    },
    component: () => import('@/views/operationdata/OperationData.vue'),
  },
]
