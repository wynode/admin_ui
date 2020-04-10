import Mutation from '@what-a-faka/obj-mutation'
import { join } from '@/utils/common'

export const filtersMutateInit = new Mutation({
  os__in: { format: join },
})

export const editCategoryFields = () => {
  return [
    {
      type: 'string',
      title: '分类名称',
      name: 'name',
      widget: 'text',
      rules: [{ required: true, message: '课程分类名称必填' }],
      xProps: {
        placeholder: '请输入课程分类名称',
      },
    }, // 课程分类名称

    {
      type: 'number',
      title: '排序',
      name: 'order',
      widget: 'inputNumber',
      rules: [{ required: true, message: '排序编号必填', trigger: 'blur' }],
      xProps: {
        min: 0,
        controlsPosition: 'right',
        placeholder: '请输入排序编号',
      },
    }, // 版本号
  ]
}
