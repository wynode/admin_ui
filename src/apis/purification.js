import requests from './requests'

// 获取净网配置列表
export const fetchPurifyConfig = (params = {}) => {
  return requests.get('/purify/admin/purify_config/', { params })
}

// 新增净网配置
export const postPurifyConfig = (payload) => {
  return requests.post('/purify/admin/purify_config/', payload)
}

// 编辑净网配置
export const patchPurifyConfig = (id, payload) => {
  return requests.patch(`/purify/admin/purify_config/${id}/`, payload)
}

// 客户列表
export const fetchCustomers = (params = {}) => {
  return requests.get('/purify/admin/customer/', { params })
}

// 新增客户列表
export const postCustomers = (payload) => {
  return requests.post('/purify/admin/customer/', payload)
}

// 修改客户列表
export const patchCustomers = (id, payload) => {
  return requests.patch(`/purify/admin/customer/${id}/`, payload)
}

// 修改客户密码
export const postCustomersPassword = (payload) => {
  return requests.post('/purify/admin/customer/set_pwd/', payload)
}

// 净网类型名称列表
export const fetchPurifyConfigSimpale = (params = {}) => {
  return requests.get('/purify/admin/purify_config/simple/', { params })
}

// 修改净网状态和二级标签
export const patchPurifyStatusAndSec = (id, payload) => {
  return requests.patch(`/purify/admin/order_list/${id}/qc_view/`, payload)
}

// 客户详情净网配置列表
export const fetchCustomerPurifyConfig = (params = {}) => {
  return requests.get('/purify/admin/customer_purify_conf/', { params })
}

// 新增客户详情净网配置
export const postCustomerPurifyConfig = (payload) => {
  return requests.post('/purify/admin/customer_purify_conf/', payload)
}

// 修改客户详情净网配置
export const patchCustomerPurifyConfig = (id, payload) => {
  return requests.patch(`/purify/admin/customer_purify_conf/${id}/`, payload)
}

// 净化排名
export const fetchPureRankingList = (params = {}) => {
  return requests.get('/purify/admin/summit/', { params })
}

// 净网明细
export const fetchPureDetail = (params = {}) => {
  return requests.get('/purify/admin/order_detail/', { params })
}

// 净网内容明细
export const fetchPureContentDetail = (params = {}) => {
  return requests.get('/purify/admin/order_list/', { params })
}
// 净网明细导出
export const fetchPureDetailExport = (params = {}) => {
  return requests.get('/purify/admin/order_detail/csv_view/', { params })
}

// 净网内容明细导出
export const fetchPureContentDetailExport = (params = {}) => {
  return requests.get('/purify/admin/order_list/csv_view/', { params })
}

// 净网内容明细导出
export const fetchZSXQPureContentDetailExport = (params = {}) => {
  return requests.get('/purify/admin/order_list/zsxq_csv_view/', { params })
}

// importXiaozhiData
export const importXiaozhiData = (payload) =>
  requests.post('/content/import_xls_data/', payload)

// importXiaozhiDataV2
export const importXiaozhiDataV2 = (payload) =>
  requests.post('/content/import_xls_datav2/', payload)

// PutchangeUrgency
export const PutchangeUrgency = (params = {}) => {
  return requests.put('/purify/admin/order_list/change_urgency/', null, {
    params,
  })
}

// PutDelOrders
export const PutDelOrders = (params = {}) => {
  return requests.put('/purify/admin/order_list/del_orders/', null, { params })
}

// 获取 净网 图标
export const fetchPurifyIcons = (params = {}) => {
  return requests.get('/purify/admin/purify_icon/', { params })
}
