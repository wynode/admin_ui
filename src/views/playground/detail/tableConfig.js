import { PureContentCutOff } from '@/components/CellTools'

export function playDetailCols() {
  return [
    {
      label: '内容ID',
      width: 120,
      component: {
        props: { row: Object },
        render() {
          return (
            <div>
              <p>{this.row.content_id}</p>
              {this.row.content_type_cn ? (
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
      label: '练习人',
      prop: 'user_name',
      width: 80,
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
      width: 100,
      prop: 'purifyconfig_name',
    },

    {
      label: '净网内容',
      prop: 'content',
      component: PureContentCutOff,
    },

    {
      label: '练习结果',
      width: 70,
      component: {
        props: { row: Object },
        render() {
          return (
            <div>
              {this.row.practice_result_cn === '失败' ? (
                <i
                  class="el-icon-close"
                  style="color: red;font-size: 18px;"></i>
              ) : (
                <i
                  class="el-icon-check"
                  style="color: green;font-size: 18px;"></i>
              )}
            </div>
          )
        },
      },
    },

    {
      label: '正确结果',
      component: {
        props: { row: Object },
        render() {
          return (
            <div>
              <p>{this.row.correct_first_result_cn}</p>
              {this.row.correct_second_result_cn ? (
                <div>
                  <el-tag size="mini" type="danger">
                    {this.row.correct_second_result_cn}
                  </el-tag>
                </div>
              ) : (
                ''
              )}

              {this.row.correct_third_result_cn ? (
                <div>
                  <el-tag size="mini" type="danger">
                    {this.row.correct_third_result_cn}
                  </el-tag>
                </div>
              ) : (
                ''
              )}
            </div>
          )
        },
      },
    },

    {
      label: '提交结果',
      component: {
        props: { row: Object },
        render() {
          return (
            <div>
              <p>{this.row.first_result_cn}</p>
              {this.row.second_result_cn ? (
                <div>
                  <el-tag size="mini" type="danger">
                    {this.row.second_result_cn}
                  </el-tag>
                </div>
              ) : (
                ''
              )}

              {this.row.third_result_cn ? (
                <div>
                  <el-tag size="mini" type="danger">
                    {this.row.third_result_cn}
                  </el-tag>
                </div>
              ) : (
                ''
              )}
            </div>
          )
        },
      },
    },

    {
      label: '领取时间',
      width: 92,
      prop: 'receive_time',
    },

    {
      label: '提交时间',
      width: 92,
      prop: 'result_time',
    },

    {
      label: '耗时(s)',
      width: 70,
      prop: 'duration',
    },
  ]
}
