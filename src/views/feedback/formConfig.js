import Mutation from '@what-a-faka/obj-mutation'
import { join, dateTimeJoin } from '@/utils/common'

export const filtersFields = () => {
  return [
    {
      type: 'date',
      title: '反馈时间',
      name: 'create_time__range',
      widget: 'datetimepicker',
      xProps: {
        type: 'datetimerange',
      },
    }, // 反馈时间

    {
      type: 'date',
      title: '操作时间',
      name: 'operate_time__range',
      widget: 'datetimepicker',
      xProps: {
        type: 'datetimerange',
      },
    }, // 操作时间
    {
      type: 'array',
      title: '操作系统',
      name: 'os',
      widget: 'select',
      xProps: {
        placeholder: '请选择操作系统',
        options: [
          { label: 'Android', value: 'android' },
          { label: 'IOS', value: 'ios' },
        ],
      },
    }, // 操作系统
  ]
}

export const filtersMutation = new Mutation({
  os: { format: join },
  create_time__range: { format: dateTimeJoin },
  operate_time__range: { format: dateTimeJoin },
})

export const bannerFields = () => {
  return [
    {
      type: 'string',
      title: '状态',
      name: 'status',
      widget: 'radio',
      rules: [{ required: true, message: '状态必填', trigger: 'change' }],
      xProps: {
        placeholder: '请输入状态',
        options: [
          {
            label: '已处理',
            value: 1,
          },
          {
            label: '忽略',
            value: 2,
          },
          {
            label: '待处理',
            value: 0,
          },
        ],
      },
    }, // 状态

    {
      type: 'string',
      title: '备注',
      name: 'remark',
      widget: 'text',
      rules: [
        { required: true, message: '备注必填', trigger: 'blur' },
        { max: 200, message: '不可以超过 200 个字' },
      ],
      xProps: {
        type: 'textarea',
        maxlength: '200',
        'show-word-limit': true,
        autosize: { minRows: 4 },
        placeholder: '请输入备注',
      },
    }, // 备注
  ]
}
