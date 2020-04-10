import Mutation from '@what-a-faka/obj-mutation'
import { join, dateTimeJoin } from '@/utils/common'
import { getMapOptions } from '@/utils/mappings'

export const filterFields = (vm) => {
  return [
    {
      type: 'date',
      title: '异议反馈时间',
      name: 'create_time__range',
      widget: 'datetimepicker',
      xProps: {
        type: 'datetimerange',
      },
    },
    {
      type: 'date',
      title: '异议处理时间',
      name: 'operate_time__range',
      widget: 'datetimepicker',
      xProps: {
        type: 'datetimerange',
      },
    },
    {
      type: 'array',
      title: '净网类型名称',
      name: 'order__customer_purifyconfig__purifyconfig_id__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.purifyTypeOpts,
      },
    },
    {
      type: 'array',
      title: '内容类型',
      name: 'order__content_type__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.contentTypeChoices,
      },
    },
    {
      type: 'array',
      title: '客户名称',
      name: 'customer_id__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.customerChoices,
      },
    },
    {
      type: 'array',
      title: '异议状态',
      name: 'op_status__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: [
          { value: 'to_check', label: '待处理' },
          { value: 'pass', label: '已处理' },
          { value: 'reject', label: '忽略' },
        ],
      },
    },
    {
      type: 'array',
      title: '净网状态',
      name: 'order__first_result__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: getMapOptions('prueAuditResult'),
      },
    },
    {
      type: 'array',
      title: '二级标签',
      name: 'order__second_result__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.secondTagsFilterOpts,
      },
    },
    {
      type: 'array',
      title: '三级标签',
      name: 'order__third_result__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.thirdTagsOpts,
      },
    },
    {
      type: 'string',
      title: '期望结果',
      name: 'first_result__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: [
          { label: '正常', value: 'normal' },
          { label: '违规', value: 'illegal' },
        ],
      },
    },
    {
      type: 'array',
      title: '期望二级标签',
      name: 'second_result__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.secondTagsFilterOpts,
      },
    },
    {
      type: 'array',
      title: '期望三级标签',
      name: 'third_result__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.thirdTagsOpts,
      },
    },
  ]
}

export const filterFieldsMutation = new Mutation({
  create_time__range: { format: dateTimeJoin },
  operate_time__range: { format: dateTimeJoin },
  order__customer_purifyconfig__purifyconfig_id__in: { format: join },
  order__content_type__in: { format: join },
  customer_id__in: { format: join },
  op_status__in: { format: join },
  order__first_result__in: { format: join },
  order__second_result__in: { format: join },
  order__third_result__in: { format: join },
  first_result__in: { format: join },
  second_result__in: { format: join },
  third_result__in: { format: join },
})

export function feedbackForm(vm) {
  return [
    {
      title: '处理结果',
      name: 'op_status',
      widget: 'radio',
      rules: [{ required: true, message: '请选择审核结果', trigger: 'blur' }],
      xProps: {
        options: [
          { label: '已处理', value: 'pass' },
          { label: '忽略', value: 'reject' },
        ],
      },
    },
    {
      type: 'array',
      title: '审核结果',
      name: 'first_result',
      widget: 'select',
      xProps: {
        filterable: true,
        disabled: true,
        options: getMapOptions('prueAuditResult'),
      },
    },
    {
      type: 'array',
      title: '一级违规标签',
      name: 'second_result',
      widget: 'select',
      xProps: {
        filterable: true,
        disabled: true,
        options: vm.secondTagsFilterOpts,
      },
    },
    {
      title: '处理说明',
      name: 'remark',
      widget: 'text',
      rules: [{ required: true, message: '处理说明必填', trigger: 'blur' }],
      xProps: {
        type: 'textarea',
        row: 3,
      },
    },
  ]
}
