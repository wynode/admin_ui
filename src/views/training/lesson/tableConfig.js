import { dateFormat } from '@/utils/dateFormat'
import { TextCutOff } from '@/components/CellTools'

export function rowCols(vm) {
  return [
    {
      label: '课程名称',
      prop: 'name',
      component: {
        props: { row: Object },
        render() {
          return (
            <div>
              <router-link
                to={{ name: 'trainingLesson', params: { id: this.row.id } }}
                target="_self"
                className="Fwb Curp hover_Tdu"
                style="color:#845bea;">
                {this.row.name}
              </router-link>
              <p>
                <el-link
                  style="font-size: 8pt;"
                  onClick={() => vm.playVideo(this.row.name, this.row.url)}
                  type="info">
                  观看视频
                </el-link>
              </p>
            </div>
          )
        },
      },
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
      label: '课程简介',
      prop: 'intro',
      component: TextCutOff,
    },
    {
      label: '课程讲解',
      prop: 'explain',
      component: TextCutOff,
    },
    {
      label: '关联课程',
      prop: 'related_lessons',
      component: {
        props: { row: Object },
        render() {
          let relLessons
          if (this.row.related_lessons.length <= 3) {
            relLessons = this.row.related_lessons
          } else {
            relLessons = this.row.related_lessons.slice(0, 3)
          }
          return (
            <div>
              {relLessons.map((item) => {
                return <p>{item.name}</p>
              })}
              {this.row.related_lessons.length > 3 ? <p>...</p> : ''}
            </div>
          )
        },
      },
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
    {
      label: '更新时间/操作人',
      prop: 'update_time',
      width: 92,
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
                onClick={() => vm.handleEditLesson(this.row)}>
                编辑
              </el-button>
              <el-button
                type="text"
                style="color:#f56c6c;"
                onClick={() => vm.handleDeleteLesson(this.row)}>
                删除
              </el-button>
            </span>
          )
        },
      },
    },
  ]
}
