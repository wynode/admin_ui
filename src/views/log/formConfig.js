export const ChangeFields = () => {
  return [
    {
      title: '最大保留天数',
      name: 'maxStorageDate',
      widget: 'text',
      // rules: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
    },
    {
      title: '记录COOKIE',
      name: 'isWriteCookieData',
      widget: 'text',
      // rules: [{ required: true, message: '请填写用户账号', trigger: 'blur' }],
    },
    {
      title: '记录POST',
      name: 'isWritePostData',
      widget: 'text',
      // rules: [{ required: true, message: '请填写用户密码', trigger: 'blur' }],
    },
    {
      title: '记录HEADER',
      name: 'isWriteHeaderData',
      widget: 'text',
      // rules: [{ required: true, message: '请填写用户密码', trigger: 'blur' }],
    },
  ]
}
