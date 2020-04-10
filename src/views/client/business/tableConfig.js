import { dateFormat } from '@/utils/dateFormat'
import { join } from '@/utils/common'

export function rowCols(vm) {
  return [
    {
      label: '业务code',
      prop: 'customer_conf_code',
      component: {
        props: { row: Object },
        render() {
          const { customer_conf_code, status, status_cn } = this.row
          return (
            <div>
              <p>{customer_conf_code}</p>
              <el-tag size="mini" type={status === 0 ? 'danger' : 'success'}>
                {status_cn}
              </el-tag>
            </div>
          )
        },
      },
    },
    {
      label: '业务名称',
      prop: 'name',
      component: {
        props: { row: Object },
        render() {
          const { name, app_type_cn } = this.row
          return (
            <div>
              <p>{name}</p>
              <el-tag size="mini" className="Ml4">
                {app_type_cn}
              </el-tag>
            </div>
          )
        },
      },
    },
    {
      label: '创建时间',
      prop: 'create_time',
    },
    {
      label: '净网类型名称',
      prop: 'purifyconfig_name',
    },
    {
      label: '所属客户',
      prop: 'customer_name',
    },
    {
      label: '上属客户',
      prop: 'parent_customer_name',
    },
    {
      label: '签约单价',
      prop: 'price',
      component: {
        props: { row: Object },
        render() {
          let price = parseFloat(Number(this.row.price).toFixed(2))
          return <p>{price}</p>
        },
      },
    },
    {
      label: '审核次数',
      prop: 'phone',
      component: {
        props: { row: Object },
        render() {
          const {
            need_verify_count,
            recheck_action_cn,
            recheck_action,
          } = this.row
          return (
            <div>
              <p>{need_verify_count}</p>
              <el-tag
                size="mini"
                type={
                  recheck_action === ''
                    ? ''
                    : recheck_action === 'recheck_illegal'
                    ? 'danger'
                    : 'success'
                }>
                {recheck_action_cn}
              </el-tag>
            </div>
          )
        },
      },
    },
    {
      label: '优先级',
      prop: 'urgency_cn',
    },
    {
      label: '图片公开',
      prop: 'image_public_cn',
    },
    {
      label: '结果推送url',
      prop: 'result_push_url',
    },
    {
      label: '关键词分类',
      prop: 'kw_category',
      formatter: (row) => join(row.kw_category, '、'),
    },
    {
      label: '业务备注',
      prop: 'remark',
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
                onClick={() => vm.handleEditBusiness(this.row)}>
                编辑
              </el-button>
            </span>
          )
        },
      },
    },
  ]
}
