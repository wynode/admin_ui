import requests from './requests'

// 获取问题反馈
export const fetchFeedback = (params = {}) => {
  return requests.get('/feedback/feedback/', { params })
}

// 修改问题反馈
export const patchFeedback = (id, payload) => {
  return requests.patch(`/feedback/feedback/${id}/`, payload)
}

// 客户反馈

// 客户反馈列表
export const fetchClientFeedback = (params = {}) => {
  return requests.get('/client/admin/order_feedback/', { params })
}
// 修改客户反馈

export const patchClientFeedback = (id, payload) => {
  return requests.patch(`/client/admin/order_feedback/${id}/`, payload)
}
