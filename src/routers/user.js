export default [
  {
    path: '/user/list',
    name: 'userList',
    component: () => import('@/views/users/userList/UserList.vue'),
  },
  {
    path: '/user/profile/:id',
    name: 'userProfile',
    component: () => import('@/views/users/userList/UserProfile.vue'),
  },
]
