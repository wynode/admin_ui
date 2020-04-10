import Mutation from '@what-a-faka/obj-mutation'
import { getMapOptions } from '@/utils/mappings'
import { join, numberJoin, dateTimeJoin } from '@/utils/common'

export const filterFields = (vm) => {
  return [
    {
      type: 'date',
      title: '作答时间',
      name: 'answer_time__range',
      widget: 'datetimepicker',
      xProps: {
        type: 'datetimerange',
      },
    }, // 作答时间

    {
      type: 'number',
      title: '所在部门',
      name: 'user_exam__user__department_id__in',
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
    }, // 所在部门

    {
      type: 'number',
      title: '岗位名称',
      name: 'user_exam__user__position__id__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.positionOpts,
      },
    }, // 岗位名称

    {
      type: 'number',
      title: '答题人',
      name: 'user_exam__user__id__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.usersOpts,
      },
    }, // 答题人

    {
      type: 'string',
      title: '答题结果',
      name: 'result__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: getMapOptions('examResult'),
      },
    }, // 答题结果

    {
      type: 'string',
      title: '用时',
      name: 'duration__range',
      widget: 'inputNumberRange',
      xProps: {
        min: 0,
        controls: false,
      },
    }, // 用时

    {
      type: 'string',
      title: '冲关id',
      name: 'user_exam__id__in',
      widget: 'text',
      xProps: {
        placeholder: '冲关id',
      },
    }, // '冲关id'
  ]
}

export const filterFieldsMutation = new Mutation({
  answer_time__range: { format: dateTimeJoin },
  user_exam__user__department_id__in: {
    format: (value) => {
      if (Array.isArray(value)) {
        // NOTE 数组 v 可能为空，导致 dp 里最终数据可能会出现 undefined
        const dp = value.map((v) => v[v.length - 1])
        return join(dp)
      }
      return value
    },
  },
  user_exam__user__position__id__in: { format: join },
  user_exam__user__id__in: { format: join },
  result__in: { format: join },
  duration__range: { format: numberJoin },
})
