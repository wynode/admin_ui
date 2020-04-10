import { toThousands } from '@/utils/common'
import { DatetimeCell } from '@/components/CellTools'

export function userExamCols() {
  return [
    {
      label: 'ID',
      prop: 'id',
      width: 80,
    },
    {
      label: '冲关人',
      prop: 'user',
      width: 80,
    },
    {
      label: '所在部门',
      prop: 'department',
      minWidth: 150,
      component: {
        props: { row: Object },
        render() {
          const { department, position } = this.row
          const showTag = position ? (
            <ElTag size="mini" type="primary">
              {this.row.position}
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
      label: '冲关结果',
      prop: 'status',
      width: 70,
    },
    {
      label: '关卡名称',
      prop: 'check_point_name',
      component: {
        props: { row: Object },
        render() {
          return (
            <div>
              <div>{this.row.check_point_name}</div>
              <el-tag type="primary" size="mini">
                {this.row.category}
              </el-tag>
            </div>
          )
        },
      },
    },
    {
      label: '耗时(秒)',
      prop: 'duration',
      minWidth: 80,
      formatter: (row, col, cell) => toThousands(cell),
    },
    {
      label: '错误/答题数',
      prop: 'incorrect_question_num/question_num',
      minWidth: 80,
      component: {
        props: { row: Object },
        render() {
          const text = `${this.row.incorrect_question_num}/${this.row.question_num}`
          return <span class="Whsnw">{text}</span>
        },
      },
    },
    {
      label: '通关评价',
      prop: 'rank',
      width: 96,
      component: {
        props: { row: Object },
        render() {
          const rank = Math.floor(this.row.rank)
          return rank ? (
            <ElRate value={rank} max={rank} disabled></ElRate>
          ) : (
            <span>-</span>
          )
        },
      },
    },
    {
      label: '冲关开始时间',
      prop: 'create_time',
      width: 104,
      component: DatetimeCell,
    },
    {
      label: '冲关结束时间',
      prop: 'end_time',
      width: 104,
      component: DatetimeCell,
    },
  ]
}

export function userExamRankingCols() {
  return [
    {
      label: '姓名',
      prop: 'user',
      width: 72,
    },

    {
      label: '所在部门',
      prop: 'department_cn',
      minWidth: 120,
    },

    {
      label: '总通关数 / 通关值 / 正确率',
      prop: 'all_ranking',
      sortable: 'custom',
      formatter: (row) =>
        `${row.all_success_count} / ${row.all_ranking} / ${row.all_correct_rate}%`,
    },

    {
      label: '法规通关数 / 通关值 / 正确率',
      prop: 'law_ranking',
      sortable: 'custom',
      formatter: (row) =>
        `${row.law_count} / ${row.law_ranking} / ${row.law_correct_rate}%`,
    },

    {
      label: '鉴政通关数 / 通关值 / 正确率',
      prop: 'political_ranking',
      sortable: 'custom',
      formatter: (row) =>
        `${row.political_count} / ${row.political_ranking} / ${row.political_correct_rate}%`,
    },

    {
      label: '鉴黄通关数 / 通关值 / 正确率',
      prop: 'porn_ranking',
      sortable: 'custom',
      formatter: (row) =>
        `${row.porn_count} / ${row.porn_ranking} / ${row.porn_correct_rate}%`,
    },

    {
      label: '鉴恐通关数 / 通关值 / 正确率',
      prop: 'terror_ranking',
      sortable: 'custom',
      formatter: (row) =>
        `${row.terror_count} / ${row.terror_ranking} / ${row.terror_correct_rate}%`,
    },

    {
      label: '鉴俗通关数 / 通关值 / 正确率',
      prop: 'vulgar_ranking',
      sortable: 'custom',
      formatter: (row) =>
        `${row.vulgar_count} / ${row.vulgar_ranking} / ${row.vulgar_correct_rate}%`,
    },

    {
      label: '鉴诈通关数 / 通关值 / 正确率',
      prop: 'fraud_ranking',
      sortable: 'custom',
      formatter: (row) =>
        `${row.fraud_count} / ${row.fraud_ranking} / ${row.fraud_correct_rate}%`,
    },
  ]
}
