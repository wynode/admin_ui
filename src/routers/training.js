export default [
  {
    path: '/training/category',
    name: 'trainingCategory',
    component: () => import('@/views/training/category/CategoryList.vue'),
    meta: {
      title: '分类列表',
      breadcrumb: ['在线培训', '分类列表'],
    },
  }, // 在线培训分类管理

  {
    path: '/training/lessons',
    name: 'trainingLessons',
    component: () => import('@/views/training/lesson/LessonList.vue'),
    meta: {
      title: '课程列表',
      breadcrumb: ['在线培训', '课程列表'],
    },
  }, // 在线培训课程管理

  {
    path: '/training/lesson/:id',
    name: 'trainingLesson',
    meta: {
      title: '课程详情',
      breadcrumb: ['在线培训', '课程详情'],
    },
    component: () => import('@/views/training/lesson/LessonInfo.vue'),
  },
]
