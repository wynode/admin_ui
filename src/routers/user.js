export default [
  {
    path: '/user/list',
    name: 'userList',
    meta: {
      title: '用户列表',
      breadcrumb: ['用户管理', '用户列表'],
    },
    component: () => import('@/views/users/userList/UserList.vue'),
  },
  {
    path: '/user/profile/:id',
    name: 'userProfile',
    meta: {
      title: '用户详情',
      breadcrumb: ['用户管理', '用户详情'],
    },
    component: () => import('@/views/users/userProfile/UserProfile.vue'),
  },
  {
    path: '/user/integral',
    name: 'integral',
    meta: {
      title: '积分明细',
      breadcrumb: ['用户管理', '积分明细'],
    },
    component: () => import('@/views/users/integral/IntegralDetail.vue'),
  },
]
