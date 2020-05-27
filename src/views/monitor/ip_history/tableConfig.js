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
      label: 'country',
      prop: 'country',
      component: {
        props: { row: Object },
        render() {
          const { country } = this.row
          let showText = ''
          if (country == 'CN') {
            showText = '境内IP'
          } else {
            showText = '境外IP'
          }

          return <div>{showText}</div>
        },
      },
    },
    {
      label: 'ipLocation',
      prop: 'ipLocation',
      component: {
        props: { row: Object },
        render() {
          const { ipLocation } = this.row
          const lo = JSON.parse(ipLocation)
          const showText = lo.province
            ? `${lo.province || ''}${lo.city || ''}${lo.county || ''}`
            : '未知'
          const referenceText = (
            <div>
              <p>省：{lo.province}</p>
              <p>市：{lo.city}</p>
              <p>区：{lo.county}</p>
              <p>经度：{lo.lat}</p>
              <p>维度：{lo.lng}</p>
            </div>
          )
          const refer = lo.province ? <p>{referenceText}</p> : ''
          const textcut = (
            <el-popover trigger="hover" placement="right">
              {refer}
              <p slot="reference">{showText}</p>
            </el-popover>
          )

          return <div>{textcut}</div>
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
