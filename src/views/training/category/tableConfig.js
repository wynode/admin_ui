import { dateFormat } from '@/utils/dateFormat'

export function rowCols(vm) {
  return [
    {
      label: 'ID',
      width: 90,
      prop: 'id',
    },
    {
      label: '课程分类名称',
      prop: 'name',
    },
    {
      label: '排序',
      prop: 'order',
    },
    {
      label: '更新时间/操作人',
      prop: 'operate_time',
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
      width: 150,
      component: {
        props: { row: Object },
        render() {
          return (
            <span>
              <el-button
                type="text"
                onClick={() => vm.handleEditCategory(this.row)}>
                编辑
              </el-button>
              <el-button
                type="text"
                style="color:#f56c6c;"
                onClick={() => vm.handleDeleteCategory(this.row)}>
                删除
              </el-button>
            </span>
          )
        },
      },
    },
  ]
}
