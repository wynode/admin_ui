import { DatetimeCell } from '@/components/CellTools'

export const geniusCols = (vm) => {
  return [
    {
      label: '广播内容',
      prop: 'content',
    }, // 展示位置

    {
      label: '广播状态',
      prop: 'status_cn',
      width: 72,
      component: {
        props: { row: Object },
        render() {
          const colors = {
            normal: 'Cg',
            disabled: 'Cr',
          }
          return (
            <span class={colors[this.row.status]}>{this.row.status_cn}</span>
          )
        },
      },
    }, // 展示位置

    {
      label: '展示排序',
      prop: 'seq',
      width: 72,
    }, // 展示排序

    {
      label: '开始时间',
      prop: 'start_time',
      width: 92,
      component: DatetimeCell,
    }, // 开始时间

    {
      label: '结束时间',
      prop: 'end_time',
      width: 92,
      component: DatetimeCell,
    }, // 结束时间

    {
      label: '操作人',
      prop: 'operator_name',
      width: 92,
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
    }, // 操作人

    {
      label: '操作',
      width: 92,
      component: {
        props: { row: Object },
        render() {
          return (
            <span>
              <el-button
                type="text"
                onClick={() => vm.modifyBroadcast(this.row)}>
                编辑
              </el-button>

              <el-button
                type="text"
                class="Ml8"
                style="color:#f56c6c;"
                onClick={() => vm.delBroadcast(this.row)}>
                删除
              </el-button>
            </span>
          )
        },
      },
    }, // 操作
  ]
}
