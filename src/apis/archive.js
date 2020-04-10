import requests from './requests'

// 净网明细
export const fetchPureDetail = (params = {}) => {
  return requests.get('/archive/admin/order_detail/', { params })
}

// 净网内容明细
export const fetchPureContentDetail = (params = {}) => {
  return requests.get('/archive/admin/order_list/', { params })
}
// 净网明细导出
export const fetchPureDetailExport = (params = {}) => {
  return requests.get('/archive/admin/order_detail/csv_view/', { params })
}

// 净网内容明细导出
export const fetchPureContentDetailExport = (params = {}) => {
  return requests.get('/archive/admin/order_list/csv_view/', { params })
}
