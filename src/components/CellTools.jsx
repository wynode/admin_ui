import { splite, textCutOff } from '@/utils/common'
import { dateFormat } from '@/utils/dateFormat'
import parseHTMLDom from '@/utils/parseHTMLDom'

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

export const QuestionTopic = ({ props }) => {
  const {
    row,
    // column: { prop },
  } = props
  const orderList = ['A. ', 'B. ', 'C. ', 'D. ']
  const questionItem = row.puzzle.map((pz, index) => {
    if (row.answer.includes(pz[0])) {
      return <p style={'color: #845bea'}>{orderList[index] + pz[1]}</p>
    }
    return <p>{orderList[index] + pz[1]}</p>
  })
  const topic = <h3 class={'question_topic_title'}>{row.topic}</h3>
  const typeSelect = {
    disabled: 'danger',
    normal: 'success',
    preaudit: 'info',
    unpermit: 'warning',
  }
  const statusTag = (
    <el-tag
      type={typeSelect[row.status]}
      size="mini"
      style={'margin-left: 4px'}>
      {row.status_cn}
    </el-tag>
  )
  const topicImage = (
    <DecodeImageList urls={[row.topic_image]}></DecodeImageList>
  )

  return (
    <el-popover
      placement="top"
      trigger="hover"
      placement="right"
      class="Di table_question_topic">
      {topic}
      {questionItem}
      {row.topic_image ? topicImage : ''}
      <div slot="reference">
        <span>{textCutOff(row.topic, 32)}</span>
        {row.status_cn ? statusTag : ''}
      </div>
    </el-popover>
  )
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

// 内容和原贴table展示使用（依靠传入的prop为parent_topic自动判断是否原贴）
export const PureContentCutOff = ({ props }) => {
  const {
    row,
    column: { prop },
  } = props
  const { keywords } = row
  let urls = (prop == 'parent_topic' ? row.parent_pictures : row.pictures) || []
  let content = row[prop] || ''

  if (prop.includes('.')) {
    const indexArray = prop.split('.')
    const indexOne = indexArray[0]
    const indexTwo = indexArray[1]
    const secondObj = row[indexOne]
    urls =
      (indexTwo == 'parent_topic'
        ? secondObj.parent_pictures
        : secondObj.pictures) || []
    content = secondObj[indexTwo] || ''
  }

  // 添加解析html标签和关键字高亮
  content = parseHTMLDom(content)
  if (keywords) {
    if (content) {
      keywords.forEach((key) => {
        const reg = new RegExp(key.word, 'g')
        content = content.replace(
          reg,
          `<span class="keyword_mark">${key.word}</span>`
        )
      })
    }
  }

  // 字数超过限制使用弹出框组件
  const textcut = (
    <el-popover trigger="hover" placement="right" style="height: 200px">
      <p slot="reference">
        {content ? (
          <p
            domPropsInnerHTML={content}
            style="height: 24px; overflow: hidden"></p>
        ) : (
          <i class="el-icon-paperclip"></i>
        )}
      </p>
      <div class="popover_set">
        <div domPropsInnerHTML={content}></div>
        {urls.length ? <DecodeImageList urls={urls}></DecodeImageList> : ''}
      </div>
    </el-popover>
  )

  return <div>{urls.length > 0 || content.length > 36 ? textcut : content}</div>
}

// 三级标签使用
export const ThirdTagCutOff = ({ props }) => {
  const {
    row,
    column: { prop },
    retain,
  } = props
  const content = row[prop] || ''
  const showContent = content ? (
    <el-tag type="danger" size="mini">
      {row[prop]}
    </el-tag>
  ) : (
    ''
  )
  const isOver = content.length > (retain || 6)

  const textcut = (
    <el-popover trigger="hover" placement="right">
      <el-tag type="danger" size="mini">
        {row[prop]}
      </el-tag>
      <el-tag
        slot="reference"
        type="danger"
        size="mini"
        class="cell_tools_third_tags">
        {row[prop]}
      </el-tag>
    </el-popover>
  )

  return <div>{isOver ? textcut : showContent}</div>
}
