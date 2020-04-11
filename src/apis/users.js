import requests from './requests'

// 用户列表
export const fetchUserList = (params = {}) => {
  return requests.get('/System/AdminUser/list', { params })
}

export const postUser = (payload) => {
  return requests.post('/System/AdminUser/addUser', payload)
}

export const patchUser = (payload) => {
  return requests.post('/System/AdminUser/updateUser', payload)
}

export const deleteUser = (payload) => {
  return requests.post('/System/AdminUser/delUser', payload)
}
