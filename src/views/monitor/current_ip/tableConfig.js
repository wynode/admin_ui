import { FormatTime } from '@/components/CellTools.jsx'

export function urlListCols(vm) {
  return [
    {
      label: '最后访问时间',
      prop: 'lastAccessTime',
      component: FormatTime,
    },
    {
      label: '访问总次数',
      prop: 'accessTimes',
    },
    {
      label: '第一次访问时间',
      prop: 'firstAccessTime',
      component: FormatTime,
    },
    {
      label: '每秒查询率（qps）',
      prop: 'qps',
    },
    {
      label: '访问频率',
      prop: 'accessInInterval',
    },
    {
      label: 'ip地址',
      prop: 'ip',
      component: {
        props: { row: Object },
        render() {
          return <span>{vm.langtoip(this.row.ip)}</span>
        },
      },
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
