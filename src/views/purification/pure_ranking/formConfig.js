import Mutation from '@what-a-faka/obj-mutation'
import { join, dateJoin, cascaderJoin } from '@/utils/common'

export const filterFields = (vm) => {
  return [
    {
      type: 'date',
      title: '排名日期',
      name: 'summit_date__range',
      widget: 'datetimepicker',
      xProps: {
        type: 'daterange',
      },
    },

    {
      type: 'string',
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
  ]
}

export const filterFieldsMutation = new Mutation({
  summit_date__range: { format: dateJoin },
  user__position_id__in: { format: join },
  user__department_id__in: { format: cascaderJoin },
})
