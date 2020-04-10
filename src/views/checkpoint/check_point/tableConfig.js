import { toPercent, toThousands } from '@/utils/common'
import { DatetimeCell } from '@/components/CellTools'
// import QuestionLite from '@/components/QuestionLite.vue'
import { QuestionTopic, TextCutOff } from '@/components/CellTools'

export function checkPointCols(vm) {
  return [
    {
      label: 'ID',
      prop: 'id',
      width: 56,
    },
    {
      label: '关卡名称',
      prop: 'name/category_cn/status_cn',
      width: 120,
      component: {
        props: { row: Object },
        render() {
          const { name, category_cn } = this.row
          return (
            <div>
              <div>{name}</div>
              <el-tag type="primary" size="mini">
                {category_cn}
              </el-tag>
            </div>
          )
        },
      },
    },
    {
      label: '关卡状态',
      prop: 'status_cn',
      width: 72,
    },
    {
      label: '创建时间',
      prop: 'create_time',
      width: 84,
      component: DatetimeCell,
    },
    {
      label: '开始时间',
      prop: 'enable_start_time',
      width: 84,
      component: DatetimeCell,
    },
    {
      label: '结束时间',
      prop: 'enable_end_time',
      width: 84,
      component: DatetimeCell,
    },
    {
      label: '关卡说明',
      prop: 'explain',
      showOverflowTooltip: true,
      component: TextCutOff,
    },
    {
      label: '帮助页标题',
      prop: 'help_page',
      component: {
        props: { row: Object },
        render() {
          const item = vm.helpCenterOpts.filter(
            (v) => v.id == this.row.help_page
          )[0]
          return <div>{item ? item.title : ''}</div>
        },
      },
    },
    {
      label: '关卡题量',
      prop: 'user_question_num/total_question_count',
      width: 72,
      component: {
        props: { row: Object },
        render() {
          return (
            <div>
              <span class="Fwb" style="color:#845bea;">
                {this.row.user_question_num}
              </span>
              <span class="Di Mx4">/</span>
              <span>{this.row.total_question_count}</span>
            </div>
          )
        },
      },
    },
    {
      label: '冲关次数',
      prop: 'total_rush_count',
      width: 80,
      formatter: (row, col, cell) => (cell ? toThousands(cell) : 0),
    },
    {
      label: '通关率',
      prop: 'success_rate',
      width: 64,
      formatter: (row, col, cell) => (cell ? toPercent(cell, 1) : 0),
    },
    {
      label: '平均耗时(秒)',
      prop: 'avg_duration',
      minWidth: 68,
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
            <ul>
              <li class="Fwb">{this.row.operator_name}</li>
              <li>{time[0]}</li>
              <li>{time[1]}</li>
            </ul>
          )
        },
      },
    },
    {
      label: '操作',
      width: 92,
      component: {
        props: { row: Object },
        render() {
          return (
            <span>
              <router-link
                to={{ name: 'checkPointUpdate', params: { id: this.row.id } }}
                target="_blank">
                <el-button type="text">编辑</el-button>
              </router-link>

              <el-button
                type="text"
                class="Ml8"
                style="color:#f56c6c;"
                onClick={() => vm.deleteCheckPoint(this.row)}>
                删除
              </el-button>
            </span>
          )
        },
      },
    },
  ]
}

export function examLiteCols(vm) {
  return [
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
      width: 120,
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
