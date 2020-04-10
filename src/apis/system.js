import requests from './requests'

// 获取 Banner
export const fetchBannerSetting = (params = {}) => {
  return requests.get('/banner/banner/', { params })
}

// 新增 Banner
export const postBannerSetting = (payload) => {
  return requests.post('/banner/banner/', payload)
}

// 修改 Banner
export const patchBannerSetting = (id, payload) => {
  return requests.patch(`/banner/banner/${id}/`, payload)
}

// 删除 Banner
export const deleteBannerSetting = (id) => {
  return requests.delete(`/banner/banner/${id}/`)
}
// 获取 派单等级
export const fetchAssignLevel = (params = {}) => {
  return requests.get('misc/assign_level/', { params })
}

// 获取 派单等级simple
export const fetchAssignLevelSimple = (params = {}) => {
  return requests.get('misc/assign_level/simple/', { params })
}

// 新增 派单等级
export const postAssignLevel = (payload) => {
  return requests.post('misc/assign_level/', payload)
}

// 修改 派单等级
export const patchAssignLevel = (id, payload) => {
  return requests.patch(`misc/assign_level/${id}/`, payload)
}

// 删除 派单等级
export const deleteAssignLevel = (id) => {
  return requests.delete(`misc/assign_level/${id}/`)
}

// 获取 APP 版本
export const fetchAppVerions = (params = {}) =>
  requests.get('/app_version/app_version/', { params })

// 修改 APP 版本
export const patchAppVerion = (id, payload) =>
  requests.patch(`/app_version/app_version/${id}/`, payload)

// 删除 APP 版本
export const deleteAppVerion = (id, payload) =>
  requests.delete(`/app_version/app_version/${id}/`, payload)

// 新建 APP 版本
export const postAppVerion = (payload) =>
  requests.post('/app_version/app_version/', payload)

// 获取具体 APP 版本
export const fetchAppVerionById = (id, params = {}) =>
  requests.get(`/app_version/app_version/${id}/`, { ...params })

// 获取 APP 版本常用筛选
export function fetchAppVerionsStats() {
  return requests.get('/app_version/app_version/common_filter_statistics/')
}

// 获取广播
export const fetchBroadcastSetting = (params = {}) => {
  return requests.get('/broadcast/broadcast/', { params })
}

// 新增广播
export const postBroadcastSetting = (payload) => {
  return requests.post('/broadcast/broadcast/', payload)
}

// 修改广播
export const patchBroadcastSetting = (id, payload) => {
  return requests.patch(`/broadcast/broadcast/${id}/`, payload)
}

// 删除广播
export const deleteBroadcastSetting = (id) => {
  return requests.delete(`/broadcast/broadcast/${id}/`)
}

// 获取 HelpCenter
export const fetchHelpCenterSetting = (params = {}) => {
  return requests.get('/help/helpcenter/', { params })
}

// 新增 HelpCenter
export const postHelpCenterSetting = (payload) => {
  return requests.post('/help/helpcenter/', payload)
}

// 新增 HelpCenter 排序
export const postHelpCenterSort = (payload) => {
  return requests.post('/help/helpcenter/sort/', payload)
}

// 修改 HelpCenter
export const patchHelpCenterSetting = (id, payload) => {
  return requests.patch(`/help/helpcenter/${id}/`, payload)
}

// 删除 HelpCenter
export const deleteHelpCenterSetting = (payload) => {
  return requests.post('/help/helpcenter/batch_delete/', payload)
}

// 获取 HelpCenter
export const fetchHelpCenterTree = (params = {}) => {
  return requests.get('/help/wiki_tree', { params })
}

// 获取站内信
export const fetchSiteMessage = (params = {}) => {
  return requests.get('/notify/list/', { params })
}
// 新增站内信
export const postSiteMessage = (payload) => {
  return requests.post('/notify/data/', payload)
}

// 获取 日历事件
export const fetchCalendar = (params = {}) => {
  return requests.get('/calendar/calendar/', { params })
}
// 新增 日历事件
export const postCalendar = (payload) => {
  return requests.post('/calendar/calendar/', payload)
}
// 修改 日历事件
export const patchCalendar = (id, payload) => {
  return requests.patch(`/calendar/calendar/${id}/`, payload)
}
// 删除 日历事件
export const deleteCalendar = (id, payload) =>
  requests.delete(`/calendar/calendar/${id}/`, payload)
