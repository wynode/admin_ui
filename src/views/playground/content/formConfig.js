import Mutation from '@what-a-faka/obj-mutation'
import { getMapOptions } from '@/utils/mappings'
import { join, dateTimeJoin, numberJoin } from '@/utils/common'

export const filterFields = (vm) => {
  return [
    {
      type: 'date',
      title: '内容入库时间',
      name: 'entry_time__range',
      widget: 'datetimepicker',
      xProps: {
        type: 'datetimerange',
      },
    },
    {
      type: 'array',
      title: '净网类型',
      name: 'purifyconfig_id__in',
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
        options: getMapOptions('contentTypeChoices'),
      },
    },

    {
      type: 'array',
      title: '内容状态',
      name: 'status__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: getMapOptions('practiceOrderStatus'),
      },
    },
    // {
    //   title: '正确结果',
    //   name: 'correct_first_result',
    //   widget: 'radio',
    //   rules: [{ required: true, message: '请选择状态', trigger: 'blur' }],
    //   xProps: {
    //     options: [
    //       { label: '正常', value: 'normal' },
    //       { label: '违规', value: 'illegal' },
    //     ],
    //   },
    // },
    {
      type: 'array',
      title: '练习正确率',
      name: 'correct_rate__range',
      widget: 'inputNumberRange',
      xProps: {
        min: 0,
        controls: false,
      },
    },

    {
      type: 'array',
      title: '平均耗时(s)',
      name: 'avg_duration__range',
      widget: 'inputNumberRange',
      xProps: {
        min: 0,
        controls: false,
      },
    },
  ]
}

export const filterFieldsMutation = new Mutation({
  entry_time__range: { format: dateTimeJoin },
  purifyconfig_id__in: { format: join },
  content_type__in: { format: join },
  status__in: { format: join },
  correct_rate__range: { format: numberJoin },
  avg_duration__range: { format: numberJoin },
})
