import { FormatTime, TextCutOff } from '@/components/CellTools.jsx'

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
