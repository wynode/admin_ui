import requests from './requests'

// 用户列表
export const fetchUserList = (params = {}) => {
  return requests.get('/user/admin/userprofile/', { params })
}
// 简单用户列表
export const fetchUserListSimple = (params = {}) => {
  return requests.get('/user/admin/userprofile/simple/', { params })
}

export const postAssignRole = (payload) =>
  requests.post('/user/admin/userprofile/assign_role/', payload)

export const postUserAssignLevel = (payload) =>
  requests.post('/user/admin/userprofile/assign_levels/', payload)

// 批量修改用户状态
export const putUsersStatus = (payload) => {
  return requests.put('/user/admin/userprofile/update_user_status/', payload)
}
// 获取用户详情
export const fetchUserProfileById = (id, payload) =>
  requests.get(`/user/admin/userprofile/${id}/`, payload)

// 获取用户详情冲关数据
export const fetchCheckPointData = (id, params) =>
  requests.get(`/user/admin/userprofile/${id}/user_check_point_stat/`, {
    params,
  })
// 获取用户详情净网数据
export const fetchPurifyData = (id, params) =>
  requests.get(`/user/admin/userprofile/${id}/user_purify_stat/`, {
    params,
  })

// 获取用户详情能力矩阵
export const fetchRadarData = (id, params) =>
  requests.get(`/user/admin/userprofile/${id}/user_radar_graph/`, {
    params,
  })

// 获取用户积分
export const fetchScore = (params = {}) => {
  return requests.get('/score_log/score_log/', { params })
}
// 新增用户积分
export const postScore = (payload) => {
  return requests.post('/score_log/score_log/', payload)
}

// 用户积分导出
export const fetchScoreExport = () => {
  return requests.get('/score_log/score_log/csv_view/')
}

// 修改用户积分更改状态
export const patchScoreStatus = (id, payload) => {
  return requests.patch(`/score_log/score_log/${id}/`, payload)
}

// 用户导出
export const fetchUserExport = () => {
  return requests.get('/user/admin/userprofile/csv_view/')
}
