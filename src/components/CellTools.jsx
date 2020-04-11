import { splite, textCutOff } from '@/utils/common'
import { dateFormat } from '@/utils/dateFormat'
// import parseHTMLDom from '@/utils/parseHTMLDom'

export const DatetimeCell = ({ props }) => {
  const {
    row,
    column: { prop },
  } = props
  const date = splite(dateFormat(row[prop]), ' ')

  return (
    <div>
      {date.map((el) => (
        <div>{el}</div>
      ))}
    </div>
  )
}

export const FormatTime = ({ props }) => {
  const {
    row,
    column: { prop },
  } = props

  const date = dateFormat(row[prop] * 1000)

  return <div>{date}</div>
}

export const TextCutOff = ({ props }) => {
  const {
    row,
    column: { prop },
    retain,
  } = props
  const content = row[prop] || ''
  const isOver = content.length > (retain || 36)
  const textcut = (
    <el-popover trigger="hover" placement="right">
      <p style={'max-width: 400px'}>{row[prop]}</p>
      <p slot="reference">{textCutOff(row[prop], retain || 36)}</p>
    </el-popover>
  )

  return <div>{isOver ? textcut : row[prop]}</div>
}
