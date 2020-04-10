import requests from './requests'

// 试题管理
// 试题列表
export const fetchExamQuestion = (params = {}) =>
  requests.get('/exam/exam_question/', { params })

// 新建试题
export const postExamQuestion = (payload) =>
  requests.post('/exam/exam_question/', payload)

// 修改试题
export const patchExamQuestion = (id, payload) =>
  requests.patch(`/exam/exam_question/${id}/`, payload)

// 删除试题
export const deleteExamQuestionById = (id, payload) =>
  requests.delete(`/exam/exam_question/${id}/`, payload)

// 修改试题状态
export const postExamQuestionStatus = (payload) =>
  requests.post('/exam/exam_question/update_status/', payload)

// 获取简单的关卡列表
export const fetchCheckPointSimple = (params) =>
  requests.get('/exam/checkpoint/simple/', { params })

// 冲关明细
export const fetchUserExam = (params = {}) => {
  return requests.get('/exam/user_exam_admin/', { params })
}

// 冲关明细导出
export const fetchUserExamExport = (params = {}) => {
  return requests.get('/exam/user_exam_admin/csv_view/', { params })
}

// 冲关排名
export const fetchUserExamRanking = (params = {}) => {
  return requests.get('/exam/admin_user_ranking/', { params })
}

// 冲关排名导出
export const fetchUserExamRankingExport = () => {
  return requests.get('/exam/admin_user_ranking/csv_view/')
}

// 答题明细
export const fetchUserExamQues = (params = {}) => {
  return requests.get('/exam/user_exam_question_admin/', { params })
}

// 答题明细导出
export const fetchUserExamQuesExport = (params = {}) => {
  return requests.get('/exam/user_exam_question_admin/csv_view/', { params })
}

// 关卡列表
export const fetchCheckPoint = (params) => {
  return requests.get('/exam/checkpoint/', { params })
}

// 关卡详情
export const fetchCheckPointById = (id) => {
  return requests.get(`/exam/checkpoint/${id}/`)
}

// 新增关卡
export const postCheckPoint = (payload) => {
  return requests.post('/exam/checkpoint/', payload)
}

// 编辑关卡
export const patchCheckPoint = (id, payload) => {
  return requests.patch(`/exam/checkpoint/${id}/`, payload)
}

// 变更关卡状态
export const postCheckPointStatus = (payload) => {
  return requests.post('/exam/checkpoint/update_status/', payload)
}

// 删除关卡题目
export const putCheckPointQues = (id) => {
  return requests.put(`/exam/exam_question/${id}/remove_from_list/`)
}

// 关卡重新排序
export const postCheckPointSort = (payload) => {
  return requests.post('/exam/checkpoint/sort/', payload)
}
