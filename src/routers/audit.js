export default [
  {
    path: '/audit/text',
    name: 'auditCenter',
    meta: {
      title: '图文审核',
      breadcrumb: ['网页审核', '图文审核'],
    },
    component: () => import('@/views/web_audit/audit_center/AuditCenter.vue'),
  },
  {
    path: '/audit/media',
    name: 'mediaAuditCenter',
    meta: {
      title: '图像审核',
      breadcrumb: ['网页审核', '图像审核'],
    },
    component: () =>
      import('@/views/web_audit/audit_center/MediaAuditCenter.vue'),
  },
  {
    path: '/qc/text',
    name: 'qcCenter',
    meta: {
      title: '图文质检',
      breadcrumb: ['质检中心', '图文质检'],
    },
    component: () => import('@/views/web_audit/qc_center/QCCenter.vue'),
  },
  {
    path: '/qc/media',
    name: 'mediaQCCenter',
    meta: {
      title: '图像质检',
      breadcrumb: ['图像质检', '质检中心'],
    },
    component: () => import('@/views/web_audit/qc_center/MediaQCCenter.vue'),
  },
]
