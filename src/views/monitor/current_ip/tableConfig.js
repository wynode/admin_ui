import { FormatTime } from '@/components/CellTools.jsx'
import { dateFormat } from '@/utils/dateFormat'

export function urlListCols(vm) {
  return [
    {
      label: 'ip地址',
      prop: 'ip',
      width: 230,
      component: {
        props: { row: Object },
        render() {
          const { ipInfo } = this.row
          let showText = ''
          let expire = ''
          let note = ''
          if (ipInfo) {
            if (ipInfo.type == 1) {
              showText = '白名单'
            } else if (ipInfo.type == 2) {
              showText = '黑名单'
            } else if (ipInfo.type == 3) {
              showText = '临时黑名单'
            }
            expire = dateFormat(ipInfo.expire * 1000)
            note = ipInfo.note
          }
          const black = (
            <div style="font-size: 12px">
              <div>{showText}</div>
              <div>{expire ? `过期时间：${expire}` : ''}</div>
              <div>{note}</div>
            </div>
          )
          return (
            <div class="ip_col" onClick={() => vm.goaccess(this.row)}>
              {vm.langtoip(this.row.ip)}
              {black}
            </div>
          )
        },
      },
    },
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
      label: '查看',
      width: 190,
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
                onClick={() => vm.goattack(this.row)}>
                查看攻击日志
              </el-button>
              <el-button
                type="text"
                class="Ml8"
                size="small"
                onClick={() => vm.goaccess(this.row)}>
                查看请求日志
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
                class="Ml8"
                size="small"
                style="color:#f56c6c;"
                onClick={() => vm.goblack(this.row)}>
                拉黑
              </el-button>
              <el-button
                type="text"
                size="small"
                onClick={() => vm.gowhite(this.row)}>
                白名单
              </el-button>
            </span>
          )
        },
      },
    }, // 操作
  ]
}
