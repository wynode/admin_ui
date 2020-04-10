import Mutation from '@what-a-faka/obj-mutation'
import { join, dateTimeJoin } from '@/utils/common'

export function filterFields(vm) {
  return [
    {
      title: '消息类型',
      name: 'msg_type__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.formItemList,
      },
    },
    {
      title: '创建时间',
      name: 'create_time__range',
      widget: 'datetimepicker',
      xProps: {
        type: 'datetimerange',
      },
    },
    {
      title: '状态',
      name: 'read_status__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: [
          { label: '未读', value: 0 },
          { label: '已读', value: 1 },
        ],
      },
    },
    {
      title: '接收人',
      name: 'receiver__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.usersOpts,
      },
    },
  ]
}

export const filtersMutateInit = new Mutation({
  msg_type__in: { format: join },
  read_status__in: { format: join },
  receiver__in: { format: join },
  create_time__range: { format: dateTimeJoin },
})
