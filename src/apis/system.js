import requests from './requests'

export const postLogin = (params = {}) => {
  return requests.get('/System/Auth/login', { params })
}

export const postLogout = (payload) => {
  return requests.post('/System/Auth/logout', payload)
}

export const getUserInfo = (payload) => {
  return requests.post('/System/Auth/getInfo', payload)
}

// 通知手机列表
export const fetchPhoneList = (params = {}) => {
  return requests.get('/System/EventNotify/phoneList', { params })
}

export const postPhone = (payload) => {
  return requests.post('/System/EventNotify/addPhone', payload)
}

export const deletePhone = (payload) => {
  return requests.post('/System/EventNotify/delPhone', payload)
}

// 通知列表
export const fetchNotifyList = (params = {}) => {
  return requests.get('/System/EventNotify/list', { params })
}
