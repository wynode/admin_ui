import { dateFormat } from '@/utils/dateFormat'

export function tableCols(vm) {
  return [
    {
      label: '姓名',
      prop: 'user_name',
      width: 100,
    },
    {
      label: '所在部门',
      prop: 'department_cn',
    },
    {
      label: '积分变更数量',
      prop: 'score_change',
    },
    {
      label: '积分变更状态',
      prop: 'score_status_cn',
      component: {
        props: { row: Object },
        render() {
          let tag = <p>{this.row.score_status_cn}</p>
          if (this.row.score_status_cn == '待处理') {
            tag = (
              <el-button
                type="text"
                onClick={() => vm.modifyScoreStatus(this.row)}>
                待处理
              </el-button>
            )
          }
          return <div>{tag}</div>
        },
      },
    },
    {
      label: '积分变更类型',
      prop: 'score_type_cn',
    },
    {
      label: '变更说明',
      prop: 'score_reason',
    },
    {
      label: '变更操作说明',
      prop: 'remark',
    },
    {
      label: '发送时间',
      prop: 'create_time',
      component: {
        props: { row: Object },
        render() {
          return (
            <div>
              {dateFormat(this.row.create_time)
                .split(' ')
                .map((time) => (
                  <div>{time}</div>
                ))}
            </div>
          )
        },
      },
    },
    {
      label: '操作人/时间',
      prop: 'update_time',
      component: {
        props: { row: Object },
        render() {
          return (
            <div>
              <div>{this.row.operator_name}</div>
              {dateFormat(this.row.update_time)
                .split(' ')
                .map((time) => (
                  <div>{time}</div>
                ))}
            </div>
          )
        },
      },
    },
  ]
}
