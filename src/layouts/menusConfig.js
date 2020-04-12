export default (/* vm */) => {
  return [
    {
      title: '实时监控',
      icon: 'el-icon-view',
      router: { name: 'monitor' },
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
          title: '动态网关',
          router: { name: 'monitorUpstream' },
        },
        {
          title: '历史数据',
          router: { name: 'monitorHistory' },
        },
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
        {
          title: '日志设置',
          router: { name: 'logSetting' },
        },
      ],
    },
    {
      title: '安全防护',
      icon: 'el-icon-lock',
      children: [
        {
          title: 'ip黑白名单',
          router: { name: 'ipList' },
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
