import { dateFormat } from '@/utils/dateFormat'
import { toThousands, splite } from '@/utils/common'
import { QuestionTopic, TextCutOff } from '@/components/CellTools'

export function userExamCols() {
  return [
    {
      label: 'ID',
      prop: 'id',
      width: 80,
    },
    {
      label: '冲关ID',
      prop: 'user_exam_id',
      width: 80,
    },
    {
      label: '答题人',
      prop: 'user',
      width: 80,
    },
    {
      label: '所在部门',
      prop: 'department/position',
      minWidth: 150,
      component: {
        props: { row: Object },
        render() {
          const { department, position } = this.row
          const showTag = position ? (
            <ElTag size="mini" type="primary">
              {position}
            </ElTag>
          ) : (
            ''
          )
          return (
            <div>
              <div>{department}</div>
              {showTag}
            </div>
          )
        },
      },
    },
    {
      label: '题目',
      prop: 'topic',
      minWidth: 100,
      component: QuestionTopic,
    },
    {
      label: '答题解析',
      prop: 'explain',
      component: TextCutOff,
    },
    {
      label: '答题结果',
      prop: 'result',
      minWidth: 70,
    },
    {
      label: '用时(秒)',
      prop: 'duration',
      minWidth: 80,
      formatter: (row, col, cell) => toThousands(cell),
    },
    {
      label: '作答时间',
      prop: 'answer_time',
      width: 104,
      component: {
        props: { row: Object },
        render() {
          const date = splite(dateFormat(this.row.answer_time), ' ')
          return (
            <div>
              {date.map((el) => (
                <div>{el}</div>
              ))}
            </div>
          )
        },
      },
    },
  ]
}
