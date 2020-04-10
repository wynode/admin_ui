import Mutation from '@what-a-faka/obj-mutation'
import { join, dateTimeJoin, numberJoin } from '@/utils/common'
import { getMapOptions } from '@/utils/mappings'

export const filterFields = (vm) => {
  return [
    {
      type: 'date',
      title: '归档月份',
      name: 'create_month',
      widget: 'datetimepicker',
      xProps: {
        type: 'month',
        'value-format': 'yyyy-MM-dd',
        format: 'yyyy-MM-dd',
      },
    },
    {
      type: 'date',
      title: '内容入库时间',
      name: 'create_time__range',
      widget: 'datetimepicker',
      xProps: {
        type: 'datetimerange',
      },
    },

    {
      type: 'date',
      title: '结果提交时间',
      name: 'final_result_time__range',
      widget: 'datetimepicker',
      xProps: {
        type: 'datetimerange',
      },
    },

    {
      type: 'date',
      title: '质检时间',
      name: 'qc_time__range',
      widget: 'datetimepicker',
      xProps: {
        type: 'datetimerange',
      },
    },

    {
      type: 'array',
      title: '净网类型名称',
      name: 'customer_purifyconfig__purifyconfig_id__in',
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
      name: 'content_type__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.contentTypeChoices,
      },
    },

    {
      type: 'array',
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
      type: 'array',
      title: '质检状态',
      name: 'qc_result__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: getMapOptions('qcType'),
      },
    },

    {
      type: 'array',
      title: '耗时(秒)',
      name: 'duration__range',
      widget: 'inputNumberRange',
      xProps: {
        min: 0,
        controls: false,
      },
    },
    {
      type: 'string',
      title: '审核一致性',
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
      type: 'string',
      title: '内容id',
      name: 'content_id__in',
      widget: 'text',
      xProps: {
        rows: 1,
        type: 'textarea',
      },
    },
    {
      type: 'array',
      title: '文本类型',
      name: 'content_origin__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: [
          { label: '主贴', value: 'topic' },
          { label: '评论', value: 'reply' },
        ],
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
      type: 'array',
      title: '三级标签',
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
  final_result_time__range: { format: dateTimeJoin },
  qc_time__range: { format: dateTimeJoin },
  customer_purifyconfig__purifyconfig_id__in: { format: join },
  content_type__in: { format: join },
  content_origin__in: { format: join },
  first_result__in: { format: join },
  qc_result__in: { format: join },
  second_result__in: { format: join },
  third_result__in: { format: join },
  duration__range: { format: numberJoin },
})
