export const geniusCols = (vm) => {
  return [
    {
      label: '段位名称',
      prop: 'title',
    }, // 段位名称
    {
      label: '段位图片',
      prop: 'pic_url',
      width: 100,
      component: {
        props: { row: Object },
        render() {
          return (
            <el-image
              v-show={this.row.pic_url}
              src={this.row.pic_url}
              preview-src-list={[this.row.pic_url]}></el-image>
          )
        },
      },
    }, // 轮播图片

    {
      label: '段位等级',
      prop: 'level',
    }, // 段位等级

    {
      label: '达人分值',
      prop: 'threshold',
    }, // 达人分值

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
              <el-button type="text" onClick={() => vm.modifyGenius(this.row)}>
                编辑
              </el-button>

              <el-button
                type="text"
                class="Ml8"
                style="color:#f56c6c;"
                onClick={() => vm.delGenius(this.row)}>
                删除
              </el-button>
            </span>
          )
        },
      },
    }, // 操作
  ]
}
