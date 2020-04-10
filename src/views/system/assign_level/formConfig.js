export const assignLevelFields = (vm) => {
  return [
    {
      type: 'string',
      title: '领单等级名称',
      name: 'name',
      widget: 'text',
      rules: [{ required: true, message: '领单等级名称必填', trigger: 'blur' }],
      xProps: {
        min: 0,
        controlsPosition: 'right',
        placeholder: '请输入领单等级名称',
      },
    },

    {
      type: 'string',
      title: '单次领单数量',
      name: 'once_assign_number',
      widget: 'text',
      rules: [{ required: true, message: '单次领单数量必填', trigger: 'blur' }],
      xProps: {
        min: 0,
        controlsPosition: 'right',
        placeholder: '请输入单次领单数量',
      },
    },

    {
      title: '净网类型名称',
      name: 'purify_config',
      widget: 'select',
      rules: [{ required: true, message: '净网类型名称必填', trigger: 'blur' }],
      xProps: {
        filterable: true,
        options: vm.purifyData,
      },
    },
  ]
}
