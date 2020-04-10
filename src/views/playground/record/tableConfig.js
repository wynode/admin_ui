export function playRecordCols() {
  return [
    {
      label: '练习人',
      prop: 'user_name',
    },

    {
      label: '所在部门',
      width: 120,
      component: {
        props: { row: Object },
        render() {
          return (
            <div>
              <p>{this.row.department_cn}</p>
              {this.row.position ? (
                <el-tag size="mini">{this.row.position}</el-tag>
              ) : (
                ''
              )}
            </div>
          )
        },
      },
    },

    {
      label: '净网类型名称',
      prop: 'purifyconfig_name',
      width: 160,
    },

    {
      label: '练习状态',
      component: {
        props: { row: Object },
        render() {
          return (
            <div>
              {this.row.status_cn === '中断' ? (
                <span style="color: red">{this.row.status_cn}</span>
              ) : (
                <span style="color: green">{this.row.status_cn}</span>
              )}
            </div>
          )
        },
      },
    },

    {
      label: '练习错误数',
      prop: 'error_count',
    },

    {
      label: '练习完成数',
      prop: 'total_count',
    },

    {
      label: '正确率',
      prop: 'correct_rate',
    },

    {
      label: '练习开始时间',
      width: 160,
      prop: 'start_time',
    },

    {
      label: '练习结束时间',
      prop: 'end_time',
    },

    {
      label: '耗时(s)',
      width: 92,
      prop: 'duration',
    },
  ]
}
