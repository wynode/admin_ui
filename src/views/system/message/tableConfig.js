import { dateFormat } from '@/utils/dateFormat'

export function questionCols() {
  return [
    {
      label: '通知类型',
      prop: 'msg_type_cn',
    },
    {
      label: '发送人',
      prop: 'sender',
    },
    {
      label: '接收人',
      prop: 'receiver_name',
    },
    {
      label: '发送时间',
      prop: 'create_time',
      component: {
        props: { row: Object },
        render() {
          return (
            <div>
              {dateFormat(this.row.create_time)
                .split(' ')
                .map((time) => (
                  <div>{time}</div>
                ))}
            </div>
          )
        },
      },
    },
    {
      label: '发送内容',
      prop: 'content',
      width: 300,
      component: {
        props: { row: Object },
        render() {
          if (this.row.content.length > 50) {
            return (
              <div>
                <el-popover
                  placement="top-start"
                  title="内容预览"
                  width="500"
                  trigger="hover">
                  {this.row.content}
                  <div slot="reference">
                    {' '}
                    {this.row.content.substring(0, 50) +
                    this.row.content.substring
                      ? ' ...'
                      : ''}{' '}
                  </div>
                </el-popover>
              </div>
            )
          } else {
            return <div>{this.row.content}</div>
          }
        },
      },
    },
    {
      label: '已读状态',
      prop: 'read_status',
      component: {
        props: { row: Object },
        render() {
          return (
            <div>
              <span>{this.row.read_status === 0 ? '未读' : '已读'}</span>
            </div>
          )
        },
      },
    },
  ]
}
