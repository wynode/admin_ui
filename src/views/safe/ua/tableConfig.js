// import { FormatTime } from '@/components/CellTools.jsx'

export function paramsListCols(vm) {
  return [
    {
      label: 'uaId',
      prop: 'uaId',
      width: 140,
    },
    {
      label: 'uaName',
      prop: 'uaName',
    },
    {
      label: 'uaMatchStr',
      prop: 'uaMatchStr',
    },
    {
      label: '是否禁用',
      prop: 'isForbidden',
      component: {
        props: { row: Object },
        render() {
          const { isForbidden } = this.row
          let nodeTag = ''
          if (isForbidden === 1) {
            nodeTag = '禁用'
          } else {
            nodeTag = '正常'
          }
          return <span>{nodeTag}</span>
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
                onClick={() => vm.modifyParams(this.row)}>
                编辑
              </el-button>

              <el-button
                type="text"
                class="Ml8"
                size="small"
                style="color:#f56c6c;"
                onClick={() => vm.delParams(this.row)}>
                删除
              </el-button>
            </span>
          )
        },
      },
    }, // 操作
  ]
}
