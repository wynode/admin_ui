import { join } from '@/utils/common'

export function purifyConfigCols(vm) {
  return [
    {
      label: '客户净网code',
      prop: 'customer_conf_code',
      width: 110,
    },
    {
      label: '净网类型名称',
      prop: 'purifyconfig_name',
      width: 130,
    },
    {
      label: '审核人数',
      prop: 'need_verify_count',
      width: 80,
    },
    {
      label: '时效要求',
      prop: 'urgency_cn',
      width: 80,
    },
    {
      label: '图片是否公开',
      prop: 'image_public_cn',
      width: 80,
    },
    {
      label: '结果推送 URL',
      prop: 'result_push_url',
      width: 80,
    },
    {
      label: '关键词分类',
      prop: 'kw_category',
      width: 80,
      formatter: (row) => join(row.kw_category, '、'),
    },
    {
      label: '状态',
      prop: 'status_cn',
      width: 80,
    },
    {
      label: '创建时间',
      prop: 'create_time',
      width: 160,
    },
    {
      label: '操作人/时间',
      width: 160,
      component: {
        props: { row: Object },
        render() {
          return (
            <div>
              <p>{this.row.operator_name}</p>
              <p>{this.row.operate_time}</p>
            </div>
          )
        },
      },
    },
    {
      label: '备注',
      prop: 'remark',
    },
    {
      label: '操作',
      width: 92,
      component: {
        props: { row: Object },
        render() {
          return (
            <div>
              <el-button
                type="text"
                onClick={() => vm.editPurifyConfig(this.row)}>
                编辑
              </el-button>
            </div>
          )
        },
      },
    },
  ]
}
