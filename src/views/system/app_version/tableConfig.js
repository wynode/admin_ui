import { dateFormat } from '@/utils/dateFormat'

const colorDict = { 启用: 'green', 停用: 'red' }

export function rowCols(vm) {
  return [
    {
      label: 'ID',
      prop: 'id',
    },
    {
      label: '版本标识',
      prop: 'version',
    },
    {
      label: '版本号',
      prop: 'version_code',
      minWidth: 70,
    },
    {
      label: '系统',
      prop: 'os',
      minWidth: 70,
    },
    {
      label: '状态',
      prop: 'status_cn',
      component: {
        props: { row: Object },
        render() {
          const color = colorDict[this.row.status_cn]
          return (
            <div>
              <el-button
                type="text"
                onClick={() => vm.handleChangeStatusAppVersion(this.row)}>
                <span style={`color: ${color}`}>{this.row.status_cn}</span>
              </el-button>
            </div>
          )
        },
      },
    },
    {
      label: '更新尾号',
      prop: 'groups',
      formatter(col) {
        return Array.isArray(col.graylist)
          ? col.graylist.map((r) => r).join(',')
          : ''
      },
    },
    {
      label: '更新uid',
      prop: 'grayuid',
      minWidth: 70,
    },
    {
      label: '强制更新',
      prop: 'force_cn',
      minWidth: 70,
    },
    {
      label: '安装包文件地址',
      minWidth: 80,
      prop: 'pkg_url',
      component: {
        props: { row: Object },
        render() {
          return (
            <a target="_blank" style="color: blue" href={this.row.pkg_url}>
              {this.row.pkg_url}
            </a>
          )
        },
      },
    },
    {
      label: 'ios plist文件地址',
      minWidth: 80,
      prop: 'plist_url',
      component: {
        props: { row: Object },
        render() {
          return this.row.os == 'ios' ? (
            <a target="_blank" style="color: blue" href={this.row.plist_url}>
              {'itms-services://?action=download-manifest&url=' +
                this.row.plist_url}
            </a>
          ) : (
            ''
          )
        },
      },
    },
    {
      label: '更新日志',
      prop: 'changelog',
    },
    {
      label: '创建时间',
      prop: 'create_time',
      width: 92,
      component: {
        props: { row: Object },
        render() {
          return <div>{dateFormat(this.row.create_time)}</div>
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
          const { update_time, operator_name } = this.row
          const time = update_time ? update_time.split(' ') : []
          return (
            <div>
              <p>{time[0]}</p>
              <p>{time[1]}</p>
              <p>{operator_name}</p>
            </div>
          )
        },
      },
    },
    {
      label: '操作',
      width: 80,
      component: {
        props: { row: Object },
        render() {
          return (
            <span>
              <el-button
                type="text"
                onClick={() => vm.handleEditAppVersion(this.row)}>
                编辑
              </el-button>
              <el-button
                type="text"
                style="color:#f56c6c;"
                onClick={() => vm.handleDeleteAppVersion(this.row)}>
                删除
              </el-button>
            </span>
          )
        },
      },
    },
  ]
}
