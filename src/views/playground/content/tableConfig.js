import { PureContentCutOff, ThirdTagCutOff } from '@/components/CellTools'

export function playContentCols(vm) {
  return [
    {
      label: '内容ID',
      prop: 'content_id',
      component: {
        props: { row: Object },
        render() {
          return (
            <div>
              <p>{this.row.content_id}</p>
              {this.row.content_type ? (
                <el-tag size="mini">{this.row.content_type_cn}</el-tag>
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
      width: 100,
    },
    {
      label: '净网内容',
      prop: 'content',
      // width: 160,
      component: PureContentCutOff,
    },
    {
      label: '内容状态',
      width: 70,
      component: {
        props: { row: Object },
        render() {
          return (
            <div>
              {this.row.status_cn === '禁用' ? (
                <span style="color: red">禁用</span>
              ) : (
                <span style="color: green">启用</span>
              )}
            </div>
          )
        },
      },
    },
    {
      label: '正确结果',
      width: 70,
      prop: 'correct_first_result_cn',
    },
    {
      label: '二级标签',
      width: 80,
      component: {
        props: { row: Object },
        render() {
          return (
            <div>
              {this.row.correct_second_result_cn ? (
                <el-tag type="danger" size="mini">
                  {this.row.correct_second_result_cn}
                </el-tag>
              ) : (
                ''
              )}
            </div>
          )
        },
      },
    },
    {
      label: '三级标签',
      minWidth: 80,
      prop: 'correct_third_result_cn',
      component: ThirdTagCutOff,
    },
    {
      label: '内容入库时间',
      width: 92,
      prop: 'entry_time',
    },
    {
      label: '正确/练习总数/正确率',
      // width: 160,
      component: {
        props: { row: Object },
        render() {
          return (
            <div>{`${this.row.correct_count}/${this.row.total_count}/${`${(
              this.row.correct_rate * 100
            ).toFixed(1)}%`}`}</div>
          )
        },
      },
    },
    {
      label: '平均耗时(s)',
      component: {
        props: { row: Object },
        render() {
          return (
            <div>
              <p>{parseInt(this.row.avg_duration)}</p>
            </div>
          )
        },
      },
    },
    {
      label: '操作人/时间',
      width: 92,
      component: {
        props: { row: Object },
        render() {
          return (
            <div>
              <p>{this.row.operator_name}</p>
              <p>{this.row.operate_time}</p>
            </div>
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
            <div>
              <el-button
                type="text"
                onClick={() => vm.modifyPureConfig(this.row)}>
                编辑
              </el-button>
              <el-button
                onClick={() => vm.deletePureConfig(this.row)}
                type="text"
                style="color: red">
                删除
              </el-button>
            </div>
          )
        },
      },
    },
  ]
}
