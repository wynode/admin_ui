export default [
  {
    path: '/playground/content',
    name: 'playContentList',
    component: () => import('@/views/playground/content/Content.vue'),
    meta: {
      title: '内容列表',
      breadcrumb: ['练习场管理', '内容列表'],
    },
  }, // 内容列表
  {
    path: '/playground/record',
    name: 'playRecordList',
    component: () => import('@/views/playground/record/Record.vue'),
    meta: {
      title: '练习记录',
      breadcrumb: ['练习场管理', '练习记录'],
    },
  }, // 练习记录
  {
    path: '/playground/detail',
    name: 'playDetailList',
    component: () => import('@/views/playground/detail/Detail.vue'),
    meta: {
      title: '练习明细',
      breadcrumb: ['练习场管理', '练习明细'],
    },
  }, // 练习明细
  {
    path: '/playground/ranking',
    name: 'playRankingList',
    component: () => import('@/views/playground/ranking/Ranking.vue'),
    meta: {
      title: '练习排名',
      breadcrumb: ['练习场管理', '练习排名'],
    },
  }, // 练习排名
]
