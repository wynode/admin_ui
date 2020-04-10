import Mutation from '@what-a-faka/obj-mutation'
import { numberJoin, join, dateTimeJoin } from '@/utils/common'

export const filterFields = (vm) => {
  return [
    // {
    //   type: 'string',
    //   title: '入库量',
    //   name: 'order_count__in',
    //   widget: 'inputNumberRange',
    //   xProps: {
    //     min: 0,
    //     controls: false,
    //   },
    // },

    // {
    //   type: 'string',
    //   title: '完成量',
    //   name: 'finished_count__in',
    //   widget: 'inputNumberRange',
    //   xProps: {
    //     min: 0,
    //     controls: false,
    //   },
    // },

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

export const filterFieldsMutation = new Mutation({
  order_count__in: { format: numberJoin },
  finished_count__in: { format: numberJoin },
  operator_id__in: { format: join },
  operate_time__range: { format: dateTimeJoin },
})

export function newCustomerFields() {
  return [
    {
      title: '客户编码',
      name: 'code',
      widget: 'text',
      rules: [{ required: true, message: '请填写客户编码', trigger: 'blur' }],
    },
    {
      title: '登录账户',
      name: 'email',
      widget: 'text',
      rules: [{ required: true, message: '请填写登录账户', trigger: 'blur' }],
    },
    {
      title: '客户全称',
      name: 'name',
      widget: 'text',
      rules: [{ required: true, message: '请填写客户全称', trigger: 'blur' }],
    },
    {
      title: '客户备注',
      name: 'remark',
      widget: 'text',
      xProps: {
        type: 'textarea',
      },
    },
  ]
}

export function modifyCustomerPasswordFields() {
  return [
    {
      title: '新密码',
      name: 'new_password',
      widget: 'text',
      rules: [{ required: true, message: '请填写客户新密码', trigger: 'blur' }],
      xProps: {
        'show-password': true,
      },
    },
  ]
}
