import requests from './requests'

// 获取质检订单
export const fetchQC = (params = {}) => {
  return requests.get('/qc/qc/', { params })
}

// 获取质检数量
export const fetchQCCount = (params = {}) => {
  return requests.get('/qc/qc/count/', { params })
}

// 提交质检
export const postQC = (payload) => {
  return requests.post('/qc/qc/batch_create/', payload)
}

// 获取全部的审核数量
export const fetchAllAuditCount = (params = {}) => {
  return requests.get('/purify/admin/order_detail/web_purify_count_all/', {
    params,
  })
}

// 获取当前已审核数量
export const fetchCurAuditCount = (params = {}) => {
  return requests.get('/purify/admin/order_detail/web_purify_count/', {
    params,
  })
}

// 获取审核列表
export const fetchAuditList = (params = {}) => {
  return requests.get('/purify/admin/web_audit_fetch/', { params })
}

// 提交审核列表
export const postAuditList = (payload) => {
  return requests.post('/purify/admin/web_audit_answer/', payload)
}

// 提交并退出审核
export const postAuditListAndStop = (payload) => {
  return requests.post('/purify/admin/web_audit_stop/', payload)
}

// 获取审核菜单列表
export const fetchAuditMenuList = (params = {}) => {
  return requests.get('/purify/admin/purify_config_detail/', { params })
}
