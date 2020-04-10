export function roleCols(vm) {
  return [
    {
      label: '角色名称',
      prop: 'name',
      width: 160,
    },
    {
      label: '权限详情',
      prop: 'permissions_info',
      component: {
        props: { row: Object },
        render() {
          return (
            <span>
              {this.row.permissions_info.map((p) => p.name).join('、')}
            </span>
          )
        },
      },
    },
    {
      label: '操作',
      width: 120,
      component: {
        props: { row: Object },
        render() {
          return (
            <span>
              <el-button
                type="text"
                onClick={() => vm.handleEditRole(this.row)}>
                编辑
              </el-button>
              <el-button
                type="text"
                style="color:#f56c6c;"
                onClick={() => vm.handleDeleteRole(this.row)}>
                删除
              </el-button>
            </span>
          )
        },
      },
    },
  ]
}
