import requests from './requests'

// 获取段位
export const fetchGeniusSetting = (params = {}) => {
  return requests.get('/genius_setting/genius_setting/', { params })
}

// 新增段位
export const postGeniusSetting = (payload) => {
  return requests.post('/genius_setting/genius_setting/', payload)
}

// 修改段位
export const patchGeniusSetting = (id, payload) => {
  return requests.patch(`/genius_setting/genius_setting/${id}/`, payload)
}

// 删除段位
export const deleteGeniusSetting = (id) => {
  return requests.delete(`/genius_setting/genius_setting/${id}/`)
}
