export function contentConfigFields(vm) {
  return [
    {
      title: '净网类型名称',
      name: 'purifyconfig',
      widget: 'select',
      rules: [{ required: true, message: '净网类型名称必填', trigger: 'blur' }],
      xProps: {
        filterable: true,
        options: vm.categoryOpts,
      },
    },
    {
      title: '内容状态',
      name: 'status',
      widget: 'radio',
      rules: [{ required: true, message: '请选择状态', trigger: 'blur' }],
      xProps: {
        options: [
          { label: '启用', value: 'enable' },
          { label: '禁用', value: 'disable' },
        ],
      },
    },
    {
      title: '正确结果',
      name: 'correct_first_result',
      widget: 'radio',
      rules: [{ required: true, message: '请选择状态', trigger: 'blur' }],
      xProps: {
        options: [
          { label: '正常', value: 'normal' },
          { label: '违规', value: 'illegal' },
        ],
      },
    },
    {
      title: '二级标签',
      name: 'correct_second_result',
      widget: 'select',
      rules: vm.secondRules,
      xProps: {
        filterable: true,
        options: vm.second,
      },
    },
    {
      title: '附件',
      name: 'upload_file',
      widget: 'upload',
      xProps: {
        type: 'imgList',
        disabled: false,
      },
    },
  ]
}
