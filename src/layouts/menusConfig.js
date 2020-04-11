export default (/* vm */) => {
  return [
    {
      title: '首页',
      icon: 'el-icon-s-home',
      router: { name: 'home' },
    },
    {
      title: '系统管理',
      icon: 'el-icon-user',
      children: [
        {
          title: '用户列表',
          router: { name: 'userList' },
        },
        {
          title: '通知列表',
          router: { name: 'notifyList' },
        },
        {
          title: '通知号码列表',
          router: { name: 'phoneList' },
        },
      ],
    },
  ]
}
