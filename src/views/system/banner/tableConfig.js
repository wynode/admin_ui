import { DatetimeCell } from '@/components/CellTools'

export const geniusCols = (vm) => {
  return [
    {
      label: '轮播状态',
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
    }, // 轮播状态

    {
      label: '展示位置',
      prop: 'pos_cn',
    }, // 展示位置

    {
      label: '轮播图片',
      prop: 'pic_url',
      component: {
        props: { row: Object },
        render() {
          return (
            <el-image
              v-show={this.row.pic_url}
              class="Db Wst"
              src={this.row.pic_url}
              preview-src-list={[this.row.pic_url]}></el-image>
          )
        },
      },
    }, // 轮播图片

    {
      label: '跳转地址',
      prop: 'click_url_cn',
      component: {
        props: { row: Object },
        render() {
          let { click_url_cn } = this.row
          if (click_url_cn && click_url_cn.includes('"web"')) {
            const val = JSON.parse(click_url_cn)
            click_url_cn = val.url
          }

          return (
            <a class="Cm Curp hover_Tdu" href={click_url_cn} target="_blank">
              {click_url_cn}
            </a>
          )
        },
      },
    }, // 跳转地址

    {
      label: '展示排序',
      prop: 'seq',
    }, // 展示排序

    {
      label: '开始时间',
      prop: 'start_time',
      width: 84,
      component: DatetimeCell,
    }, // 开始时间

    {
      label: '结束时间',
      prop: 'end_time',
      width: 84,
      component: DatetimeCell,
    }, // 结束时间

    {
      label: '操作人',
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
    }, // 操作人

    {
      label: '操作',
      width: 92,
      component: {
        props: { row: Object },
        render() {
          return (
            <span>
              <el-button type="text" onClick={() => vm.modifyBanner(this.row)}>
                编辑
              </el-button>

              <el-button
                type="text"
                class="Ml8"
                style="color:#f56c6c;"
                onClick={() => vm.delBanner(this.row)}>
                删除
              </el-button>
            </span>
          )
        },
      },
    }, // 操作
  ]
}
