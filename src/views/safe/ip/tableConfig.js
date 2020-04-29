// import { FormatTime } from '@/components/CellTools.jsx'
import { dateFormat } from '@/utils/dateFormat'
export function IpListCols(vm) {
  return [
    {
      label: 'ip',
      prop: 'ip',
      component: {
        props: { row: Object },
        render() {
          return <span>{vm.langtoip(this.row.ip)}</span>
        },
      },
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
            showText = '白名单'
          } else if (type == 2) {
            showText = '黑名单'
          } else if (type == 3) {
            showText = '临时黑名单'
          }

          return <div>{showText}</div>
        },
      },
    },
    {
      label: '过期时间',
      prop: 'expire',
      component: {
        props: { row: Object },
        render() {
          const { expire } = this.row

          return (
            <div>
              <div>{expire ? `${dateFormat(expire * 1000)}` : ''}</div>
            </div>
          )
        },
      },
    },

    {
      label: '备注',
      prop: 'note',
    },
    {
      label: '日志',
      width: 190,
      component: {
        props: { row: Object },
        render() {
          return (
            <span>
              <el-button
                class="Ml8"
                size="mini"
                type="danger"
                onClick={() => vm.goattack(this.row)}>
                攻击日志
              </el-button>
              <el-button
                type="primary"
                class="Ml8"
                size="mini"
                onClick={() => vm.goaccess(this.row)}>
                请求日志
              </el-button>
            </span>
          )
        },
      },
    }, // 操作
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
