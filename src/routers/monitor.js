export default [
  {
    path: '/monitor/url',
    name: 'monitorUrl',
    component: () => import('@/views/monitor/url/UrlList.vue'),
  },
  {
    path: '/monitor/upstream',
    name: 'monitorUpstream',
    component: () => import('@/views/monitor/upstream/UpstreamList.vue'),
  },
  {
    path: '/monitor/history',
    name: 'monitorHistory',
    component: () => import('@/views/monitor/history/HistoryData.vue'),
  },
  {
    path: '/monitor',
    name: 'monitor',
    component: () => import('@/views/home/Home.vue'),
  },
]
