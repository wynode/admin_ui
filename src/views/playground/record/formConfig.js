import Mutation from '@what-a-faka/obj-mutation'
import { getMapOptions } from '@/utils/mappings'
import { join, dateTimeJoin, numberJoin, cascaderJoin } from '@/utils/common'

export const filterFields = (vm) => {
  return [
    {
      type: 'date',
      title: '练习开始时间',
      name: 'start_time__range',
      widget: 'datetimepicker',
      xProps: {
        type: 'datetimerange',
      },
    },

    {
      type: 'date',
      title: '练习结束时间',
      name: 'end_time__range',
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
      type: 'number',
      title: '岗位名称',
      name: 'user__position_id__in',
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
      name: 'purifyconfig_id__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.purifyTypeOpts,
      },
    },

    {
      type: 'string',
      title: '练习状态',
      name: 'status__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: getMapOptions('practiceUserFlowStatus'),
      },
    },

    {
      type: 'string',
      title: '练习人',
      name: 'user_id__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.usersOpts,
      },
    },

    {
      type: 'string',
      title: '准确率（%）',
      name: 'correct_rate__range',
      widget: 'inputNumberRange',
      xProps: {
        min: 0,
        controls: false,
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
  start_time__range: { format: dateTimeJoin },
  end_time__range: { format: dateTimeJoin },
  user__department_id__in: { format: cascaderJoin },
  user__position_id__in: { format: join },
  purifyconfig_id__in: { format: join },
  status__in: { format: join },
  user_id__in: { format: join },
  correct_rate__range: { format: numberJoin },
  duration__range: { format: numberJoin },
})
