export const tableCols = (vm) => {
  return [
    {
      label: '标题',
      prop: 'title',
    },
    {
      label: '内容',
      prop: 'content',
      component: {
        props: { row: Object },
        render() {
          const jsx = <p domPropsInnerHTML={this.row.content}></p>
          var div = document.createElement('div')
          div.innerHTML = this.row.content
          const cleanText = div.innerText
          const html =
            cleanText.substring(0, 50) + (cleanText.length > 50 ? ' ...' : '')
          return (
            <div>
              <el-popover
                placement="top-start"
                title="内容预览"
                width="500"
                trigger="hover">
                {jsx}
                <div slot="reference">
                  <p>{html}</p>
                </div>
              </el-popover>
            </div>
          )
        },
      },
    },
    {
      label: '内容链接',
      prop: 'content_link',
      component: {
        props: { row: Object },
        render() {
          const uri = `https://coconut-m.qixincha.com/help?id=${this.row.id}`
          return (
            <div>
              <span>{uri}</span>
            </div>
          )
        },
      },
    },
    {
      label: '类型',
      prop: 'wiki_type_display',
    }, // 展示排序
    {
      label: '上级',
      prop: 'parent_name',
    }, // 展示排序

    {
      label: '等级',
      prop: 'level',
    }, // 展示排序

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
              <el-button
                type="text"
                onClick={() => vm.modifyHelpCenter(this.row)}>
                编辑
              </el-button>

              <el-button
                type="text"
                class="Ml8"
                style="color:#f56c6c;"
                onClick={() => vm.delHelpCenter(this.row)}>
                删除
              </el-button>
            </span>
          )
        },
      },
    }, // 操作
  ]
}
