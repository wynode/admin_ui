export default [
  {
    path: '/monitor/url',
    name: 'monitorUrl',
    meta: {
      title: '在线监控',
      breadcrumb: ['服务监控', '在线监控'],
    },
    component: () => import('@/views/monitor/url/UrlList.vue'),
  },
  {
    path: '/monitor/current-ip',
    name: 'monitorCurrentIP',
    meta: {
      title: '当前访问IP',
      breadcrumb: ['服务监控', '当前访问IP'],
    },
    component: () => import('@/views/monitor/current_ip/CurrentIPList.vue'),
  },
  {
    path: '/monitor/history',
    name: 'monitorHistory',
    meta: {
      title: '历史数据',
      breadcrumb: ['服务监控', '历史数据'],
    },
    component: () => import('@/views/monitor/history/HistoryData.vue'),
  },
  {
    path: '/monitor/disk-split',
    name: 'monitorDiskSplit',
    meta: {
      title: '磁盘分区',
      breadcrumb: ['服务监控', '磁盘分区'],
    },
    component: () => import('@/views/monitor/disk/DiskSplit.vue'),
  },
  {
    path: '/monitor/disk-statis',
    name: 'monitorDiskStatis',
    meta: {
      title: '磁盘I/O统计',
      breadcrumb: ['服务监控', '磁盘I/O统计'],
    },
    component: () => import('@/views/monitor/disk/DiskStatis.vue'),
  },
  {
    path: '/monitor/memory',
    name: 'monitorMemory',
    meta: {
      title: '内存信息',
      breadcrumb: ['服务监控', '内存信息'],
    },
    component: () => import('@/views/monitor/disk/Memory.vue'),
  },

  {
    path: '/monitor',
    name: 'monitor',
    meta: {
      title: '实时监控',
    },
    component: () => import('@/views/home/Home.vue'),
  },
]
