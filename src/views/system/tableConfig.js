import { FormatTime } from '@/components/CellTools.jsx'

export function phoneListCols(vm) {
  return [
    {
      label: '电话ID',
      prop: 'phoneId',
      width: 120,
    },
    {
      label: '电话',
      prop: 'phone',
    },

    {
      label: '操作',
      width: 150,
      component: {
        props: { row: Object },
        render() {
          return (
            <span>
              <el-button
                type="text"
                class="Ml8"
                size="small"
                style="color:#f56c6c;"
                onClick={() => vm.delPhone(this.row)}>
                删除
              </el-button>
            </span>
          )
        },
      },
    }, // 操作
  ]
}

export function notifyListCols() {
  return [
    {
      label: '通知ID',
      prop: 'notifyId',
      width: 120,
    },
    {
      label: '通知信息',
      prop: 'msg',
    },

    {
      label: '通知时间',
      prop: 'time',
      component: FormatTime,
    },
  ]
}
