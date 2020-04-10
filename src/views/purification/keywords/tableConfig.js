export function pureCols(vm) {
  return [
    {
      label: '分类',
      prop: 'kw_category',
      width: 120,
    },

    {
      label: '关键词',
      prop: 'word',
      width: 100,
    },
    {
      label: '操作人',
      width: 92,
      prop: 'operator_name',
      component: {
        props: { row: Object },
        render() {
          const time = this.row.operate_time.split(' ')
          return (
            <ul>
              <li class="Fwb">{this.row.operator_name}</li>
              <li>{time[0]}</li>
              <li>{time[1]}</li>
            </ul>
          )
        },
      },
    },
    {
      label: '操作',
      width: 92,
      component: {
        props: { row: Object },
        render() {
          return (
            <div>
              <el-button type="text" onClick={() => vm.modifyKeyword(this.row)}>
                编辑
              </el-button>
              <el-button
                type="text"
                style="color:#f56c6c;"
                onClick={() => vm.deleteKeyword(this.row)}>
                删除
              </el-button>
            </div>
          )
        },
      },
    },
  ]
}
