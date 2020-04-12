export default [
  {
    path: '/user/list',
    name: 'userList',
    meta: {
      title: '账户设置',
      breadcrumb: ['系统管理', '账户设置'],
    },
    component: () => import('@/views/users/userList/UserList.vue'),
  },
  // {
  //   path: '/user/profile/:id',
  //   name: 'userProfile',
  //   meta: {
  //     title: '用户详情',
  //     breadcrumb: ['用户管理', '用户详情'],
  //   },
  //   component: () => import('@/views/users/userList/UserProfile.vue'),
  // },
]
