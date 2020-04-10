import Mutation from '@what-a-faka/obj-mutation'
import { join } from '@/utils/common'

export const filterFields = () => {
  return [
    {
      type: 'array',
      name: 'os__in',
      title: '系统',
      widget: 'select',
      xProps: {
        options: [
          { label: 'android', value: 'android' },
          { label: 'ios', value: 'ios' },
        ],
      },
    },
  ]
}

export const filtersMutateInit = new Mutation({
  os__in: { format: join },
})

export const editAppFields = (vm) => {
  return [
    {
      type: 'array',
      title: '系统',
      name: 'os',
      widget: 'select',
      rules: [{ required: true, message: '系统平台必填' }],
      xProps: {
        placeholder: '请选择系统平台',
        options: [
          { label: 'android', value: 'android' },
          { label: 'ios', value: 'ios' },
        ],
      },
    }, // 系统

    {
      type: 'string',
      title: '版本标识',
      name: 'version',
      widget: 'text',
      rules: [
        { required: true, message: '版本标识必填' },
        { max: 10, message: '不可以超过10个字' },
      ],
      xProps: {
        placeholder: '请输入版本标识',
      },
    }, // 版本标识

    {
      type: 'number',
      title: '版本号',
      name: 'version_code',
      widget: 'inputNumber',
      rules: [{ required: true, message: '版本号必填', trigger: 'blur' }],
      xProps: {
        min: 0,
        controlsPosition: 'right',
        placeholder: '请输入版本号',
      },
    }, // 版本号

    {
      type: 'number',
      title: '灰度尾号',
      name: 'graylist',
      widget: 'checkbox',
      rules: [{ required: false, message: '灰度尾号号必填' }],
      xProps: {
        options: Array.from({ length: 10 }, (v, i) => ({ label: i, value: i })),
      },
    }, // 灰度尾号

    {
      type: 'number',
      title: '灰度uid',
      name: 'grayuid',
      widget: 'text',
      rules: [{ required: false }],
      xProps: {},
    }, // 灰度uid

    {
      type: 'file',
      title: '安装包',
      name: 'pkg_url',
      widget: 'upload',
      rules: [{ required: true, message: '请上传安装包' }],
      xProps: {
        type: 'file',
        targetUrl: vm.NOREMAL_UPLOAD_URL,
        fileTypes: ['apk', 'ipa'],
        disabled: false,
        deleteText: '删除文件',
      },
    }, // 安装包

    {
      type: 'string',
      title: '强制更新',
      name: 'force',
      widget: 'radio',
      xProps: {
        options: [
          { label: '否', value: 0 },
          { label: '是', value: 1 },
        ],
      },
    }, // 强制更新

    {
      type: 'string',
      title: '更新日志',
      name: 'changelog',
      widget: 'text',
      rules: [],
      xProps: {
        placeholder: '请输入更新日志',
        type: 'textarea',
      },
    }, // 更新日志
  ]
}
