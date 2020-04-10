import Mutation from '@what-a-faka/obj-mutation'
import { join, dateTimeJoin } from '@/utils/common'
import { getMapOptions } from '@/utils/mappings'

export const filtersFields = () => {
  return [
    {
      type: 'array',
      title: '广播状态',
      name: 'status__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        placeholder: '请选择广播状态',
        options: getMapOptions('boradcastStatus', ['deleted']),
      },
    }, // 广播状态

    {
      type: 'date',
      title: '开始时间',
      name: 'start_time__range',
      widget: 'datetimepicker',
      xProps: {
        type: 'datetimerange',
      },
    }, // 开始时间

    {
      type: 'date',
      title: '结束时间',
      name: 'end_time__range',
      widget: 'datetimepicker',
      xProps: {
        type: 'datetimerange',
      },
    }, // 结束时间
  ]
}

export const filtersMutation = new Mutation({
  status__in: { format: join },
  start_time__range: { format: dateTimeJoin },
  end_time__range: { format: dateTimeJoin },
})

export const bannerFields = () => {
  return [
    {
      type: 'string',
      title: '广播排序',
      name: 'seq',
      widget: 'inputNumber',
      rules: [{ required: true, message: '广播排序必填', trigger: 'blur' }],
      xProps: {
        min: 0,
        controlsPosition: 'right',
        placeholder: '请输入广播排序',
      },
    }, // 广播排序

    {
      type: 'string',
      title: '开始时间',
      name: 'start_time',
      widget: 'datetimepicker',
      rules: [{ required: true, message: '开始时间必填', trigger: 'blur' }],
      xProps: {
        type: 'datetime',
        placeholder: '请输入开始时间',
      },
    }, // 开始时间

    {
      type: 'string',
      title: '结束时间',
      name: 'end_time',
      widget: 'datetimepicker',
      rules: [{ required: true, message: '结束时间必填', trigger: 'blur' }],
      xProps: {
        type: 'datetime',
        placeholder: '请输入结束时间',
      },
    }, // 结束时间

    {
      type: 'string',
      title: '广播状态',
      name: 'status',
      widget: 'radio',
      rules: [{ required: true, message: '广播状态必填', trigger: 'change' }],
      xProps: {
        placeholder: '请输入广播状态',
        options: getMapOptions('boradcastStatus', ['deleted']),
      },
    }, // 广播状态

    {
      type: 'string',
      title: '广播内容',
      name: 'content',
      widget: 'text',
      rules: [
        { required: true, message: '广播内容必填', trigger: 'blur' },
        { max: 100, message: '不可以超过 100 个字' },
      ],
      xProps: {
        type: 'textarea',
        maxlength: '100',
        'show-word-limit': true,
        autosize: { minRows: 4 },
        placeholder: '请输入广播内容',
      },
    }, // 广播内容
  ]
}
