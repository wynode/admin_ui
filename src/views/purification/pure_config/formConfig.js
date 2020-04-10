import Mutation from '@what-a-faka/obj-mutation'
import { join } from '@/utils/common'
import PureIconSelector from './PureIconSelector'

export function filterFields(vm) {
  return [
    {
      title: '关联分类',
      name: 'purify_category__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.categoryOpts,
      },
    },
    {
      title: '状态',
      name: 'status__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: [
          { label: '启用', value: '1' },
          { label: '禁用', value: '0' },
        ],
      },
    },
  ]
}

export const filtersMutateInit = new Mutation({
  purify_category__in: { format: join },
  status__in: { format: join },
})

export function pureConfigFields(vm) {
  return [
    {
      title: '净网类型名称',
      name: 'name',
      widget: 'text',
      rules: [{ required: true, message: '净网类型名称必填', trigger: 'blur' }],
    },
    {
      title: '平台',
      name: 'platform',
      widget: 'radio',
      rules: [{ required: true, message: '请选择平台', trigger: 'blur' }],
      xProps: {
        options: [
          { label: '网页', value: 'only_web' },
          { label: '混合', value: 'mixed' },
        ],
      },
    },
    {
      title: '关联分类',
      name: 'purify_category',
      widget: 'select',
      rules: [{ required: true, message: '请选择关联分类', trigger: 'blur' }],
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.categoryOpts,
      },
    },
    {
      title: '完成练习次数',
      name: 'th_practice_complete_count',
      widget: 'text',
      rules: [{ required: true, message: '完成练习次数必填', trigger: 'blur' }],
    },
    {
      title: '练习正确率',
      name: 'th_practice_correct_rate',
      widget: 'text',
      rules: [{ required: true, message: '练习正确率必填', trigger: 'blur' }],
      xProps: {
        ext: '%',
      },
    },

    {
      title: '状态',
      name: 'status',
      widget: 'radio',
      rules: [{ required: true, message: '请选择状态', trigger: 'blur' }],
      xProps: {
        options: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 },
        ],
      },
    },

    {
      title: '练习状态',
      name: 'practice_status',
      widget: 'radio',
      rules: [{ required: true, message: '请选择状态', trigger: 'blur' }],
      xProps: {
        options: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 },
        ],
      },
    },

    {
      title: '关键字必填',
      name: 'require_remark',
      widget: 'radio',
      rules: [{ required: true, message: '请选择状态', trigger: 'blur' }],
      xProps: {
        options: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 },
        ],
      },
    },

    {
      title: '订单时效(分钟)',
      name: 'order_expire_seconds',
      widget: 'text',
      defaultValue: 15,
      rules: [{ required: true, message: '订单时效必填', trigger: 'blur' }],
      xProps: {
        remark: '默认为15分钟，入库时生成订单超时时间',
      },
    },
    {
      title: '网页审核时效(分钟)',
      name: 'web_expire_seconds',
      widget: 'text',
      defaultValue: 10,
      rules: [{ required: true, message: '网页审核时效必填', trigger: 'blur' }],
      xProps: {
        remark: '默认为10分钟，网页领单时显示提交倒计时',
      },
    },
    {
      title: 'APP审核时效(分钟)',
      name: 'app_expire_seconds',
      widget: 'text',
      defaultValue: 3,
      rules: [{ required: true, message: 'APP审核时效必填', trigger: 'blur' }],
      xProps: {
        remark: '默认为3分钟，App领单时显示提交倒计时',
      },
    },
    {
      title: '净网积分',
      name: 'score',
      widget: 'text',
      rules: [{ required: true, message: '净网积分必填', trigger: 'blur' }],
    },
    {
      title: '漏审扣除积分',
      name: 'omission_score',
      widget: 'text',
      rules: [{ required: true, message: '漏审扣罚必填', trigger: 'blur' }],
    },
    {
      title: '错审扣除积分',
      name: 'error_score',
      widget: 'text',
      rules: [{ required: true, message: '错审扣罚必填', trigger: 'blur' }],
    },
    {
      title: '违规展示名称',
      name: 'illegal_label',
      widget: 'text',
      defaultValue: '违规',
      rules: [{ required: true, message: '违规展示名称必填', trigger: 'blur' }],
    },
    {
      title: '正常展示名称',
      name: 'normal_label',
      widget: 'text',
      defaultValue: '正常',
      rules: [{ required: true, message: '正常展示名称必填', trigger: 'blur' }],
    },
    {
      title: '违规标签',
      name: 'second_tags',
      widget: 'dynamicLabels',
    },
    {
      title: '图标',
      name: 'icon',
      rules: [{ required: true, message: '请选择图标' }],
      customWidget: {
        component: PureIconSelector,
      },
      xProps: {
        icons: vm.purifyIcons,
      },
    },
    {
      title: '备注',
      name: 'remark',
      widget: 'text',
    },
  ]
}
