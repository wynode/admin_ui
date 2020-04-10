import {
  DatetimeCell,
  PureContentCutOff,
  ThirdTagCutOff,
} from '@/components/CellTools'

export function playDetailCols(vm) {
  return [
    {
      label: '内容ID',
      prop: 'content_id',
      width: 80,
      component: {
        props: { row: Object },
        render() {
          return (
            <router-link
              class="Cm"
              target="_blank"
              to={{
                name: 'archiveDetail',
                query: {
                  order__content_id__in: this.row.content_id,
                  create_month: vm.$refs.effectForm.form.create_month,
                },
              }}>
              {this.row.content_id}
              {this.row.result_sync === 'waiting' ? '.' : ''}
            </router-link>
          )
        },
      },
    },

    {
      label: '客户净网code',
      prop: 'customer_purifyconfig_customer_conf_code',
      width: 100,
    },

    {
      label: '净网类型名称',
      prop: 'customer_purifyconfig_purifyconfig_name',
      width: 96,
    },

    {
      label: '净网内容',
      prop: 'content',
      component: PureContentCutOff,
    },

    {
      label: '原贴',
      prop: 'parent_topic',
      component: PureContentCutOff,
    },
    {
      label: '内容类型',
      prop: 'content_type_cn',
      width: 70,
      component: {
        props: { row: Object },
        render() {
          return (
            <div>
              <el-tag type="primary" size="mini">
                {this.row.content_type_cn}
              </el-tag>
              <el-tag type="primary" size="mini">
                {this.row.content_origin_cn}
              </el-tag>
            </div>
          )
        },
      },
    },
    {
      label: '净网人数',
      prop: 'need_verify_count',
      width: 70,
    },

    {
      label: '净网状态',
      prop: 'first_result_cn',
      width: 70,
      component: {
        props: { row: Object },
        render() {
          return (
            <span
              class={{
                Cr: this.row.first_result === 'illegal',
                Cg: this.row.first_result === 'normal',
              }}>
              {this.row.first_result_cn}
            </span>
          )
        },
      },
    },

    {
      label: '二级标签',
      prop: 'second_result_cn',
      width: 70,
      component: {
        props: { row: Object },
        render() {
          return (
            <el-tag
              v-show={this.row.second_result_cn}
              type="danger"
              size="mini">
              {this.row.second_result_cn}
            </el-tag>
          )
        },
      },
    },

    {
      label: '三级标签',
      prop: 'third_result_cn',
      minWidth: 80,
      component: ThirdTagCutOff,
    },

    {
      label: '质检状态',
      prop: 'qc_result_cn',
      width: 70,

      component: {
        props: { row: Object },
        render() {
          return (
            <div>
              <span>{this.row.qc_result_cn}</span>
            </div>
          )
        },
      },
    },

    {
      label: '内容入库时间',
      prop: 'create_time',
      width: 96,
      component: DatetimeCell,
    },

    {
      label: '结果提交时间',
      prop: 'final_result_time',
      width: 96,
      component: DatetimeCell,
    },

    {
      label: '质检人/时间',
      prop: 'qc_time',
      width: 96,
      component: {
        props: { row: Object },
        render() {
          const time = this.row.qc_time ? this.row.qc_time.split(' ') : []
          return (
            <div>
              <span>{this.row.qc_staff_name}</span>
              <p>{time[0]}</p>
              <p>{time[1]}</p>
            </div>
          )
        },
      },
    },

    {
      label: '耗时(秒)',
      prop: 'duration',
      width: 96,
    },
  ]
}
