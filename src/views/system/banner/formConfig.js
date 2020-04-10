import Mutation from '@what-a-faka/obj-mutation'
import { join } from '@/utils/common'
import { NOREMAL_UPLOAD_URL } from '@/config'
import { getMapOptions } from '@/utils/mappings'

export const filtersFields = () => {
  return [
    {
      type: 'array',
      title: '展示位置',
      name: 'pos__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        placeholder: '请选择展示位置',
        options: [
          { label: '首页', value: 'home' },
          { label: '在线培训', value: 'train' },
        ],
      },
    }, // 展示位置

    {
      type: 'array',
      title: '轮播状态',
      name: 'status__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        placeholder: '请选择轮播状态',
        options: getMapOptions('bannerStatus', ['deleted']),
      },
    }, // 轮播状态
  ]
}

export const filtersMutation = new Mutation({
  pos__in: { format: join },
  status__in: { format: join },
})

export const bannerFields = (vm) => {
  return [
    {
      type: 'string',
      title: '展示位置',
      name: 'pos',
      widget: 'select',
      rules: [{ required: true, message: '展示位置必填', trigger: 'blur' }],
      xProps: {
        placeholder: '请选择展示位置',
        options: [
          { label: '首页', value: 'home' },
          { label: '在线培训', value: 'train' },
        ],
      },
    }, // 展示位置

    {
      type: 'string',
      title: '展示排序',
      name: 'seq',
      widget: 'inputNumber',
      rules: [{ required: true, message: '展示排序必填', trigger: 'blur' }],
      xProps: {
        min: 0,
        controlsPosition: 'right',
        placeholder: '请输入展示排序',
      },
    }, // 展示排序

    {
      title: '跳转地址',
      name: 'click_url',
      widget: 'select',
      rules: [{ required: false, message: '请输入跳转地址', trigger: 'blur' }],
      xProps: {
        filterable: true,
        multiple: false,
        'allow-create': true,
        options: vm.inner_jumpOpt,
      },
    },
    {
      type: 'string',
      title: '帮助页标题',
      name: 'help_page',
      widget: 'select',
      xProps: {
        filterable: true,
        clearable: true,
        options: vm.helpCenterOpts,
        placeholder: '请选择帮助页标题',
      },
    }, // 帮助页标题
    {
      type: 'string',
      title: '开始时间',
      name: 'start_time',
      widget: 'datetimepicker',
      rules: [{ required: true, message: '开始时间必填', trigger: 'blur' }],
      xProps: {
        type: 'datetime',
        placeholder: '请输入开始时间',
      },
    }, // 开始时间

    {
      type: 'string',
      title: '结束时间',
      name: 'end_time',
      widget: 'datetimepicker',
      rules: [{ required: true, message: '结束时间必填', trigger: 'blur' }],
      xProps: {
        type: 'datetime',
        placeholder: '请输入结束时间',
      },
    }, // 结束时间

    {
      type: 'file',
      title: '',
      name: 'pic_url',
      widget: 'upload',
      xProps: {
        type: 'img',
        targetUrl: NOREMAL_UPLOAD_URL,
        fileTypes: ['png', 'jpeg', 'jpg', 'webp'],
        disabled: false,
        deleteText: '删除文件',
      },
    }, // 上传 banner 图片
  ]
}
