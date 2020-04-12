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
          { label: '黑名单', value: '1' },
          { label: '白名单', value: '2' },
        ],
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
