import Mutation from '@what-a-faka/obj-mutation'
import { dateTimeJoin, join } from '@/utils/common'

// 客户类型选项
const clientTypeOptions = [
  {
    label: '客户',
    value: 'client',
  },
  {
    label: '子客户',
    value: 'sub_client',
  },
]

export const filterFields = (vm) => {
  return [
    {
      type: 'string',
      title: '创建时间',
      name: 'create_time__range',
      widget: 'datetimepicker',
      xProps: {
        type: 'datetimerange',
      },
    },

    {
      type: 'string',
      name: 'client_type__in',
      title: '客户等级',
      widget: 'select',
      xProps: {
        multiple: true,
        placeholder: '请选择',
        filterable: true,
        options: clientTypeOptions,
      },
    },

    {
      type: 'number',
      name: 'parent_id__in',
      title: '上级客户',
      widget: 'select',
      xProps: {
        multiple: true,
        placeholder: '请选择',
        filterable: true,
        options: vm.parentCustomers,
      },
    },
  ]
}

export const filtersMutateInit = new Mutation({
  create_time__range: { format: dateTimeJoin },
  client_type__in: { format: join },
  parent_id__in: { format: join },
})

export const editCustomerFields = (vm) => {
  return [
    {
      type: 'string',
      title: '客户编码',
      name: 'code',
      widget: 'text',
      rules: [
        { required: true, message: '客户编码必填' },
        { max: 100, message: '不可以超过100个字' },
      ],
      xProps: {
        placeholder: '请输入客户编码',
      },
    }, // 客户编码

    {
      type: 'string',
      title: '客户名称',
      name: 'name',
      widget: 'text',
      rules: [
        { required: true, message: '客户名称必填' },
        { max: 100, message: '不可以超过100个字' },
      ],
      xProps: {
        placeholder: '请输入客户名称',
      },
    }, // 客户名称

    {
      type: 'string',
      title: '客户等级',
      name: 'client_type',
      widget: 'radio',
      rules: [{ required: true, message: '客户等级必选择' }],
      xProps: {
        filterable: true,
        options: clientTypeOptions,
      },
    }, // 客户等级

    {
      type: 'number',
      title: '上级客户',
      name: 'parent',
      widget: 'select',
      //rules: [{ required: true, message: '上级客户必填' }],
      xProps: {
        placeholder: '请选择',
        options: vm.parentCustomers,
      },
    }, // 上级客户

    {
      type: 'string',
      title: '对接人姓名',
      name: 'client_side_name',
      widget: 'text',
      rules: [{ max: 100, message: '不可以超过100个字' }],
    }, // 对接人姓名

    {
      type: 'string',
      title: '职位',
      name: 'client_side_position',
      widget: 'text',
      rules: [{ max: 100, message: '不可以超过100个字' }],
    }, // 职位

    {
      type: 'string',
      title: '联系电话',
      name: 'client_side_phone',
      widget: 'text',
      rules: [{ max: 100, message: '不可以超过100个字' }],
    }, // 联系电话

    {
      type: 'string',
      title: '主账户',
      name: 'email',
      widget: 'text',
      rules: [
        { required: true, message: '登录邮箱必填' },
        { max: 100, message: '不可以超过100个字' },
      ],
      xProps: {
        placeholder: '请输入主账户',
      },
    }, // 主账户

    {
      type: 'string',
      title: '子账户',
      name: 'sub_user_email_list',
      widget: 'multipleInput',
    }, // 子账户

    {
      type: 'string',
      title: '备注',
      name: 'remark',
      widget: 'text',
      xProps: {
        type: 'textarea',
      },
    }, // 备注
  ]
}
