import { DatetimeCell, PureContentCutOff } from '@/components/CellTools'

export const feedbackCols = (vm) => {
  return [
    {
      label: '姓名',
      prop: 'user_name',
      width: 100,
    },
    {
      label: '问题描述',
      prop: 'content',
      width: 160,
      component: PureContentCutOff,
    },

    {
      label: '设备型号',
      prop: 'device_info',
    },

    {
      label: '设备系统',
      prop: 'os',
      width: 100,
    },

    {
      label: '系统版本',
      prop: 'os_version',
      width: 100,
    },
    {
      label: '反馈时间',
      prop: 'create_time',
      component: DatetimeCell,
    },
    {
      label: '状态',
      component: {
        props: { row: Object },
        render() {
          return (
            <span>
              <el-button
                type="text"
                size="small"
                onClick={() => vm.modifyFeedback(this.row)}>
                {this.row.status_cn}
              </el-button>
            </span>
          )
        },
      },
    },
    {
      label: '备注',
      prop: 'remark',
    },
    {
      label: '操作人',
      prop: 'operator_name',
      width: 120,
      component: {
        props: { row: Object },
        render() {
          const time = this.row.operate_time
            ? this.row.operate_time.split(' ')
            : ['', '']
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
  ]
}
