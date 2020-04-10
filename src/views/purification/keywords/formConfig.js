import Mutation from '@what-a-faka/obj-mutation'
import { join, dateTimeJoin } from '@/utils/common'

export function filterFields(vm) {
  return [
    {
      title: '关联分类',
      name: 'kw_category__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.kw_categoryOpt.options,
      },
    },

    {
      type: 'string',
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
      type: 'string',
      title: '操作时间',
      name: 'operate_time__range',
      widget: 'datetimepicker',
      xProps: {
        type: 'datetimerange',
      },
    },
  ]
}

export const filtersMutateInit = new Mutation({
  kw_category__in: { format: join },
  operator_id__in: { format: join },
  operate_time__range: { format: dateTimeJoin },
})

export function EditFields(vm) {
  return [
    {
      title: '分类',
      name: 'kw_category',
      widget: 'select',
      rules: [{ required: true, message: '请选择分类', trigger: 'blur' }],
      xProps: {
        filterable: true,
        multiple: false,
        'allow-create': true,
        options: vm.kw_categoryOpt.options,
      },
    },
    {
      title: '关键词',
      name: 'word',
      widget: 'text',
      rules: [{ required: true, message: '关键词必填', trigger: 'blur' }],
    },
  ]
}
