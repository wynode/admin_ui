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

export const notifyFields = () => {
  return [
    {
      title: '排序类型',
      name: 'orderType',
      widget: 'select',
      xProps: {
        filterable: true,
        options: [
          { label: 'qps', value: 1 },
          { label: '访问频率', value: 2 },
          { label: '访问总次数', value: 3 },
        ],
      },
      // rules: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
    },
  ]
}
