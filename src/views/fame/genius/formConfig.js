import { NOREMAL_UPLOAD_URL } from '@/config'

export const geniusFields = () => {
  return [
    {
      type: 'string',
      title: '段位名称',
      name: 'title',
      widget: 'text',
      rules: [{ required: true, message: '段位名称必填', trigger: 'blur' }],
      xProps: {
        placeholder: '请输入段位名称',
      },
    }, // 段位名称
    {
      type: 'file',
      title: '段位图片',
      name: 'pic_url',
      widget: 'upload',
      xProps: {
        type: 'img',
        targetUrl: NOREMAL_UPLOAD_URL,
        fileTypes: ['png', 'jpeg', 'jpg', 'webp'],
        disabled: false,
        deleteText: '删除文件',
      },
    }, // 上传  图片
    {
      type: 'string',
      title: '段位等级',
      name: 'level',
      widget: 'inputNumber',
      rules: [{ required: true, message: '段位等级必填', trigger: 'blur' }],
      xProps: {
        min: 0,
        controlsPosition: 'right',
        placeholder: '请输入段位等级',
      },
    }, // 段位等级

    {
      type: 'string',
      title: '达人分值',
      name: 'threshold',
      widget: 'inputNumber',
      rules: [{ required: true, message: '达人分值必填', trigger: 'blur' }],
      xProps: {
        min: 0,
        controlsPosition: 'right',
        placeholder: '请输入达人分值',
      },
    }, // 达人分值
  ]
}
