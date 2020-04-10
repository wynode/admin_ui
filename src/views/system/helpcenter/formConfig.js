import Mutation from '@what-a-faka/obj-mutation'
import { join } from '@/utils/common'
import { getMapOptions } from '@/utils/mappings'

export const filtersFields = () => {
  return [
    {
      type: 'array',
      title: '类型',
      name: 'wiki_type__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        placeholder: '请选择类型',
        options: getMapOptions('wikiTypes'),
      },
    }, // 广播状态
  ]
}

export const filtersMutation = new Mutation({
  wiki_type__in: { format: join },
})

export const editFields = (vm) => {
  return [
    {
      type: 'string',
      title: '类型',
      name: 'wiki_type',
      widget: 'select',
      rules: [{ required: true, message: '类型必填', trigger: 'change' }],
      xProps: {
        placeholder: '请输入类型',
        options: getMapOptions('wikiTypes'),
      },
    }, // 类型

    {
      type: 'string',
      title: '名称',
      name: 'title',
      widget: 'text',
      rules: [{ required: true, message: '名称必填', trigger: 'blur' }],
      xProps: {
        min: 0,
        controlsPosition: 'right',
        placeholder: '请输入名称',
      },
    }, // 名称

    {
      type: 'number',
      title: '上级',
      name: 'parent',
      widget: 'select',
      xProps: {
        clearable: true,
        options: vm.wikiParents,
      },
    }, // 所在部门

    {
      type: 'string',
      title: '帮助内容',
      name: 'content',
      widget: 'UEditor',
      rules: [{ required: true, message: '帮助内容必填', trigger: 'blur' }],
      xProps: {},
    }, // 帮助内容
  ]
}
