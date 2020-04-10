import Mutation from '@what-a-faka/obj-mutation'

export const filterFields = () => {
  return [
    {
      type: 'string',
      title: '创建时间',
      name: 'month_day',
      widget: 'datetimepicker',
      xProps: {
        type: 'date',
        format: 'MM-dd',
        'value-format': 'MM-dd',
        'default-value': `2008-${new Date().getMonth() +
          1}-${new Date().getDay()}`,
        'popper-class': 'cl_date_picker_popper',
      },
    },
  ]
}

export const filtersMutateInit = new Mutation({})

export const editFields = (vm) => {
  return [
    {
      type: 'string',
      title: '事件日期',
      name: 'date',
      widget: 'datetimepicker',
      rules: [{ required: true, message: '事件日期必填' }],
      xProps: {
        type: 'date',
        placeholder: '请输入事件日期',
        format: 'yyyy-MM-dd',
        'value-format': 'yyyy-MM-dd',
      },
    }, // 事件日期

    {
      type: 'string',
      title: '标题',
      name: 'name',
      widget: 'text',
      rules: [
        { required: true, message: '事件标题必填' },
        { max: 100, message: '不可以超过100个字' },
      ],
      xProps: {
        placeholder: '请输入事件标题',
      },
    }, // 事件标题

    {
      type: 'number',
      title: '帮助页链接',
      name: 'help_page',
      widget: 'select',
      xProps: {
        placeholder: '请选择',
        options: vm.helpCenterOpts,
      },
    }, // 帮助页链接

    {
      type: 'string',
      title: '备注',
      name: 'remark',
      widget: 'text',
      xProps: {
        type: 'textarea',
      },
    }, // 备注
  ]
}
