import { dateFormat } from '@/utils/dateFormat'
import { TextCutOff } from '@/components/CellTools'

export function rowCols(vm) {
  return [
    {
      label: '客户编号',
      prop: 'code',
    },
    {
      label: '客户名称',
      prop: 'name',
      component: {
        props: { row: Object },
        render() {
          return (
            <div>
              <router-link
                to={{ name: 'customerDetails', params: { id: this.row.id } }}
                target="_blank"
                className="Fwb Curp hover_Tdu"
                style="color:#845bea;">
                {this.row.name}
              </router-link>
            </div>
          )
        },
      },
    },
    {
      label: '审核量',
      prop: 'finished_count',
    },
    {
      label: '创建时间',
      prop: 'create_time',
    },
    {
      label: '客户等级',
      prop: 'client_type_cn',
    },
    {
      label: '上级客户',
      prop: 'parent_name',
    },
    {
      label: '对接人姓名',
      prop: 'client_side_name',
    },
    {
      label: '主账号',
      prop: 'yaemail',
    },
    {
      label: '电话',
      prop: 'client_side_phone',
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
                onClick={() => vm.handleEditCustomer(this.row)}>
                编辑
              </el-button>
            </span>
          )
        },
      },
    },
  ]
}
