export function diskSplitCols() {
  return [
    {
      label: '文件系统',
      prop: 'fileSystem',
    },
    {
      label: '磁盘容量',
      prop: 'size',
    },
    {
      label: '已使用',
      prop: 'used',
    },
    {
      label: '未使用',
      prop: 'avail',
    },
    {
      label: '已使用占比',
      prop: 'usedPercentage',
    },
    {
      label: '挂载路径',
      prop: 'mounted',
    },
    // {
    //   label: '操作',
    //   width: 150,
    //   component: {
    //     props: { row: Object },
    //     render() {
    //       return (
    //         <span>
    //           <el-button
    //             type="text"
    //             size="small"
    //             onClick={() => vm.modifyUrl(this.row)}>
    //             编辑
    //           </el-button>

    //           <el-button
    //             type="text"
    //             class="Ml8"
    //             size="small"
    //             style="color:#f56c6c;"
    //             onClick={() => vm.delUrl(this.row)}>
    //             删除
    //           </el-button>
    //         </span>
    //       )
    //     },
    //   },
    // }, // 操作
  ]
}
