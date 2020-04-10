import { dateFormat } from '@/utils/dateFormat'

export function managerCols() {
  return [
    {
      label: 'ID',
      prop: 'id',
      width: 100,
    },
    {
      label: '姓名',
      prop: 'staff_name',
    },
    {
      label: '账号',
      prop: 'username',
    },
    {
      label: '部门',
      prop: 'dept',
    },
    {
      label: '角色',
      prop: 'groups',
      formatter(col) {
        return Array.isArray(col.groups)
          ? col.groups.map((r) => r.name).join(',')
          : ''
      },
    },
    {
      label: '邮箱',
      prop: 'email',
    },
    {
      label: '创建时间',
      prop: 'date_joined',
      component: {
        props: { row: Object },
        render() {
          return <div>{dateFormat(this.row.date_joined)}</div>
        },
      },
    },
  ]
}
