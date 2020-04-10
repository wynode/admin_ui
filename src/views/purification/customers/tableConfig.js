export function clientListCols(vm) {
  return [
    {
      label: '客户编码',
      prop: 'code',
      width: 80,
    },

    {
      label: '登录账户',
      prop: 'yaemail',
      width: 120,
    },

    {
      label: '客户全称',
      prop: 'name',
      width: 120,
      component: {
        props: { row: Object },
        render() {
          return (
            <router-link
              class="Cm"
              target="_blank"
              to={{
                name: 'customerProfile',
                params: { id: this.row.id },
              }}>
              {this.row.name}
            </router-link>
          )
        },
      },
    },

    {
      label: '备注',
      prop: 'remark',
    },

    {
      label: '完成量',
      prop: 'finished_count',
      width: 80,
      sortable: 'custom',
    },

    {
      label: '操作人',
      width: 92,
      component: {
        props: { row: Object },
        render() {
          const time = this.row.operate_time.split(' ')
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
                onClick={() => vm.modifyCustomers(this.row)}>
                编辑
              </el-button>
              {/* <el-button
                type="text"
                style="color: red"
                onClick={() => vm.modifyCustomersPassword(this.row)}>
                修改密码
              </el-button> */}
            </span>
          )
        },
      },
    },
  ]
}
