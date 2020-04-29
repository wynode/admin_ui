import { OneLineText } from '@/components/CellTools.jsx'
// import { dateFormat } from '@/utils/dateFormat'
import { byteToMGb } from '@/utils/common'
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
      width: 200,
      component: {
        props: { row: Object },
        render() {
          return <div>{langtoip(this.row.ip)}</div>
        },
      },
    },
    {
      label: '日期',
      prop: 'date',
      component: {
        props: { row: Object },
        render() {
          const { date } = this.row

          const year = String(date).slice(0, 2)
          const month = String(date).slice(2, 4)
          const day = String(date).slice(4, 6)
          return <div>{`20${year}-${month}-${day}`}</div>
        },
      },
    },
    {
      label: '访问次数',
      prop: 'accessNum',
      component: OneLineText,
    },
    {
      label: '入网流量',
      prop: 'incomeTransferNum',
      component: {
        props: { row: Object },
        render() {
          return <div>{byteToMGb(this.row.incomeTransferNum)}</div>
        },
      },
    },
    {
      label: '可疑次数',
      prop: 'suspectNum',
      component: OneLineText,
    },
  ]
}
