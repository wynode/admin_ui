import requests from './requests'

// 新建 课程 分类
export const postCustomer = (payload) =>
  requests.post('/purify/admin/customer/', payload)

// 获取 客户 列表
export const fetchCustomer = (params = {}) =>
  requests.get('/purify/admin/customer/', { params })

// 通过id获取 客户
export const fetchCustomerById = (id) =>
  requests.get(`/purify/admin/customer/${id}/`)

// 修改 客户
export const patchCustomer = (id, payload) =>
  requests.patch(`/purify/admin/customer/${id}/`, payload)

// 获取 客户 业务列表
export const fetchCustomerPurifyConf = (params = {}) =>
  requests.get('/purify/admin/customer_purify_conf/', { params })

// 新建 客户 业务
export const postCustomerPurifyConf = (payload) =>
  requests.post('/purify/admin/customer_purify_conf/', payload)

// 修改 客户 业务
export const patchCustomerPurifyConf = (id, payload) =>
  requests.patch(`/purify/admin/customer_purify_conf/${id}/`, payload)
