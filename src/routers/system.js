export default [
  {
    path: '/system/role',
    name: 'role',
    meta: {
      title: '角色管理',
      breadcrumb: ['系统管理', '角色管理'],
    },
    component: () => import('@/views/system/role/RoleList'),
  },
  {
    path: '/system/role/:id',
    name: 'RoleProfile',
    meta: {
      title: '角色权限详情',
      breadcrumb: ['系统管理', '角色管理', '角色权限详情'],
    },
    component: () => import('@/views/system/role/RoleProfile'),
  },
  {
    path: '/system/manager',
    name: 'manager',
    meta: {
      title: '管理员列表',
      breadcrumb: ['系统管理', '管理员列表'],
    },
    component: () => import('@/views/system/manager/Manager.vue'),
  },
  {
    path: '/system/app_version',
    name: 'appVersion',
    meta: {
      title: '安装包版本',
      breadcrumb: ['系统管理', '安装包版本'],
    },
    component: () => import('@/views/system/app_version/AppVersion.vue'),
  },
  {
    path: '/system/banner',
    name: 'systemBannerSetting',
    meta: {
      title: '轮播配置',
      breadcrumb: ['系统管理', '轮播配置'],
    },
    component: () => import('@/views/system/banner/Banner.vue'),
  },
  {
    path: '/system/broadcast',
    name: 'systemBroadcast',
    meta: {
      title: '广播配置',
      breadcrumb: ['系统管理', '广播配置'],
    },
    component: () => import('@/views/system/broadcast/Broadcast.vue'),
  },
  {
    path: '/system/assign_level',
    name: 'systemAssignLevel',
    meta: {
      title: '领单等级配置',
      breadcrumb: ['系统管理', '领单等级配置'],
    },
    component: () => import('@/views/system/assign_level/AssignLevel.vue'),
  },
  {
    path: '/system/helpcenter',
    name: 'Helpcenter',
    meta: {
      title: '帮助配置',
      breadcrumb: ['系统管理', '帮助配置'],
    },
    component: () => import('@/views/system/helpcenter/HelpCenter.vue'),
  },
  {
    path: '/system/helpcenter/sort/update',
    name: 'helpCenterSort',
    component: () => import('@/views/system/helpcenter/HelpCenterSorted.vue'),
    meta: {
      title: '帮助配置',
      breadcrumb: ['系统管理', '帮助排序'],
    },
  }, // 关卡排序
  {
    path: '/system/message',
    name: 'Message',
    meta: {
      title: '站内信配置',
      breadcrumb: ['系统管理', '站内信配置'],
    },
    component: () => import('@/views/system/message/MessageManage.vue'),
  },
  {
    path: '/system/calendars',
    name: 'calendars',
    meta: {
      title: '历史事件配置',
      breadcrumb: ['系统管理', '历史事件配置'],
    },
    component: () => import('@/views/system/calendar/CalendarList.vue'),
  },
]
