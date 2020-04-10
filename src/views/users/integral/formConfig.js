import Mutation from '@what-a-faka/obj-mutation'
import { getMapOptions } from '@/utils/mappings'
import { join, dateTimeJoin, numberJoin, cascaderJoin } from '@/utils/common'

export function filterFields(vm) {
  return [
    {
      title: '发起时间',
      name: 'create_time__range',
      widget: 'datetimepicker',
      xProps: {
        type: 'datetimerange',
      },
    },
    {
      title: '操作时间',
      name: 'update_time__range',
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
      title: '姓名',
      name: 'user_id__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.usersOpts,
      },
    },

    {
      title: '积分变更状态',
      name: 'score_status__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: getMapOptions('scoreStatusType'),
      },
    },
    {
      title: '积分变更类型',
      name: 'score_type__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.formItemList,
      },
    },
    {
      title: '积分变更数量',
      name: 'score_change__range',
      widget: 'inputNumberRange',
      xProps: {
        min: 0,
        controls: false,
      },
    },
  ]
}

export const filtersMutateInit = new Mutation({
  create_time__range: { format: dateTimeJoin },
  update_time__range: { format: dateTimeJoin },
  user__position_id__in: { format: join },
  user__department_id__in: { format: cascaderJoin },
  user_id__in: { format: join },
  score_status__in: { format: join },
  score_type__in: { format: join },
  score_change__range: { format: numberJoin },
})
