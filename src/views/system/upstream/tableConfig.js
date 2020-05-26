// import { FormatTime } from '@/components/CellTools.jsx'

export function upstreamListCols(vm) {
  return [
    // {
    //   label: '上游Id',
    //   prop: 'upId',
    //   width: 120,
    // },
    {
      label: 'host地址',
      prop: 'host',
    },
    {
      label: '端口',
      prop: 'port',
    },
    {
      label: '模式',
      prop: 'schema',
    },
    {
      label: '权重',
      prop: 'weight',
    },
    {
      label: '客户host地址',
      prop: 'customHost',
    },
    {
      label: '是否存活',
      prop: 'isAlive',
      component: {
        props: { row: Object },
        render() {
          const { isAlive } = this.row
          let showText = ''
          if (isAlive === 0) {
            showText = '否'
          } else if (isAlive === 1) {
            showText = '是'
          }
          return <div>{showText}</div>
        },
      },
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
