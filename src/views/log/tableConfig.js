import { FormatTime, OneLineText } from '@/components/CellTools.jsx'
import { dateFormat } from '@/utils/dateFormat'
import ip from 'ip'
function langtoip(lang) {
  return ip.fromLong(lang)
}
export function accessLogListCols(vm) {
  return [
    // {
    //   label: '请求ID',
    //   prop: 'accessId',
    //   width: 120,
    // },
    {
      label: 'ip',
      prop: 'ip',
      width: 200,
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
            <div class="ip_col" onClick={() => vm.goSelfIp(this.row)}>
              {langtoip(this.row.ip)}
              {black}
            </div>
          )
        },
      },
    },
    {
      label: 'uuid',
      prop: 'uuid',
      component: {
        props: { row: Object },
        render() {
          const { uuid } = this.row
          const textcut = (
            <el-popover trigger="hover" placement="right">
              <p style={'max-width: 400px'}>{uuid}</p>
              <p
                slot="reference"
                class="text_one_line ip_col"
                onClick={() => vm.goSelfUuid(this.row)}>
                {uuid}
              </p>
            </el-popover>
          )

          return <div>{textcut}</div>
        },
      },
    },
    {
      label: 'logUuid',
      prop: 'logUuid',
      component: OneLineText,
    },
    {
      label: 'ipLocation',
      prop: 'ipLocation',
      component: OneLineText,
    },
    {
      label: 'account',
      prop: 'account',
      component: OneLineText,
    },
    {
      label: 'query',
      prop: 'query',
      component: OneLineText,
    },
    {
      label: 'post',
      prop: 'post',
      component: OneLineText,
    },
    {
      label: 'cookie',
      prop: 'cookie',
      component: OneLineText,
    },
    {
      label: 'header',
      prop: 'header',
      component: OneLineText,
    },
    {
      label: 'hour',
      prop: 'hour',
      component: OneLineText,
    },
    {
      label: 'time',
      prop: 'time',
      component: FormatTime,
    },
  ]
}

export function attackLogListCols(vm) {
  return [
    // {
    //   label: '请求ID',
    //   prop: 'accessId',
    //   width: 120,
    // },
    {
      label: 'ip',
      prop: 'ip',
      width: 200,
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
            <div class="ip_col" onClick={() => vm.goSelfIp(this.row)}>
              {langtoip(this.row.ip)}
              {black}
            </div>
          )
        },
      },
    },
    {
      label: 'uuid',
      prop: 'uuid',
      component: {
        props: { row: Object },
        render() {
          const { uuid } = this.row
          const textcut = (
            <el-popover trigger="hover" placement="right">
              <p style={'max-width: 400px'}>{uuid}</p>
              <p
                slot="reference"
                class="text_one_line ip_col"
                onClick={() => vm.goSelfUuid(this.row)}>
                {uuid}
              </p>
            </el-popover>
          )

          return <div>{textcut}</div>
        },
      },
    },
    {
      label: 'logUuid',
      prop: 'logUuid',
      component: OneLineText,
    },
    {
      label: 'ipLocation',
      prop: 'ipLocation',
      component: OneLineText,
    },
    {
      label: 'account',
      prop: 'account',
      component: OneLineText,
    },

    {
      label: '攻击类型',
      prop: 'attackType',
      component: OneLineText,
    },

    {
      label: 'query',
      prop: 'query',
      component: OneLineText,
    },
    {
      label: 'post',
      prop: 'post',
      component: OneLineText,
    },
    {
      label: 'cookie',
      prop: 'cookie',
      component: OneLineText,
    },
    {
      label: 'header',
      prop: 'header',
      component: OneLineText,
    },
    {
      label: 'hour',
      prop: 'hour',
      component: OneLineText,
    },
    {
      label: 'time',
      prop: 'time',
      component: FormatTime,
    },
    // {
    //   label: '最后监控时间',
    //   prop: 'lastWatch',
    //   component: FormatTime,
    // },
  ]
}
