import Mutation from '@what-a-faka/obj-mutation'
import { join } from '@/utils/common'

export const filterFields = (vm) => {
  return [
    {
      type: 'array',
      title: '角色',
      name: 'roles_filter',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: [
          { label: '老板', value: 2 },
          { label: '老板娘', value: 3 },
        ],
      },
    },
    {
      title: '岗位名称',
      name: 'userprofile__position__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.positionOpts,
      },
    },
  ]
}

export const filtersMutate = new Mutation({
  roles_filter: { format: join },
  userprofile__position__in: { format: join },
})
