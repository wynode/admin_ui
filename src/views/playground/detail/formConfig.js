import Mutation from '@what-a-faka/obj-mutation'
import { getMapOptions } from '@/utils/mappings'
import { join, dateTimeJoin, numberJoin, cascaderJoin } from '@/utils/common'

export const filterFields = (vm) => {
  return [
    {
      type: 'date',
      title: '领取时间',
      name: 'receive_time__range',
      widget: 'datetimepicker',
      xProps: {
        type: 'datetimerange',
      },
    },

    {
      type: 'date',
      title: '提交时间',
      name: 'result_time__range',
      widget: 'datetimepicker',
      xProps: {
        type: 'datetimerange',
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
      title: '岗位名称',
      name: 'practice__user__position_id__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.positionOpts,
      },
    },

    {
      type: 'string',
      title: '净网类型名称',
      name: 'practice__purifyconfig_id__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.purifyTypeOpts,
      },
    },

    {
      type: 'string',
      title: '内容类型',
      name: 'order__content_type__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: getMapOptions('contentTypeChoices'),
      },
    },

    {
      type: 'string',
      title: '练习结果',
      name: 'practice_result__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: getMapOptions('practiceResult'),
      },
    },

    {
      type: 'string',
      title: '正确结果',
      name: 'order__correct_first_result__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: getMapOptions('practiceAuditResult'),
      },
    },

    {
      type: 'string',
      title: '提交结果',
      name: 'first_result__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: getMapOptions('practiceAuditResult'),
      },
    },

    {
      type: 'string',
      title: '练习人',
      name: 'practice__user_id__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.usersOpts,
      },
    },

    {
      type: 'string',
      title: '耗时(s)',
      name: 'duration__range',
      widget: 'inputNumberRange',
      xProps: {
        min: 0,
        controls: false,
      },
    },
  ]
}

export const filterFieldsMutation = new Mutation({
  receive_time__range: { format: dateTimeJoin },
  result_time__range: { format: dateTimeJoin },
  user__department_id__in: { format: cascaderJoin },
  practice__user__position_id__in: { format: join },
  practice__purifyconfig_id__in: { format: join },
  order__content_type__in: { format: join },
  practice_result__in: { format: join },
  order__correct_first_result__in: { format: join },
  first_result__in: { format: join },
  practice__user_id__in: { format: join },
  duration__range: { format: numberJoin },
})
