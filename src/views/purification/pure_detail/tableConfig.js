import {
  DatetimeCell,
  PureContentCutOff,
  ThirdTagCutOff,
} from '@/components/CellTools'

export function playDetailCols() {
  return [
    {
      label: '净网ID',
      prop: 'id',
      width: 70,
      component: {
        props: { row: Object },
        render() {
          const tag = this.row.purify_platform_cn ? (
            <el-tag type="primary" size="mini">
              {this.row.purify_platform_cn}
            </el-tag>
          ) : (
            ''
          )
          return (
            <div>
              <div>{this.row.id}</div>
              {tag}
            </div>
          )
        },
      },
    },

    {
      label: '内容ID',
      prop: 'order_info.content_id',
      minWidth: 70,
      component: {
        props: { row: Object },
        render() {
          return this.row.order_info ? (
            <div>
              <div>{this.row.order_info.content_id}</div>
              <el-tag type="primary" size="mini">
                {this.row.order_info.content_type_cn}
              </el-tag>
            </div>
          ) : null
        },
      },
    },

    {
      label: '净网人',
      prop: 'user_name',
      width: 70,
    },

    // {
    //   label: '所在部门',
    //   width: 160,
    //   component: {
    //     props: { row: Object },
    //     render() {
    //       return (
    //         <div>
    //           <p>{this.row.department_cn}</p>
    //           {this.row.position ? (
    //             <el-tag size="mini">{this.row.position}</el-tag>
    //           ) : (
    //             ''
    //           )}
    //         </div>
    //       )
    //     },
    //   },
    // },

    {
      label: '净网类型名称',
      prop: 'purifyconfig_name',
      width: 94,
    },

    {
      label: '净网内容',
      prop: 'order_info.content',
      component: {
        props: { row: Object },
        render() {
          return (
            <PureContentCutOff
              row={{ ...this.row.order_info }}
              column={{
                prop: 'content',
              }}
            />
          )
        },
      },
    },

    {
      label: '净网状态',
      prop: 'first_result_cn',
      width: 70,
      component: {
        props: { row: Object },
        render() {
          this.row.first_result
          return (
            <span class={{ Cr: this.row.first_result === 'illegal' }}>
              {this.row.first_result_cn}
            </span>
          )
        },
      },
    },

    {
      label: '二级标签',
      prop: 'second_result_cn',
      minWidth: 68,
      component: {
        props: { row: Object },
        render() {
          return (
            <el-tag
              v-show={this.row.second_result_cn}
              type="danger"
              size="mini">
              {this.row.second_result_cn}
            </el-tag>
          )
        },
      },
    },

    {
      label: '三级标签',
      prop: 'third_result_cn',
      minWidth: 70,
      component: ThirdTagCutOff,
    },

    {
      label: '置信分',
      prop: 'trust_rate',
      minWidth: 60,
    },

    {
      label: '结果状态',
      prop: 'audit_suborder_result_cn',
      minWidth: 64,
    },

    {
      label: '获得积分',
      prop: 'score',
      minWidth: 64,
    },

    {
      label: '质检状态',
      prop: 'qc_result_cn',
      minWidth: 64,
    },

    {
      label: '质检结果',
      prop: 'qc_first_result_cn',
      width: 70,
      component: {
        props: { row: Object },
        render() {
          this.row.first_result
          return (
            <span class={{ Cr: this.row.qc_first_result === 'illegal' }}>
              {this.row.qc_first_result_cn}
            </span>
          )
        },
      },
    },

    {
      label: '质检二级标签',
      prop: 'qc_second_result_cn',
      minWidth: 68,
      component: {
        props: { row: Object },
        render() {
          return (
            <el-tag
              v-show={this.row.qc_second_result_cn}
              type="danger"
              size="mini">
              {this.row.qc_second_result_cn}
            </el-tag>
          )
        },
      },
    },

    {
      label: '质检三级标签',
      prop: 'qc_third_result_cn',
      minWidth: 70,
      component: ThirdTagCutOff,
    },

    {
      label: '内容入库时间',
      prop: 'create_time',
      width: 92,
      component: DatetimeCell,
    },

    {
      label: '净网提交时间',
      prop: 'result_time',
      width: 92,
      component: DatetimeCell,
    },

    {
      label: '质检人/时间',
      prop: 'qc_time',
      width: 92,
      component: {
        props: { row: Object },
        render() {
          const time = this.row.qc_time ? this.row.qc_time.split(' ') : []
          return (
            <div>
              <span>{this.row.qc_staff_name}</span>
              <p>{time[0]}</p>
              <p>{time[1]}</p>
            </div>
          )
        },
      },
    },
  ]
}
