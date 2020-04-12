export const ChangeFields = () => {
  return [
    {
      title: '管理名称',
      name: 'adminName',
      widget: 'text',
      rules: [{ required: true, message: '请填写管理帐号', trigger: 'blur' }],
    },
    {
      title: '管理帐号',
      name: 'adminAccount',
      widget: 'text',
      rules: [{ required: true, message: '请填写管理帐号', trigger: 'blur' }],
    },
    {
      title: '密码',
      name: 'adminPassword',
      widget: 'text',
      rules: [{ required: true, message: '请填写密码', trigger: 'blur' }],
      xProps: {
        'show-password': true,
      },
    },
  ]
}
