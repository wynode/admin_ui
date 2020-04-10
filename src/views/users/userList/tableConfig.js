export function userListCols() {
  return [
    {
      label: '姓名',
      prop: 'name/id/base',
      width: 120,
      component: {
        props: { row: Object },
        render() {
          return (
            <div>
              <div>
                <router-link
                  to={{ name: 'userProfile', params: { id: this.row.id } }}
                  target="_blank"
                  class="Fwb Curp hover_Tdu"
                  style="color:#845bea;">
                  {this.row.name}
                </router-link>
              </div>
              <el-tag v-show={this.row.employee_id} type="success" size="mini">
                {this.row.employee_id}
              </el-tag>
              <el-tag
                v-show={this.row.base}
                type="warning"
                size="mini"
                class="Ml8">
                {this.row.base}
              </el-tag>
            </div>
          )
        },
      },
    },
    {
      label: '岗位名称',
      prop: 'position',
    },
    {
      label: '所在部门',
      prop: 'department_cn',
    },
    {
      label: '加入日期',
      prop: 'date_joined',
    },
    {
      label: '角色',
      prop: 'groups',
      formatter(col) {
        return Array.isArray(col.groups)
          ? col.groups.map((r) => r.name).join(',')
          : ''
      },
    },
    {
      label: '用户状态',
      prop: 'status_cn',
      component: {
        props: { row: Object },
        render() {
          return (
            <span class={this.row.status_cn === '冻结' ? 'Cr' : ''}>
              {this.row.status_cn}
            </span>
          )
        },
      },
    },
    {
      label: '领单等级',
      prop: 'assign_levels',
      component: {
        props: { row: Object },
        render() {
          const pTags = this.row.assign_levels.map((v) => {
            return <p>{v.name}</p>
          })
          return <div>{pTags}</div>
        },
      },
    },
    {
      label: '达人分',
      prop: 'genius_score',
      minWidth: 74,
    },
    {
      label: '净网积分',
      prop: '净网积分',
      component: {
        props: { row: Object },
        render() {
          return (
            <span>
              {Number(this.row.score_balance).toFixed(1)} /{' '}
              {Number(this.row.score_total).toFixed(1)}
            </span>
          )
        },
      },
    },
    {
      label: '已兑积分',
      prop: 'score_consume',
      minWidth: 74,
    },
    {
      label: '净网数',
      prop: 'purify_count',
      minWidth: 74,
    },
    {
      label: '通关数',
      prop: 'pass_num',
      minWidth: 74,
    },
    {
      label: '冲关星',
      prop: 'check_point_score',
      minWidth: 74,
    },
  ]
}
