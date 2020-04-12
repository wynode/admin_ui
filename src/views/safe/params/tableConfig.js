// import { FormatTime } from '@/components/CellTools.jsx'

export function paramsListCols(vm) {
  return [
    {
      label: '规则ID',
      prop: 'ruleId',
      width: 120,
    },
    {
      label: '路径',
      prop: 'path',
    },
    {
      label: '名称',
      prop: 'name',
    },
    {
      label: '规则',
      prop: 'rule',
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
          } else if (type == 3) {
            showText = '临时黑名单'
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
