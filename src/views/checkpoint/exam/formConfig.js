import Mutation from '@what-a-faka/obj-mutation'
import { getMapOptions } from '@/utils/mappings'
import { join, dateTimeJoin, numberJoin } from '@/utils/common'

export function filterFields(vm) {
  return [
    {
      title: '所属分类',
      name: 'category__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: getMapOptions('checkPointCategory'),
      },
    },
    {
      title: '所属关卡',
      name: 'check_point__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.checkPointList,
      },
    },
    {
      title: '题目状态',
      name: 'status__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: getMapOptions('questionStatusType'),
      },
    },
    {
      title: '能力评估模型',
      name: 'direction__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: getMapOptions('directionType'),
      },
    },
    {
      title: '题型',
      name: 'question_type__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: getMapOptions('questionType'),
      },
    },
    {
      title: '作答次数',
      name: 'examquestionstat__total_count__range',
      widget: 'inputNumberRange',
      xProps: {
        min: 0,
        controls: false,
      },
    },
    {
      title: '正确率',
      name: 'correct_rate__range',
      widget: 'inputNumberRange',
      xProps: {
        min: 0,
        controls: false,
      },
    },
    {
      title: '平均耗时',
      name: 'avg_duration__range',
      widget: 'inputNumberRange',
      xProps: {
        min: 0,
        controls: false,
      },
    },
    {
      title: '出题人',
      name: 'artist_id__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.usersOpts,
      },
    },
    {
      title: '操作人',
      name: 'operator_id__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.managerOpts,
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
  ]
}

export const filtersMutateInit = new Mutation({
  category__in: { format: join },
  check_point__in: { format: join },
  direction__in: { format: join },
  question_type__in: { format: join },
  artist_id__in: { format: join },
  operator_id__in: { format: join },
  examquestionstat__total_count__range: { format: numberJoin },
  update_time__range: { format: dateTimeJoin },
  status__in: { format: join },
  correct_rate__range: { format: numberJoin },
  avg_duration__range: { format: numberJoin },
})
