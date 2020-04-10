import requests from './requests'

// 关键词列表
export const fetchkeywordsList = (params = {}) => {
  return requests.get('/keywords/keywords/', { params })
}

// 关键词列表导入
export const importkeywordsList = (payload) =>
  requests.post('/keywords/keywords/import_xls/', payload)

// 新增关键词列表编辑关键词
export const postKeyword = (payload) =>
  requests.post(`/keywords/keywords/`, payload)

// 修改关键词列表编辑关键词
export const patchKeyword = (id, payload) =>
  requests.patch(`/keywords/keywords/${id}/`, payload)

// 批量删除
export const batchDelete = (payload) =>
  requests.post(`/keywords/keywords/batch_delete/`, payload)

// 删除关键词列表数据
export const deleteKeyword = (id, payload) =>
  requests.delete(`/keywords/keywords/${id}/`, payload)

// 修改关键词列表常用筛选
export function fetchKeywordCommonStat(params = {}) {
  return requests.get('/keywords/keywords/common_filter_statistics/', {
    params,
  })
}
