import request from './requests'

// 管理员管理

// TODO 用作备选项请求时，使用的地方应该删除硬编码的 page_size: 99999，用组件的remote search 功能实现，否则会出现性能瓶颈;
export const fetchManagers = (params = {}) =>
  request.get('/account_manage/user/', { params })

export const postAssignRole = (payload) =>
  request.post('/account_manage/user/assign_role/', payload)

export const patchUser = (id, payload) =>
  request.patch(`/account_manage/user/${id}/`, payload)

export const fetchUserById = (id, params = {}) =>
  request.get(`/account_manage/user/${id}/`, { ...params })

export function fetchUsersStats() {
  return request.get('/account_manage/user/common_filter_statistics/')
}
