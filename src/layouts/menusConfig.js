export default (/* vm */) => {
  return [
    // 网页审核
    {
      title: '网页审核',
      svgIcon: 'checkpoint',
      children: [
        {
          title: '图文审核',
          router: { name: 'auditCenter' },
          perms: ['webaudit'],
        },
        {
          title: '图像审核',
          router: { name: 'mediaAuditCenter' },
          perms: ['webaudit'],
        },
        {
          title: '图文质检',
          router: { name: 'qcCenter' },
          perms: ['check_qc'],
        },
        {
          title: '图像质检',
          router: { name: 'mediaQCCenter' },
          perms: ['check_qc'],
        },
      ],
    },
    // 关卡管理
    {
      title: '关卡管理',
      svgIcon: 'checkpoint',
      perms: [
        'check_checkpoint_list',
        'check_examquestion_list',
        'check_user_exam_admin_list',
        'check_user_exam_question_admin_list',
        'check_user_ranking_admin_list',
      ],
      children: [
        {
          title: '关卡列表',
          router: { name: 'checkPointList' },
          perms: ['check_checkpoint_list'],
        },
        {
          title: '题目列表',
          router: { name: 'questionList' },
          perms: ['check_examquestion_list'],
        },
        {
          title: '冲关明细',
          router: { name: 'userExam' },
          perms: ['check_user_exam_admin_list'],
        },
        {
          title: '答题明细',
          router: { name: 'userExamQuestion' },
          perms: ['check_user_exam_question_admin_list'],
        },
        {
          title: '冲关排名',
          router: { name: 'userExamRanking' },
          perms: ['check_user_ranking_admin_list'],
        },
      ],
    },
    // 在线培训
    {
      title: '在线培训',
      icon: 'el-icon-video-camera',
      perms: ['check_training'],
      children: [
        {
          title: '分类列表',
          router: { name: 'trainingCategory' },
        },
        {
          title: '课程列表',
          router: { name: 'trainingLessons' },
        },
      ],
    },
    // 客户管理
    {
      title: '客户管理',
      icon: 'el-icon-s-custom',
      perms: ['check_customer'],
      children: [
        {
          title: '客户列表',
          router: { name: 'customerList' },
        },
        {
          title: '业务列表',
          router: { name: 'businessList' },
        },
      ],
    },
    // 练习场管理
    {
      title: '练习场管理',
      svgIcon: 'playground',
      perms: [
        'check_practice_order',
        'check_user_practice',
        'check_user_practice_answer',
        'check_practicesummit',
      ],
      children: [
        {
          title: '内容列表',
          router: { name: 'playContentList' },
          perms: ['check_practice_order'],
        },
        {
          title: '练习记录',
          router: { name: 'playRecordList' },
          perms: ['check_user_practice'],
        },
        {
          title: '练习明细',
          router: { name: 'playDetailList' },
          perms: ['check_user_practice_answer'],
        },
        {
          title: '练习排名',
          router: { name: 'playRankingList' },
          perms: ['check_practicesummit'],
        },
      ],
    },

    // 净网管理
    {
      title: '净网管理',
      icon: 'el-icon-umbrella',
      perms: [
        'check_purification',
        //'check_customer',
        'check_usersuborderanswer',
        'check_auditorder',
        'check_purifysummit',
        'check_keywords',
      ],
      children: [
        {
          title: '净网配置',
          router: { name: 'pureConfig' },
          perms: ['check_purification'],
        },
        // {
        //   title: '客户列表',
        //   router: { name: 'customersList' },
        //   perms: ['check_customer'],
        // },
        {
          title: '净网明细',
          router: { name: 'pureDetail' },
          perms: ['check_usersuborderanswer'],
        },
        {
          title: '内容明细',
          router: { name: 'pureContentDetail' },
          perms: ['check_auditorder'],
        },
        {
          title: '净网排名',
          router: { name: 'prueRanking' },
          perms: ['check_purifysummit'],
        },
        {
          title: '关键词管理',
          router: { name: 'keywords' },
          perms: ['check_keywords'],
        },
        {
          title: '异议反馈',
          router: { name: 'feedback' },
          perms: ['check_auditfeedback'],
        },
      ],
    },

    // 归档管理
    {
      title: '归档管理',
      icon: 'el-icon-folder-opened',
      perms: ['check_archiveusersuborderanswer', 'check_archiveauditorder'],
      children: [
        {
          title: '净网明细',
          router: { name: 'archiveDetail' },
          perms: ['check_usersuborderanswer'],
        },
        {
          title: '内容明细',
          router: { name: 'archiveContentDetail' },
          perms: ['check_auditorder'],
        },
      ],
    },

    // 用户管理
    {
      title: '用户管理',
      icon: 'el-icon-user',
      perms: [
        'check_userprofile_admin_list',
        'check_genius_setting',
        'check_user_group',
        'check_score_log',
      ],
      children: [
        {
          title: '用户列表',
          router: { name: 'userList' },
          perms: ['check_userprofile_admin_list'],
        },
        {
          title: '段位配置',
          router: { name: 'geniusList' },
          perms: ['check_genius_setting'],
        },
        {
          title: '角色管理',
          router: { name: 'role' },
          perms: ['check_user_group'],
        },
        {
          title: '积分明细',
          router: { name: 'integral' },
          perms: ['check_score_log'],
        },
      ],
    },

    // 系统管理
    {
      title: '系统管理',
      icon: 'el-icon-setting',
      perms: [
        'check_app_version',
        'check_banner',
        'check_broadcast',
        'check_help',
        'check_notify_list',
      ],
      children: [
        {
          title: '版本管理',
          router: { name: 'appVersion' },
          perms: ['check_app_version'],
        },
        {
          title: '轮播配置',
          router: { name: 'systemBannerSetting' },
          perms: ['check_banner'],
        },
        {
          title: '广播配置',
          router: { name: 'systemBroadcast' },
          perms: ['check_broadcast'],
        },
        {
          title: '领单等级配置',
          router: { name: 'systemAssignLevel' },
          perms: ['check_assignlevel'],
        },
        {
          title: '帮助配置',
          router: { name: 'Helpcenter' },
          perms: ['check_help'],
        },
        {
          title: '站内信配置',
          router: { name: 'Message' },
          perms: ['check_notify_list'],
        },
        {
          title: '历史事件配置',
          router: { name: 'calendars' },
          perms: ['check_calendar'],
        },
      ],
    },
    {
      title: '用户反馈',
      icon: 'el-icon-s-comment',
      name: 'feedback',
      router: { name: 'Feedback' },
      perms: ['check_app_version'],
    },
    {
      title: '运营数据',
      icon: 'el-icon-s-data',
      name: 'operation_data',
      router: { name: 'OperationData' },
      perms: ['check_purify_stat'],
    },
  ]
}
