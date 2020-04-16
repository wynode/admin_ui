export const ChangeFields = () => {
  return [
    {
      title: 'ip',
      name: 'ip',
      widget: 'text',
      // rules: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
    },
    {
      title: '类型',
      name: 'type',
      widget: 'select',
      xProps: {
        filterable: true,
        options: [
          { label: '白名单', value: 1 },
          { label: '黑名单', value: 2 },
          { label: '临时黑名单', value: 3 },
        ],
      },
      // rules: [{ required: true, message: '请填写用户账号', trigger: 'blur' }],
    },
    {
      title: '过期时间',
      name: 'expire',
      widget: 'text',
      xProps: {
        placeholder: '如果永久不过期请传0',
      },
      // rules: [{ required: true, message: '请填写用户账号', trigger: 'blur' }],
    },
    {
      title: '备注',
      name: 'note',
      widget: 'text',
      // rules: [{ required: true, message: '请填写用户账号', trigger: 'blur' }],
    },
  ]
}

export const IpUpdateFields = () => {
  return [
    {
      title: '配置值',
      name: 'value',
      widget: 'text',
      // rules: [{ required: true, message: '请填写用户账号', trigger: 'blur' }],
    },
  ]
}

export const notifyFields = () => {
  return [
    {
      title: '筛选ip类型',
      name: 'type',
      widget: 'select',
      xProps: {
        filterable: true,
        options: [
          { label: '白名单', value: 1 },
          { label: '黑名单', value: 2 },
          { label: '临时黑名单', value: 3 },
        ],
      },
      // rules: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
    },
  ]
}
