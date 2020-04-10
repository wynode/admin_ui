import Mutation from '@what-a-faka/obj-mutation'
import { getMapOptions } from '@/utils/mappings'
import { join, dateTimeJoin, numberJoin } from '@/utils/common'

export const filterFields = (vm) => {
  return [
    {
      type: 'array',
      title: '所属分类',
      name: 'category__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: getMapOptions('checkPointCategory'),
      },
    }, // 所属分类

    {
      type: 'array',
      title: '关卡状态',
      name: 'status__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: getMapOptions('checkPointStatus'),
      },
    }, // 关卡状态

    {
      type: 'array',
      title: '题目数量',
      name: 'examquestion_count__range',
      widget: 'inputNumberRange',
      xProps: {
        min: 0,
        controls: false,
      },
    }, // 题目数量

    {
      type: 'array',
      title: '冲关次数',
      name: 'checkpointstat__total_count__range',
      widget: 'inputNumberRange',
      xProps: {
        min: 0,
        controls: false,
      },
    }, // 冲关次数

    {
      type: 'array',
      title: '通关率(%)',
      name: 'success_rate__range',
      widget: 'inputNumberRange',
      xProps: {
        min: 0,
        controls: false,
      },
    }, // 通关率

    {
      type: 'array',
      title: '平均耗时(秒)',
      name: 'avg_duration__range',
      widget: 'inputNumberRange',
      xProps: {
        min: 0,
        controls: false,
      },
    }, // 平均耗时

    {
      type: 'date',
      title: '开始时间',
      name: 'enable_start_time__range',
      widget: 'datetimepicker',
      xProps: {
        type: 'datetimerange',
      },
    }, // 开始时间

    {
      type: 'date',
      title: '结束时间',
      name: 'enable_end_time__range',
      widget: 'datetimepicker',
      xProps: {
        type: 'datetimerange',
      },
    }, // 结束时间

    {
      type: 'date',
      title: '操作时间',
      name: 'update_time__range',
      widget: 'datetimepicker',
      xProps: {
        type: 'datetimerange',
      },
    }, // 操作时间

    {
      type: 'array',
      title: '操作人',
      name: 'operator__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.managerOpts,
      },
    }, // 操作人
  ]
}

export const filterFieldsMutation = new Mutation({
  category__in: { format: join },
  status__in: { format: join },
  examquestion_count__range: { format: numberJoin },
  checkpointstat__total_count__range: { format: numberJoin },
  success_rate__range: { format: numberJoin },
  avg_duration__range: { format: numberJoin },
  enable_start_time__range: { format: dateTimeJoin },
  enable_end_time__range: { format: dateTimeJoin },
  update_time__range: { format: dateTimeJoin },
  operator__in: { format: join },
})

export const newCheckPointFields = (vm) => {
  return [
    {
      type: 'string',
      title: '关卡名称',
      name: 'name',
      widget: 'text',
      rules: [{ required: true, message: '关卡名称必填', trigger: 'blur' }],
      xProps: {
        placeholder: '请输入关卡名称',
      },
    }, // '关卡名称'

    {
      type: 'string',
      title: '所属分类',
      name: 'category',
      widget: 'select',
      rules: [{ required: true, message: '所属分类必填' }],
      xProps: {
        filterable: true,
        options: getMapOptions('checkPointCategory'),
        placeholder: '请选择所属分类',
      },
    }, // 所属分类

    {
      type: 'string',
      title: '关卡状态',
      name: 'status',
      widget: 'radio',
      xProps: {
        placeholder: '请选择关卡状态',
        options: getMapOptions('checkPointStatus'),
      },
    }, // 关卡状态

    {
      type: 'number',
      title: '关卡题数',
      name: 'user_question_num',
      widget: 'inputNumber',
      rules: [{ required: true, message: '关卡题数必填', trigger: 'blur' }],
      xProps: {
        controlsPosition: 'right',
        placeholder: '请输入关卡题数',
      },
    }, // 关卡题数

    {
      type: 'date',
      title: '开始时间',
      name: 'enable_start_time',
      widget: 'datetimepicker',
      rules: [{ required: true, message: '开始时间必填', trigger: 'blur' }],
      xProps: {
        type: 'datetime',
        placeholder: '请选择开始时间',
      },
    }, // 开始时间

    {
      type: 'date',
      title: '结束时间',
      name: 'enable_end_time',
      widget: 'datetimepicker',
      xProps: {
        type: 'datetime',
        placeholder: '请选择结束时间',
      },
    }, // 结束时间

    {
      type: 'string',
      title: '帮助页标题',
      name: 'help_page',
      widget: 'select',
      xProps: {
        filterable: true,
        options: vm.helpCenterOpts,
        placeholder: '请选择帮助页标题',
      },
    }, // 帮助页标题

    {
      type: 'string',
      title: '关卡说明',
      name: 'explain',
      widget: 'text',
      rules: [{ required: true, message: '关卡说明必填', trigger: 'blur' }],
      xProps: {
        type: 'textarea',
        autosize: { minRows: 6 },
        placeholder: '请输入关卡说明',
      },
    }, // 关卡说明
  ]
}
