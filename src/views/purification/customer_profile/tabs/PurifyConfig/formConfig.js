export function purifyConfigFields(vm) {
  return [
    {
      title: '净网类型名称',
      name: 'purifyconfig',
      widget: 'select',
      rules: [
        { required: true, message: '请选择净网类型名称', trigger: 'change' },
      ],
      xProps: {
        filterable: true,
        multiple: false,
        options: vm.purifyConfigOptions,
      },
    },
    {
      title: '审核人数',
      name: 'need_verify_count',
      widget: 'radio',
      rules: [{ required: true, message: '请选择审核人数', trigger: 'change' }],
      xProps: {
        options: [
          { label: '1', value: 1 },
          { label: '2', value: 2 },
          { label: '3', value: 3 },
          { label: '5', value: 5 },
        ],
      },
    },
    {
      title: '复核',
      name: 'recheck_action',
      widget: 'radio',
      xProps: {
        options: [
          { label: '不复核', value: '' },
          { label: '违规复核', value: 'recheck_illegal' },
          { label: '正常复核', value: 'recheck_normal' },
        ],
      },
    },
    {
      title: '时效要求',
      name: 'urgency',
      widget: 'radio',
      rules: [
        { required: true, message: '请选择时效要求态', trigger: 'change' },
      ],
      xProps: {
        options: [
          { label: '高', value: 3 },
          { label: '中', value: 2 },
          { label: '低', value: 1 },
        ],
      },
    },
    {
      title: '图片是否公开',
      name: 'image_public',
      widget: 'radio',
      rules: [{ required: true, message: '请选择状态', trigger: 'change' }],
      xProps: {
        options: [
          { label: '是', value: 1 },
          { label: '否', value: 0 },
        ],
      },
    },
    {
      title: '结果推送 URL',
      name: 'result_push_url',
      widget: 'text',
      rules: [{ required: true, message: '请选择填写 URL', trigger: 'change' }],
    },
    {
      title: '关键词分类',
      name: 'kw_category',
      widget: 'select',
      rules: [
        { required: false, message: '请选择关键词分类', trigger: 'blur' },
      ],
      xProps: {
        filterable: true,
        multiple: true,
        'allow-create': true,
        options: vm.kw_categoryOpt.options,
      },
    },
    {
      title: '状态',
      name: 'status',
      widget: 'radio',
      rules: [{ required: true, message: '请选择状态', trigger: 'change' }],
      xProps: {
        options: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 },
        ],
      },
    },
    {
      title: '备注',
      name: 'remark',
      widget: 'text',
      xProps: {
        type: 'textarea',
      },
    },
  ]
}
