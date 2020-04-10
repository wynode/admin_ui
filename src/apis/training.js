import requests from './requests'

// 获取 课程 分类
export const fetchCategory = (params = {}) =>
  requests.get('/lesson/lesson_category/', { params })

// 修改 课程 分类
export const patchCategory = (id, payload) =>
  requests.patch(`/lesson/lesson_category/${id}/`, payload)

// 删除 课程 分类
export const deleteCategory = (id, payload) =>
  requests.delete(`/lesson/lesson_category/${id}/`, payload)

// 新建 课程 分类
export const postCategory = (payload) =>
  requests.post('/lesson/lesson_category/', payload)

// 获取 课程 列表
export const fetchLesson = (params = {}) =>
  requests.get('/lesson/lessons/', { params })

// 修改 课程
export const patchLesson = (id, payload) =>
  requests.patch(`/lesson/lessons/${id}/`, payload)

// 删除 课程
export const deleteLesson = (id, payload) =>
  requests.delete(`/lesson/lessons/${id}/`, payload)

// 新建 课程
export const postLesson = (payload) =>
  requests.post('/lesson/lessons/', payload)

// 通过id获取 课程
export const fetchLessonById = (id) => requests.get(`/lesson/lessons/${id}/`)

// 获取 课程 评论
export const fetchLessonRemark = (params = {}) =>
  requests.get('/lesson/lesson_remark/', { params })
