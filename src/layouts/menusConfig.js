export default (/* vm */) => {
  return [
    {
      title: '实时监控',
      icon: 'el-icon-view',
      router: { name: 'monitor' },
    },
    {
      title: '服务器状态',
      icon: 'el-icon-cpu',
      router: { name: 'serverStatus' },
    },
    {
      title: '服务监控',
      icon: 'el-icon-monitor',
      children: [
        {
          title: '在线监控',
          router: { name: 'monitorUrl' },
        },
        {
          title: '当前访问IP',
          router: { name: 'monitorCurrentIP' },
        },
        {
          title: '历史数据',
          router: { name: 'monitorHistory' },
        },
        {
          title: 'IP历史访问数据',
          router: { name: 'monitorIpHistory' },
        },
        // {
        //   title: '磁盘分区',
        //   router: { name: 'monitorDiskSplit' },
        // },
        // {
        //   title: '磁盘I/O统计',
        //   router: { name: 'monitorDiskStatis' },
        // },
        // {
        //   title: '内存信息',
        //   router: { name: 'monitorMemory' },
        // },
      ],
    },
    {
      title: '日志管理',
      icon: 'el-icon-document-copy',
      children: [
        {
          title: '请求日志',
          router: { name: 'logAccess' },
        },
        {
          title: '攻击日志',
          router: { name: 'logAttack' },
        },
        // {
        //   title: '日志设置',
        //   router: { name: 'logSetting' },
        // },
      ],
    },
    {
      title: '安全防护',
      icon: 'el-icon-lock',
      children: [
        {
          title: 'sql注入白名单路径',
          router: { name: 'sql' },
        },
        {
          title: 'IP黑白名单',
          router: { name: 'ipList' },
        },
        {
          title: 'upstream',
          router: { name: 'monitorUpstream' },
        },
        {
          title: 'IP地区禁用列表',
          router: { name: 'ipForbidden' },
        },
        {
          title: 'IP国家禁用列表',
          router: { name: 'countryIpForbidden' },
        },
        {
          title: 'UA禁用列表',
          router: { name: 'UAFilter' },
        },
        {
          title: '基础设置',
          router: { name: 'baseSetting' },
        },
        {
          title: '参数过滤',
          router: { name: 'paramFilter' },
        },
      ],
    },
    {
      title: '系统管理',
      icon: 'el-icon-set-up',
      children: [
        {
          title: '账户设置',
          router: { name: 'userList' },
        },
        {
          title: '短信预警',
          // icon: 'el-icon-setting',
          children: [
            {
              title: '通知列表',
              router: { name: 'notifyList' },
            },
            {
              title: '通知号码列表',
              router: { name: 'phoneList' },
            },
          ],
        },
      ],
    },
  ]
}
