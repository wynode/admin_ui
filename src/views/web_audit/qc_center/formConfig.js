import Mutation from '@what-a-faka/obj-mutation'
import { join, dateTimeJoin, cascaderJoin } from '@/utils/common'
import { getMapOptions } from '@/utils/mappings'

export const filterFields = (vm) => {
  return [
    {
      type: 'date',
      title: '入库时间',
      name: 'create_time__range',
      widget: 'datetimepicker',
      xProps: {
        type: 'datetimerange',
      },
    },

    {
      type: 'date',
      title: '提交时间',
      name: 'final_result_time__range',
      widget: 'datetimepicker',
      xProps: {
        type: 'datetimerange',
      },
    },

    {
      type: 'string',
      title: '完成平台',
      name: 'answer__platform__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: [
          { value: 'web', label: '网页审核' },
          { value: 'app', label: 'APP审核' },
        ],
      },
    },
    {
      type: 'string',
      title: '净网类型名称',
      name: 'customer_purifyconfig__purifyconfig_id__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.purifyData,
      },
    },
    {
      type: 'string',
      title: '内容类型',
      name: 'content_type__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.contentTypesOpts,
      },
    },
    {
      type: 'string',
      title: '审核优先级',
      name: 'customer_purifyconfig__urgency__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: [
          { value: 1, label: '低' },
          { value: 2, label: '中' },
          { value: 3, label: '高' },
        ],
      },
    },
    {
      type: 'string',
      title: '净网状态',
      name: 'first_result__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: getMapOptions('prueAuditResult'),
      },
    },
    {
      type: 'string',
      title: '净网人',
      name: 'usersuborderanswer__user_id__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.usersOpts,
      },
    },
    {
      type: 'string',
      title: '是否一致',
      name: 'is_consistent',
      widget: 'select',
      xProps: {
        filterable: true,
        options: [
          { label: '是', value: 1 },
          { label: '否', value: '0' },
        ],
      },
    },
    {
      type: 'array',
      title: 'BatchId',
      name: 'batch_id__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.batchIdOptions,
      },
    },
    {
      type: 'array',
      title: '二级标签',
      name: 'second_result__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.secondTagsFilterOpts,
      },
    },

    {
      type: 'number',
      title: '所在部门',
      name: 'user__department_id__in',
      widget: 'cascader',
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.departmentOpts,
        props: {
          multiple: true,
          checkStrictly: true,
        },
      },
    },

    {
      type: 'string',
      title: '质检条数',
      name: 'page_size',
      widget: 'select',
      xProps: {
        filterable: true,
        options: [
          { label: '10条', value: 10 },
          { label: '20条', value: 20 },
          { label: '30条', value: 30 },
        ],
      },
    },
  ]
}

export const filterFieldsMutation = new Mutation({
  create_time__range: { format: dateTimeJoin },
  final_result_time__range: { format: dateTimeJoin },
  answer__platform__in: { format: join },
  customer_purifyconfig__purifyconfig_id__in: { format: join },
  customer_purifyconfig__urgency__in: { format: join },
  first_result__in: { format: join },
  second_result__in: { format: join },
  batch_id__in: { format: join },
  usersuborderanswer__user_id__in: { format: join },
  is_consistent: { format: join },
  content_type__in: { format: join },
  user__department_id__in: { format: cascaderJoin },
})
