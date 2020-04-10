import Mutation from '@what-a-faka/obj-mutation'
import { getMapOptions } from '@/utils/mappings'
import { join, dateTimeJoin } from '@/utils/common'

export const filterFields = (vm) => {
  return [
    {
      type: 'date',
      title: '冲关开始时间',
      name: 'create_time__range',
      widget: 'datetimepicker',
      xProps: {
        type: 'datetimerange',
      },
    }, // 冲关开始时间

    {
      type: 'date',
      title: '冲关结束时间',
      name: 'end_time__range',
      widget: 'datetimepicker',
      xProps: {
        type: 'datetimerange',
      },
    }, // 冲关结束时间

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
    }, // 所在部门

    {
      type: 'number',
      title: '岗位名称',
      name: 'user__position__id__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.positionOpts,
      },
    }, // 岗位名称

    {
      type: 'string',
      title: '所属分类',
      name: 'user_check_point__check_point__category__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: getMapOptions('checkPointCategory'),
      },
    }, // 所属分类

    {
      type: 'string',
      title: '冲关结果',
      name: 'status__in',
      widget: 'select',
      xProps: {
        multiple: true,
        filterable: true,
        options: getMapOptions('checkPointResult'),
      },
    }, // 冲关结果

    {
      type: 'number',
      title: '通关评价',
      name: 'rank__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: getMapOptions('examRank'),
      },
    }, // 通关评价

    {
      type: 'number',
      title: '冲关人',
      name: 'user__id__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.usersOpts,
      },
    }, // 冲关人
  ]
}

export const filterFieldsMutation = new Mutation({
  create_time__range: { format: dateTimeJoin },
  end_time__range: { format: dateTimeJoin },
  user__department_id__in: {
    format: (value) => {
      if (Array.isArray(value)) {
        // NOTE 数组 v 可能为空，导致 dp 里最终数据可能会出现 undefined
        const dp = value.map((v) => v[v.length - 1])
        return join(dp)
      }
      return value
    },
  },
  status__in: { format: join },
  user__position__id__in: { format: join },
  user_check_point__check_point__category__in: { format: join },
  rank__in: { format: join },
  user__id__in: { format: join },
})
