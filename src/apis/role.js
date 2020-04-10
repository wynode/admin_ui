import request from './requests'

// 权限管理
export const fetchPermsConfig = () =>
  request.get('/account_manage/perms/config/')

export const postRole = (payload) =>
  request.post('/account_manage/role/', payload)

export const fetchRoles = (params = {}) =>
  request.get('/account_manage/role/', { params })

export const fetchRolesOpts = (params = {}) =>
  request.get('/account_manage/role/get_role_options/', { ...params })

export const patchRole = (id, payload) =>
  request.patch(`/account_manage/role/${id}/`, payload)

export const deleteRole = (id) => request.delete(`/account_manage/role/${id}/`)

export const fetchRoleById = (id) => request.get(`/account_manage/role/${id}/`)
