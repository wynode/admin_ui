export function rowCols() {
  return [
    {
      label: '课程名称',
      prop: 'name',
    },
    {
      label: '课程分类',
      prop: 'category_name',
    },
    {
      label: '讲师',
      prop: 'lecturer_name',
    },
    {
      label: '播放/评分',
      prop: 'view_num',
      component: {
        props: { row: Object },
        render() {
          return (
            <div>
              <span>
                {this.row.view_num}/{this.row.avg_star || '暂无评分'}
              </span>
            </div>
          )
        },
      },
    },
  ]
}
