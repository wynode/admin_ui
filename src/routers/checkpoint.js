export default [
  {
    path: '/user_exam',
    name: 'userExam',
    component: () => import('@/views/checkpoint/user_exam/UserExam.vue'),
    meta: {
      title: '冲关明细',
      breadcrumb: ['关卡管理', '冲关明细'],
    },
  }, // 冲关明细列表

  {
    path: '/user_exam/ranking',
    name: 'userExamRanking',
    component: () => import('@/views/checkpoint/user_exam/UserExamRank.vue'),
    meta: {
      title: '冲关排名',
      breadcrumb: ['关卡管理', '冲关排名'],
    },
  }, // 冲关排名

  {
    path: '/user_exam_question',
    name: 'userExamQuestion',
    component: () =>
      import('@/views/checkpoint/user_exam_question/UserExamQuestion.vue'),
    meta: {
      title: '答题明细',
      breadcrumb: ['关卡管理', '答题明细'],
    },
  }, // 答题明细列表

  {
    path: '/question_list',
    name: 'questionList',
    component: () => import('@/views/checkpoint/exam/QuestionList.vue'),
    meta: {
      title: '题目列表',
      breadcrumb: ['关卡管理', '题目列表'],
    },
  }, // 题目列表

  {
    path: '/checkpoint',
    name: 'checkPointList',
    component: () => import('@/views/checkpoint/check_point/CheckPoint.vue'),
    meta: {
      title: '关卡列表',
      breadcrumb: ['关卡管理', '关卡列表'],
    },
  }, // 关卡列表

  {
    path: '/checkpoint/new',
    name: 'checkPointNew',
    component: () =>
      import('@/views/checkpoint/check_point/CheckPointProfile.vue'),
    meta: {
      title: '新增关卡',
      breadcrumb: ['关卡管理', '新增关卡'],
    },
  }, // 新增关卡

  {
    path: '/checkpoint/update/:id',
    name: 'checkPointUpdate',
    component: () =>
      import('@/views/checkpoint/check_point/CheckPointProfile.vue'),
    meta: {
      title: '修改关卡',
      breadcrumb: ['关卡管理', '修改关卡'],
    },
  }, // 修改关卡

  {
    path: '/checkpoint/sort/update',
    name: 'checkPointSort',
    component: () =>
      import('@/views/checkpoint/check_point/CheckPointSorted.vue'),
    meta: {
      title: '关卡排序',
      breadcrumb: ['关卡管理', '关卡排序'],
    },
  }, // 关卡排序
]
