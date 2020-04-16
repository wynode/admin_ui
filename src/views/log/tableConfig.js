import { FormatTime, TextCutOff } from '@/components/CellTools.jsx'
import ip from 'ip'
function langtoip(lang) {
  return ip.fromLong(lang)
}
export function accessLogListCols() {
  return [
    // {
    //   label: '请求ID',
    //   prop: 'accessId',
    //   width: 120,
    // },
    {
      label: 'ip',
      prop: 'ip',
      component: {
        props: { row: Object },
        render() {
          return <span>{langtoip(this.row.ip)}</span>
        },
      },
    },
    {
      label: '账户',
      prop: 'account',
      component: TextCutOff,
    },
    {
      label: 'query',
      prop: 'query',
      component: TextCutOff,
    },
    {
      label: 'post',
      prop: 'post',
      component: TextCutOff,
    },
    {
      label: 'cookie',
      prop: 'cookie',
      component: TextCutOff,
    },
    {
      label: 'header',
      prop: 'header',
      component: TextCutOff,
    },
    {
      label: 'hour',
      prop: 'hour',
      component: TextCutOff,
    },
    {
      label: 'time',
      prop: 'time',
      component: FormatTime,
    },
    {
      label: 'uuid',
      prop: 'uuid',
      component: TextCutOff,
    },
    {
      label: 'logUuid',
      prop: 'logUuid',
      component: TextCutOff,
    },
  ]
}

export function attackLogListCols() {
  return [
    // {
    //   label: '请求ID',
    //   prop: 'accessId',
    //   width: 120,
    // },
    {
      label: 'ip',
      prop: 'ip',
      component: {
        props: { row: Object },
        render() {
          return <span>{langtoip(this.row.ip)}</span>
        },
      },
    },
    {
      label: '账户',
      prop: 'account',
      component: TextCutOff,
    },
    {
      label: 'query',
      prop: 'query',
      component: TextCutOff,
    },
    {
      label: 'post',
      prop: 'post',
      component: TextCutOff,
    },
    {
      label: 'cookie',
      prop: 'cookie',
      component: TextCutOff,
    },
    {
      label: 'header',
      prop: 'header',
      component: TextCutOff,
    },
    {
      label: 'hour',
      prop: 'hour',
      component: TextCutOff,
    },
    {
      label: 'time',
      prop: 'time',
      component: FormatTime,
    },
    {
      label: 'uuid',
      prop: 'uuid',
      component: TextCutOff,
    },
    {
      label: 'logUuid',
      prop: 'logUuid',
      component: TextCutOff,
    },
    // {
    //   label: '最后监控时间',
    //   prop: 'lastWatch',
    //   component: FormatTime,
    // },
  ]
}
