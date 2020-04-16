// import { FormatTime } from '@/components/CellTools.jsx'

export function IpListCols(vm) {
  return [
    {
      label: '配置名',
      prop: 'item',
    },
    {
      label: '配置值',
      prop: 'value',
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
                size="small"
                onClick={() => vm.modifyUpstream(this.row)}>
                编辑
              </el-button>
            </span>
          )
        },
      },
    }, // 操作
  ]
}
