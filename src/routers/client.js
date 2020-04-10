export default [
  {
    path: '/client/customers',
    name: 'customerList',
    component: () => import('@/views/client/customer/CustomerList.vue'),
    meta: {
      title: '客户列表',
      breadcrumb: ['客户管理', '客户列表'],
    },
  }, // 客户列表管理

  {
    path: '/client/customer/:id',
    name: 'customerDetails',
    component: () => import('@/views/client/customer/CustomerDetails.vue'),
    meta: {
      title: '客户详情',
      breadcrumb: ['客户管理', '客户详情'],
    },
  }, // 客户详情

  {
    path: '/client/business',
    name: 'businessList',
    component: () => import('@/views/client/business/BusinessList.vue'),
    meta: {
      title: '业务列表',
      breadcrumb: ['客户管理', '业务列表'],
    },
  }, // 业务列表管理
]
