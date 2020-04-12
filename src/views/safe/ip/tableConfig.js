// import { FormatTime } from '@/components/CellTools.jsx'

export function IpListCols(vm) {
  return [
    {
      label: 'ip',
      prop: 'ip',
    },
    {
      label: '类型',
      prop: 'type',
      component: {
        props: { row: Object },
        render() {
          const { type } = this.row
          let showText = ''
          if (type == 1) {
            showText = '黑名单'
          } else if (type == 2) {
            showText = '白名单'
          }
          return <div>{showText}</div>
        },
      },
    },
    {
      label: '备注',
      prop: 'note',
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
                class="Ml8"
                size="small"
                style="color:#f56c6c;"
                onClick={() => vm.delUpstream(this.row)}>
                删除
              </el-button>
            </span>
          )
        },
      },
    }, // 操作
  ]
}
