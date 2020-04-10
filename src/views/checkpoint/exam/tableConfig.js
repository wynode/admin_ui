import { QuestionTopic, TextCutOff } from '@/components/CellTools'
import { toPercent } from '@/utils/common'

export function questionCols(vm) {
  return [
    {
      label: 'ID',
      prop: 'id',
      width: 80,
      component: {
        props: { row: Object },
        render() {
          return (
            <div>
              <div>{this.row.id}</div>
              <el-tag type="primary" size="mini">
                {this.row.origin_cn}
              </el-tag>
            </div>
          )
        },
      },
    },
    {
      label: '题目',
      prop: 'topic',
      align: 'left',
      component: QuestionTopic,
    },
    {
      label: '答题解析',
      prop: 'explain',
      component: TextCutOff,
    },
    {
      label: '评估模型',
      prop: 'direction_cn',
      width: 80,
      component: {
        props: { row: Object },
        render() {
          const pTag = this.row.direction_cn.map((dc) => {
            return <p>{dc}</p>
          })
          return <div>{pTag}</div>
        },
      },
    },
    {
      label: '所属关卡',
      prop: 'check_point_name',
      width: 100,
      component: {
        props: {
          row: Object,
        },
        render() {
          return (
            <div>
              <div>{this.row.check_point_name}</div>
              <el-tag type="primary" size="mini">
                {this.row.category_cn}
              </el-tag>
            </div>
          )
        },
      },
    },
    {
      label: '作答/错误/正确率',
      prop: 'total_count',
      width: 120,
      formatter(col) {
        const total_count = col.total_count || '0'
        const error_count = col.error_count || '0'
        const correct_rate = toPercent(col.correct_rate)
        return `${total_count}/${error_count}/${correct_rate}`
      },
    },
    {
      label: '均时（s）',
      prop: 'avg_duration',
      width: 74,
    },
    {
      label: '出题人',
      prop: 'artist_name',
      width: 70,
    },
    {
      label: '操作人',
      width: 92,
      prop: 'operator_name',
      component: {
        props: { row: Object },
        render() {
          const time = this.row.update_time.split(' ')
          return (
            <div>
              <p>{this.row.operator_name}</p>
              <p>{time[0]}</p>
              <p>{time[1]}</p>
            </div>
          )
        },
      },
    },
    {
      label: '操作',
      width: 110,
      component: {
        props: { row: Object },
        render() {
          return (
            <span>
              <el-button
                type="text"
                onClick={() => vm.handleEditQuestion(this.row)}>
                编辑
              </el-button>
              <el-button
                type="text"
                style="color:#f56c6c;"
                onClick={() => vm.handleDeleteQuestion(this.row)}>
                删除
              </el-button>
            </span>
          )
        },
      },
    },
  ]
}
