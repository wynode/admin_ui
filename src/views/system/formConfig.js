export const LoginFields = () => {
  return [
    // {
    //   title: '用户名',
    //   name: 'adminName',
    //   widget: 'text',
    //   rules: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
    // },
    {
      title: '用户账号',
      name: 'adminAccount',
      widget: 'text',
      rules: [{ required: true, message: '请填写用户账号', trigger: 'blur' }],
    },
    {
      title: '密码',
      name: 'adminPassword',
      widget: 'text',
      rules: [{ required: true, message: '请填写用户密码', trigger: 'blur' }],
      xProps: {
        'show-password': true,
      },
    },
    // {
    //   title: '验证码',
    //   name: 'adminPassword',
    //   widget: 'text',
    //   rules: [{ required: true, message: '请填写用户密码', trigger: 'blur' }],
    //   xProps: {
    //     'show-password': true,
    //   },
    // },
  ]
}

export const RegisterFields = () => {
  return [
    {
      title: '用户名',
      name: 'adminName',
      widget: 'text',
      rules: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
    },
    {
      title: '用户账号',
      name: 'adminAccount',
      widget: 'text',
      rules: [{ required: true, message: '请填写用户账号', trigger: 'blur' }],
    },
    {
      title: '密码',
      name: 'adminPassword',
      widget: 'text',
      rules: [{ required: true, message: '请填写用户密码', trigger: 'blur' }],
      xProps: {
        'show-password': true,
      },
    },
  ]
}

export const PhoneFields = () => {
  return [
    {
      title: '手机号',
      name: 'phone',
      widget: 'text',
      rules: [{ required: true, message: '请填写手机号', trigger: 'blur' }],
    },
  ]
}

export const notifyFields = () => {
  return [
    {
      type: 'datetime',
      title: '通知时间',
      name: 'notify_date',
      widget: 'datetimepicker',
      xProps: {
        type: 'daterange',
        'value-format': 'yyyyMMdd',
      },
    },
  ]
}
