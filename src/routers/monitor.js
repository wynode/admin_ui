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
    path: '/monitor/upstream',
    name: 'monitorUpstream',
    meta: {
      title: '当前访问IP',
      breadcrumb: ['服务监控', '当前访问IP'],
    },
    component: () => import('@/views/monitor/upstream/UpstreamList.vue'),
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
    path: '/monitor',
    name: 'monitor',
    meta: {
      title: '实时监控',
    },
    component: () => import('@/views/home/Home.vue'),
  },
]
