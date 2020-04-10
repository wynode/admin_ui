import { DatetimeCell, PureContentCutOff } from '@/components/CellTools'

export function playDetailCols(vm) {
  return [
    {
      label: '内容ID',
      prop: 'order_info.content_id',
      width: 120,
      component: {
        props: { row: Object },
        render() {
          const { content_id, content_type_cn } = this.row.order_info
          return (
            <div>
              <router-link
                class="Cm"
                target="_blank"
                to={{
                  name: 'pureDetail',
                  query: {
                    order__content_id__in: content_id,
                  },
                }}>
                {content_id}
              </router-link>
              <div>
                <el-tag size="mini" type="warning">
                  {content_type_cn}
                </el-tag>
              </div>
            </div>
          )
        },
      },
    },

    {
      label: '客户名称',
      prop: 'customer_name',
      width: 90,
    },

    {
      label: '净网类型名称',
      prop: 'order_info.purifyconfig_name',
      width: 96,
    },

    {
      label: '净网内容',
      prop: 'order_info.content',
      component: PureContentCutOff,
    },

    {
      label: '原贴内容',
      prop: 'order_info.parent_topic',
      component: PureContentCutOff,
    },
    {
      label: '净网状态',
      minWidth: 120,
      prop: 'order_info.first_result_cn',
      component: {
        props: { row: Object },
        render() {
          const {
            first_result_cn,
            second_result_cn,
            third_result_cn,
          } = this.row.order_info
          let showSecondTag = second_result_cn ? (
            <el-tag type="danger" size="mini">
              {second_result_cn}
            </el-tag>
          ) : (
            ''
          )
          let showThirdTag = third_result_cn ? (
            <el-tag type="danger" size="mini">
              {third_result_cn}
            </el-tag>
          ) : (
            ''
          )
          return (
            <div>
              <div>{first_result_cn}</div>
              {showSecondTag}
              {showThirdTag}
            </div>
          )
        },
      },
    },

    {
      label: '期望结果',
      prop: 'first_result_cn',
      minWidth: 120,
      component: {
        props: { row: Object },
        render() {
          const {
            first_result_cn,
            second_result_cn,
            third_result_cn,
          } = this.row
          let showSecondTag = second_result_cn ? (
            <el-tag type="danger" size="mini">
              {second_result_cn}
            </el-tag>
          ) : (
            ''
          )
          let showThirdTag = third_result_cn ? (
            <el-tag type="danger" size="mini">
              {third_result_cn}
            </el-tag>
          ) : (
            ''
          )
          return (
            <div>
              <div>{first_result_cn}</div>
              {showSecondTag}
              {showThirdTag}
            </div>
          )
        },
      },
    },

    {
      label: '反馈时间',
      prop: 'create_time',
      width: 92,
      component: DatetimeCell,
    },

    {
      label: '反馈说明',
      prop: 'feedback_remark',
      minWidth: 60,
    },

    {
      label: '处理人/时间',
      prop: 'operate_time',
      width: 92,
      component: {
        props: { row: Object },
        render() {
          const time = this.row.operate_time
            ? this.row.operate_time.split(' ')
            : []
          return (
            <div>
              <span>{this.row.operator_name}</span>
              <p>{time[0]}</p>
              <p>{time[1]}</p>
            </div>
          )
        },
      },
    },

    {
      label: '处理说明',
      prop: 'remark',
      minwWidth: 80,
    },

    {
      label: '异议状态',
      width: 92,
      porp: 'op_status',
      component: {
        props: { row: Object },
        render() {
          const { op_status, op_status_cn } = this.row
          let showTag =
            op_status === 'to_check' ? (
              <el-button
                type="text"
                onClick={() => vm.handleEditOpStatus(this.row)}>
                {op_status_cn}
              </el-button>
            ) : (
              op_status_cn
            )
          return <div>{showTag}</div>
        },
      },
    },
  ]
}
