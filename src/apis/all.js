import requests from './requests'

export const fetchAccessLogList = (params = {}) => {
  return requests.get('/System/Log/accessLogList', { params })
}

export const fetchAttackLogList = (params = {}) => {
  return requests.get('/System/Log/attackLogList', { params })
}

export const fetchLogConfig = (params = {}) => {
  return requests.get('/System/Log/getLogConfig', { params })
}

export const patchLogConfig = (payload) => {
  return requests.post('/System/Log/updateLogConfig', payload)
}

export const fetchIPList = (params = {}) => {
  return requests.get('/System/IpList/list', { params })
}

export const postIP = (payload) => {
  return requests.post('/System/IpList/addIp', payload)
}

export const patchIP = (payload) => {
  return requests.post('/System/IpList/updateIp', payload)
}

export const delIP = (payload) => {
  return requests.post('/System/IpList/delIp', payload)
}

export const fetchParamsFilter = (params = {}) => {
  return requests.get('/System/ParamFilter/list', { params })
}

export const postParamsFilter = (payload) => {
  return requests.post('/System/ParamFilter/addParamFilter', payload)
}

export const patchParamsFilter = (payload) => {
  return requests.post('/System/ParamFilter/updateParamFilter', payload)
}

export const delParamsFilter = (payload) => {
  return requests.post('/System/ParamFilter/delParamFilter', payload)
}

export const fetchBaseSetting = (params = {}) => {
  return requests.get('/System/BaseSetting/getBaseSetting', { params })
}

export const patchBaseSetting = (payload) => {
  return requests.post('/System/BaseSetting/updateSetting', payload)
}

export const fetchVerifyCode = (params = {}) => {
  return requests.get('/Common/VerifyCode/verifyCode', { params })
}
export const fetchDiskSplit = (params = {}) => {
  return requests.get('/System/Status/disk', { params })
}
export const fetchMemory = (params = {}) => {
  return requests.get('/System/Status/memory', { params })
}
export const fetchIOstatis = (params = {}) => {
  return requests.get('/System/Status/ioStats', { params })
}

export const fetchIPForbidden = (params = {}) => {
  return requests.get('/System/IpLocationForbidden/list', { params })
}

export const fetchProvince = (params = {}) => {
  return requests.get('/System/IpLocationForbidden/provinceList', { params })
}

export const patchIPForbidden = (payload) => {
  return requests.post('/System/IpLocationForbidden/updateForbidden', payload)
}
