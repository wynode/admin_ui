import requests from './requests'

// 内容列表
export const fetchPlaygroundContentList = (params = {}) => {
  return requests.get('/practice/practice/', { params })
}

// 内容列表导入
export const importPlaygroundContentList = (payload) =>
  requests.post('/practice/practice/import_xls/', payload)

// 内容列表导出
export const fetchUserContentExport = (params = {}) => {
  return requests.get('/practice/practice/csv_view/', { params })
}

// 内容列表修改内容状态
export const postPlaygroundContentStatus = (payload) =>
  requests.post('/practice/practice/update_status/', payload)

// 修改内容列表编辑内容
export const patchContentEdit = (id, payload) =>
  requests.patch(`/practice/practice/${id}/`, payload)

// 删除内容列表数据
export const deleteContentById = (id, payload) =>
  requests.delete(`/practice/practice/${id}/`, payload)

// 修改内容列表常用筛选
export function fetchContentCommonStat(params = {}) {
  return requests.get('/practice/practice/common_filter_statistics/', {
    params,
  })
}

// 练习记录
export const fetchPlaygroundRecordList = (params = {}) => {
  return requests.get('/practice/user_practice/', { params })
}

// 练习记录筛选下岗位名称
export function fetchRecordOptsPosition(params = {}) {
  return requests.get('/account_manage/admin/position/get_position_options/', {
    params,
  })
}

// 练习记录筛选下练习人
export const fetchRecordUserList = (params = {}) => {
  return requests.get('/user/admin/userprofile/', { params })
}

// 练习记录筛选下所在部门
export function fetchRecordOptsDepartment(params) {
  return requests.get(
    '/account_manage/admin/department/get_department_options/',
    { params }
  )
}

// 练习记录列表常用筛选
export function fetchRecordCommonStat(params = {}) {
  return requests.get('/practice/user_practice/common_filter_statistics/', {
    params,
  })
}

// 练习明细
export const fetchPlaygroundDetailList = (params = {}) => {
  return requests.get('/practice/user_answer/', { params })
}
// 练习明细导出
export const fetchPlaygroundDetailExport = (params = {}) => {
  return requests.get('/practice/user_answer/csv_view/', { params })
}

// 练习明细筛选下所在部门
export function fetchDetailOptsDepartment(params) {
  return requests.get(
    '/account_manage/admin/department/get_department_options/',
    { params }
  )
}

// 练习明细筛选下岗位名称
export function fetchDetailOptsPosition(params = {}) {
  return requests.get('/account_manage/admin/position/get_position_options/', {
    params,
  })
}

// 练习明细筛选下练习人
export const fetchDetailUserList = (params = {}) => {
  return requests.get('/user/admin/userprofile/', { params })
}

// 练习明细常用筛选
export function fetchDetailCommonStat(params = {}) {
  return requests.get('/practice/user_answer/common_filter_statistics/', {
    params,
  })
}

// 练习排名
export const fetchPlaygroundRankingList = (params = {}) => {
  return requests.get('/practice/summit/', { params })
}

// 练习排名筛选下岗位名称
export function fetchRankingOptsPosition(params = {}) {
  return requests.get('/account_manage/admin/position/get_position_options/', {
    params,
  })
}

// 练习排名筛选下岗位名称
export function fetchRankingOptsDepartment(params) {
  return requests.get(
    '/account_manage/admin/department/get_department_options/',
    { params }
  )
}
