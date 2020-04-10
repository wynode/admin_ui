import { dateFormat } from '@/utils/dateFormat'
import { TextCutOff } from '@/components/CellTools'

export function rowCols(vm) {
  return [
    {
      label: '事件日期',
      prop: 'date',
    },
    {
      label: '标题',
      prop: 'name',
    },
    {
      label: '帮助页链接',
      prop: 'help_page',
      component: {
        props: { row: Object },
        render() {
          return (
            <div>
              {this.row.help_page !== null ? (
                <p class="Cm">
                  {'https://coconut-m.qixincha.com/help?id=' +
                    this.row.help_page}
                </p>
              ) : (
                ''
              )}
            </div>
          )
        },
      },
    },
    {
      label: '备注',
      prop: 'remark',
      component: TextCutOff,
    },
    {
      label: '操作人/更新时间',
      prop: 'update_time',
      component: {
        props: { row: Object },
        render() {
          return (
            <div>
              <p>{this.row.operator_name}</p>
              <p>{dateFormat(this.row.operate_time)}</p>
            </div>
          )
        },
      },
    },
    {
      label: '操作',
      width: 100,
      component: {
        props: { row: Object },
        render() {
          return (
            <span>
              <el-button
                type="text"
                onClick={() => vm.handleEditCalendar(this.row)}>
                编辑
              </el-button>
              <el-button
                type="text"
                style="color:#f56c6c;"
                onClick={() => vm.handleDeleteCalendar(this.row)}>
                删除
              </el-button>
            </span>
          )
        },
      },
    },
  ]
}
