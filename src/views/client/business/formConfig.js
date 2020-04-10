import Mutation from '@what-a-faka/obj-mutation'
import { dateTimeJoin, join } from '@/utils/common'

// 审核次数选项
const needVerifyCountOptions = [
  {
    label: 1,
    value: 1,
  },
  {
    label: 2,
    value: 2,
  },
  {
    label: 3,
    value: 3,
  },
  {
    label: 5,
    value: 5,
  },
]

// 优先级选项
const urgencyOptions = [
  {
    label: '低',
    value: 1,
  },
  {
    label: '中',
    value: 2,
  },
  {
    label: '高',
    value: 3,
  },
]

// 状态选项
const statusOptions = [
  {
    label: '启用',
    value: 1,
  },
  {
    label: '停用',
    value: 0,
  },
]

// 复核选项
const recheckActionOptions = [
  {
    label: '不复核',
    value: '',
  },
  {
    label: '违规复核',
    value: 'recheck_illegal',
  },
  {
    label: '正常复核',
    value: 'recheck_normal',
  },
]

// 图片公开选项
const imagePublicOptions = [
  {
    label: '是',
    value: 1,
  },
  {
    label: '否',
    value: 0,
  },
]

// 应用分类选项
const appTypeOptions = [
  {
    label: '社交/社群',
    value: 1,
  },
  {
    label: '资讯',
    value: 2,
  },
  {
    label: '电商',
    value: 3,
  },
  {
    label: '游戏',
    value: 4,
  },
  {
    label: '短视频/直播',
    value: 5,
  },
  {
    label: '工具',
    value: 6,
  },
  {
    label: '其他',
    value: 0,
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
      type: 'number',
      name: 'purifyconfig_id__in',
      title: '净网类型名称',
      widget: 'select',
      xProps: {
        placeholder: '请选择',
        multiple: true,
        filterable: true,
        options: vm.purifyConfigs,
      },
    },

    {
      type: 'number',
      name: 'customer_id__in',
      title: '所属客户',
      widget: 'select',
      xProps: {
        placeholder: '请选择',
        multiple: true,
        filterable: true,
        options: vm.customers,
      },
    },

    {
      type: 'number',
      name: 'need_verify_count__in',
      title: '审核人数',
      widget: 'select',
      xProps: {
        placeholder: '请选择',
        multiple: true,
        filterable: true,
        options: needVerifyCountOptions,
      },
    },

    {
      type: 'number',
      name: 'urgency__in',
      title: '优先级',
      widget: 'select',
      xProps: {
        placeholder: '请选择',
        multiple: true,
        filterable: true,
        options: urgencyOptions,
      },
    },

    {
      type: 'number',
      name: 'status__in',
      title: '业务状态',
      widget: 'select',
      xProps: {
        placeholder: '请选择',
        multiple: true,
        filterable: true,
        options: statusOptions,
      },
    },
  ]
}

export const filtersMutateInit = new Mutation({
  create_time__range: { format: dateTimeJoin },
  purifyconfig_id__in: { format: join },
  customer_id__in: { format: join },
  need_verify_count__in: { format: join },
  urgency__in: { format: join },
  status__in: { format: join },
})

export const editFields = (vm) => {
  return [
    {
      type: 'string',
      title: '业务code',
      name: 'customer_conf_code',
      widget: 'text',
      rules: [
        { required: true, message: '业务code必填' },
        { max: 100, message: '不可以超过100个字' },
      ],
      xProps: {
        disabled: vm.edit,
        placeholder: '请输入业务code',
      },
    }, // 业务code

    {
      type: 'string',
      title: '业务名称',
      name: 'name',
      widget: 'text',
      rules: [
        { required: true, message: '业务名称必填' },
        { max: 100, message: '不可以超过100个字' },
      ],
      xProps: {
        placeholder: '请输入业务名称',
      },
    }, // 业务名称

    {
      type: 'number',
      title: '净网类型',
      name: 'purifyconfig',
      widget: 'select',
      rules: [{ required: true, message: '净网类型必选择' }],
      xProps: {
        placeholder: '请选择',
        filterable: true,
        options: vm.purifyConfigs,
      },
    }, // 净网类型

    {
      type: 'number',
      title: '所属客户',
      name: 'customer',
      widget: 'select',
      rules: [{ required: true, message: '所属客户必填' }],
      xProps: {
        placeholder: '请选择',
        options: vm.customers,
      },
    }, // 所属客户

    {
      type: 'number',
      title: '签约单价',
      name: 'price',
      widget: 'inputNumber',
      xProps: {
        placeholder: '请输入签约单价',
      },
    }, // 签约单价

    {
      type: 'number',
      title: '审核次数',
      name: 'need_verify_count',
      widget: 'radio',
      rules: [{ required: true, message: '审核次数必选择' }],
      xProps: {
        filterable: true,
        options: needVerifyCountOptions,
      },
    }, // 审核次数

    {
      type: 'number',
      title: '是否复核',
      name: 'recheck_action',
      widget: 'radio',
      xProps: {
        filterable: true,
        options: recheckActionOptions,
      },
    }, // 是否复核

    {
      type: 'number',
      title: '优先级',
      name: 'urgency',
      widget: 'radio',
      xProps: {
        filterable: true,
        options: urgencyOptions,
      },
    }, // 优先级

    {
      type: 'number',
      title: '图片公开',
      name: 'image_public',
      widget: 'radio',
      rules: [{ required: true, message: '图片是否公开必选择' }],
      xProps: {
        filterable: true,
        options: imagePublicOptions,
      },
    }, // 图片公开

    {
      type: 'string',
      title: '结果推送url',
      name: 'result_push_url',
      widget: 'text',
      rules: [{ required: true, message: '结果推送url必填' }],
      xProps: {
        placeholder: '请输入结果推送url',
      },
    }, // 结果推送url

    {
      type: 'array',
      title: '关键词分类',
      name: 'kw_category',
      widget: 'select',
      xProps: {
        placeholder: '请选择',
        multiple: true,
        filterable: true,
        options: vm.kwCategoryOptions,
      },
    }, // 关键词

    {
      type: 'number',
      title: '状态',
      name: 'status',
      widget: 'radio',
      rules: [{ required: true, message: '关键词必选择' }],
      xProps: {
        filterable: true,
        options: statusOptions,
      },
    }, // 状态

    {
      type: 'number',
      title: '应用分类',
      name: 'app_type',
      widget: 'select',
      xProps: {
        placeholder: '请选择',
        filterable: true,
        options: appTypeOptions,
      },
    }, // 应用分类

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
