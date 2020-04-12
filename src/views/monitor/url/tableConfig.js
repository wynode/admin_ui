import { FormatTime } from '@/components/CellTools.jsx'

export function urlListCols(vm) {
  return [
    {
      label: '监控Id',
      prop: 'watchId',
      width: 120,
    },
    {
      label: '链接地址',
      prop: 'url',
    },
    {
      label: 'dnsIP',
      prop: 'dnsIp',
    },
    {
      label: 'http状态',
      prop: 'httpStatus',
    },
    {
      label: '响应时间',
      prop: 'microTime',
    },
    {
      label: '最后监控时间',
      prop: 'lastWatch',
      component: FormatTime,
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
                onClick={() => vm.modifyUrl(this.row)}>
                编辑
              </el-button>

              <el-button
                type="text"
                class="Ml8"
                size="small"
                style="color:#f56c6c;"
                onClick={() => vm.delUrl(this.row)}>
                删除
              </el-button>
            </span>
          )
        },
      },
    }, // 操作
  ]
}
