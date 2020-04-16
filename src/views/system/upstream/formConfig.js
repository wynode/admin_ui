export const ChangeFields = () => {
  return [
    {
      title: 'host地址',
      name: 'host',
      widget: 'text',
      // rules: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
    },
    {
      title: '端口',
      name: 'port',
      widget: 'text',
      // rules: [{ required: true, message: '请填写用户账号', trigger: 'blur' }],
    },
    {
      title: '模式',
      name: 'schema',
      widget: 'select',
      xProps: {
        filterable: true,
        options: [
          { label: 'https', value: 'https' },
          { label: 'http', value: 'http' },
        ],
      },
      // rules: [{ required: true, message: '请填写用户密码', trigger: 'blur' }],
    },
    {
      title: '权重',
      name: 'weight',
      widget: 'text',
      // rules: [{ required: true, message: '请填写用户密码', trigger: 'blur' }],
    },
    {
      title: '客户host地址',
      name: 'customHost',
      widget: 'text',
      // rules: [{ required: true, message: '请填写用户密码', trigger: 'blur' }],
    },
    {
      title: '是否存活',
      name: 'isAlive',
      widget: 'radio',
      xProps: {
        options: [
          { label: '是', value: 1 },
          { label: '否', value: 0 },
        ],
      },
      // rules: [{ required: true, message: '请填写用户密码', trigger: 'blur' }],
    },
  ]
}
