export const ChangeFields = () => {
  return [
    {
      title: '链接地址',
      name: 'url',
      widget: 'text',
      // rules: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
    },
    {
      title: 'dnsIP',
      name: 'dnsIp',
      widget: 'text',
      // rules: [{ required: true, message: '请填写用户账号', trigger: 'blur' }],
    },
  ]
}
