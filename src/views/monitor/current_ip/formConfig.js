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

export const ipFields = () => {
  return [
    // {
    //   title: '类型',
    //   name: 'type',
    //   widget: 'select',
    //   xProps: {
    //     filterable: true,
    //     options: [
    //       { label: '白名单', value: 1 },
    //       { label: '黑名单', value: 2 },
    //     ],
    //   },
    //   // rules: [{ required: true, message: '请填写用户账号', trigger: 'blur' }],
    // },
    {
      title: '过期时间',
      name: 'expire',
      widget: 'datetimepicker',
      xProps: {
        type: 'datetime',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now()
          },
        },
        placeholder: '如果永久不过期请不要选择',
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

export const whiteFields = () => {
  return [
    // {
    //   title: '类型',
    //   name: 'type',
    //   widget: 'select',
    //   xProps: {
    //     filterable: true,
    //     options: [
    //       { label: '白名单', value: 1 },
    //       { label: '黑名单', value: 2 },
    //     ],
    //   },
    //   // rules: [{ required: true, message: '请填写用户账号', trigger: 'blur' }],
    // },

    {
      title: '备注',
      name: 'note',
      widget: 'text',
      // rules: [{ required: true, message: '请填写用户账号', trigger: 'blur' }],
    },
  ]
}

export const notifyFields = () => {
  return [
    {
      type: 'string',
      title: 'ip筛选',
      name: 'ip',
      widget: 'text',
    },
    // rules: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
  ]
}
