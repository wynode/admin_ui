import { FormatTime } from '@/components/CellTools.jsx'

export function userListCols(vm) {
  return [
    {
      label: '用户ID',
      prop: 'adminId',
      width: 120,
    },
    {
      label: '用户名',
      prop: 'adminName',
    },
    {
      label: '用户手机或邮箱',
      prop: 'adminAccount',
    },
    {
      label: '用户登录IP',
      prop: 'lastLoginIp',
    },
    {
      label: '用户登录时间',
      prop: 'lastLoginTime',
      component: FormatTime,
    },
    {
      label: '创建时间',
      prop: 'addTime',
      component: FormatTime,
    },

    {
      label: '操作',
      width: 150,
      component: {
        props: { row: Object },
        render() {
          return (
            <span>
              <el-button
                type="text"
                size="small"
                onClick={() => vm.modifyUser(this.row)}>
                编辑
              </el-button>

              <el-button
                type="text"
                class="Ml8"
                size="small"
                style="color:#f56c6c;"
                onClick={() => vm.delUser(this.row)}>
                删除
              </el-button>
            </span>
          )
        },
      },
    }, // 操作
  ]
}
