// import { FormatTime } from '@/components/CellTools.jsx'

export function paramsListCols(vm) {
  return [
    {
      label: 'id',
      prop: 'id',
      width: 140,
    },
    {
      label: '省份名称',
      prop: 'provinceName',
    },
    {
      label: '城市名称',
      prop: 'cityName',
    },
    {
      label: '邮编',
      prop: 'zipCode',
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
            </span>
          )
        },
      },
    }, // 操作
  ]
}
