export const assignLevelCols = (vm) => {
  return [
    {
      label: '领单等级名称',
      prop: 'name',
      width: 200,
    },

    {
      label: '单次领单数量',
      prop: 'once_assign_number',
      width: 140,
    },

    {
      label: '净网类型名称',
      prop: 'purify_config_cn',
    },

    {
      label: '操作',
      width: 200,
      component: {
        props: { row: Object },
        render() {
          return (
            <span>
              <el-button
                type="text"
                onClick={() => vm.modifyAssignLevel(this.row)}>
                编辑
              </el-button>

              <el-button
                type="text"
                class="Ml8"
                style="color:#f56c6c;"
                onClick={() => vm.delAssignLevel(this.row)}>
                删除
              </el-button>
            </span>
          )
        },
      },
    }, // 操作
  ]
}
