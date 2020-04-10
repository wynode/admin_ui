import { join } from '@/utils/common'

export function pureCols(vm) {
  let cols = [
    {
      label: 'ID',
      prop: 'id',
      width: 64,
    },
    {
      label: '净网类型名称',
      prop: 'name',
      width: 100,
      component: {
        props: { row: Object },
        render() {
          const { name, status, status_cn, platform_cn } = this.row
          return (
            <div>
              <p>{name}</p>
              <el-tag size="mini" type={status === 0 ? 'danger' : 'success'}>
                {status_cn}
              </el-tag>
              <el-tag size="mini" class="Ml4">
                {platform_cn}
              </el-tag>
            </div>
          )
        },
      },
    },
    {
      label: '客户名称',
      prop: 'customer_names',
      width: 100,
      formatter: (row) => join(row.customer_names, '、'),
    },
    {
      label: '关联分类',
      prop: 'purify_category_cn',
      width: 90,
      formatter: (row) => join(row.purify_category_cn, '、'),
    },
    {
      label: '一级标签',
      prop: 'normal_label/illegal_label',
      minWidth: 70,
      component: {
        props: { row: Object },
        render() {
          return (
            <span>
              <el-tag class="Mx4" type="primary" size="mini">
                {this.row.normal_label}
              </el-tag>
              <el-tag class="Mx4" type="primary" size="mini">
                {this.row.illegal_label}
              </el-tag>
            </span>
          )
        },
      },
    },
    {
      label: '二级标签',
      prop: 'second_tags',
      minWidth: 120,
      component: {
        props: { row: Object },
        render() {
          return (
            <div style="max-height: 700px; overflow: auto">
              {Array.isArray(this.row.second_tags)
                ? this.row.second_tags.map((tag) => (
                    <el-tag class="Mx4" type="danger" size="mini">
                      {tag.label}
                    </el-tag>
                  ))
                : ''}
            </div>
          )
        },
      },
    },
    {
      label: '三级标签',
      prop: 'third_tags',
      minWidth: 120,
      component: {
        props: { row: Object },
        render() {
          const third_tags = this.row.second_tags.reduce((acc, cur) => {
            if (cur.third_tags) {
              cur.third_tags.forEach((third) => {
                acc.push([`${cur.label}: ${third.label}`])
              })
            }
            return acc
          }, [])
          return (
            <el-popover
              placement="right"
              width="400"
              trigger="hover"
              disabled={third_tags.length < 5}>
              <div style="max-height: 700px; overflow: auto">
                {third_tags.map((tag) => (
                  <el-tag class="Mx4" type="danger" size="mini">
                    {tag}
                  </el-tag>
                ))}
              </div>
              <span slot="reference">
                {third_tags
                  .map((tag) => (
                    <el-tag class="Mx4" type="danger" size="mini">
                      {tag}
                    </el-tag>
                  ))
                  .slice(0, 5)}
              </span>
            </el-popover>
          )
        },
      },
    },
    {
      label: '净网积分/漏审/错审',
      prop: 'score',
      component: {
        props: { row: Object },
        render() {
          const { score, omission_score, error_score } = this.row
          return <p>{`${score} / ${omission_score} / ${error_score}`}</p>
        },
      },
    },
    {
      label: '订单/网页/App超时(分)',
      prop: 'order_expire_seconds',
      component: {
        props: { row: Object },
        render() {
          const {
            order_expire_seconds,
            web_expire_seconds,
            app_expire_seconds,
          } = this.row
          return (
            <p>{`${order_expire_seconds / 60} / ${web_expire_seconds /
              60} / ${app_expire_seconds / 60}`}</p>
          )
        },
      },
    },
    {
      label: '备注',
      prop: 'remark',
      width: 100,
    },
    {
      label: '操作人',
      width: 92,
      prop: 'operator_name',
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
    },
  ]
  if (!vm.customer) {
    cols.push({
      label: '操作',
      width: 92,
      component: {
        props: { row: Object },
        render() {
          return (
            <el-button
              type="text"
              onClick={() => vm.modifyPureConfig(this.row)}>
              编辑
            </el-button>
          )
        },
      },
    })
  }
  return cols
}
