import { FormatTime, TextCutOff } from '@/components/CellTools.jsx'

export function accessLogListCols() {
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
  ]
}

export function attackLogListCols() {
  return [
    {
      label: '请求ID',
      prop: 'accessId',
      width: 120,
    },
    {
      label: 'ip',
      prop: 'ip',
    },
    {
      label: '账户',
      prop: 'account',
    },
    {
      label: 'query',
      prop: 'query',
    },
    {
      label: 'post',
      prop: 'post',
    },
    {
      label: 'cookie',
      prop: 'cookie',
      component: TextCutOff,
    },
    {
      label: 'hour',
      prop: 'hour',
    },
    {
      label: 'time',
      prop: 'time',
      component: FormatTime,
    },
    {
      label: 'uuid',
      prop: 'uuid',
    },
    {
      label: 'logUuid',
      prop: 'logUuid',
    },
    // {
    //   label: '最后监控时间',
    //   prop: 'lastWatch',
    //   component: FormatTime,
    // },
  ]
}
