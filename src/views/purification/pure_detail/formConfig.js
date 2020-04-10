import Mutation from '@what-a-faka/obj-mutation'
import { join, dateTimeJoin, cascaderJoin } from '@/utils/common'
import { getMapOptions } from '@/utils/mappings'

export const filterFields = (vm) => {
  return [
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
      title: '净网提交时间',
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
      name: 'user__position_id__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.positionOpts,
      },
    },

    {
      type: 'array',
      title: '净网类型名称',
      name: 'order__customer_purifyconfig__purifyconfig_id__in',
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
      name: 'order__content_type__in',
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
      title: '结果状态',
      name: 'audit_suborder_result__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: [
          { label: '采用', value: 'accept' },
          { label: '弃用', value: 'reject' },
          { label: '待统票', value: 'to_vote' },
        ],
      },
    },

    {
      type: 'array',
      title: '净网人',
      name: 'user_id__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.usersOpts,
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
      type: 'string',
      title: '完成平台',
      name: 'purify_platform__in',
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

    {
      type: 'array',
      title: '质检人',
      name: 'qc_staff_id__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.usersOpts,
      },
    },
  ]
}

export const filterFieldsMutation = new Mutation({
  create_time__range: { format: dateTimeJoin },
  result_time__range: { format: dateTimeJoin },
  user__department_id__in: { format: cascaderJoin },
  user__position_id__in: { format: join },
  order__customer_purifyconfig__purifyconfig_id__in: { format: join },
  order__content_type__in: { format: join },
  audit_suborder_result__in: { format: join },
  first_result__in: { format: join },
  purify_platform__in: { format: join },
  qc_result__in: { format: join },
  second_result__in: { format: join },
  third_result__in: { format: join },
  user_id__in: { format: join },
  qc_staff_id__in: { format: join },
})

export function editFields(vm) {
  return [
    {
      title: '正确结果',
      name: 'correct_first_result',
      widget: 'radio',
      rules: [{ required: true, message: '请选择状态', trigger: 'blur' }],
      xProps: {
        options: [
          { label: '正常', value: 'normal' },
          { label: '违规', value: 'illegal' },
        ],
      },
    },
    {
      title: '二级标签',
      name: 'correct_second_result',
      widget: 'select',
      rules: vm.secondRules,
      xProps: {
        filterable: true,
        options: vm.second,
      },
    },
  ]
}
