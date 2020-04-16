import requests from './requests'

// url列表
export const fetchUrlList = (params = {}) => {
  return requests.get('/System/ServiceMonitor/urlWatchList', { params })
}

export const fetchUrlInfo = (params = {}) => {
  return requests.get('/System/ServiceMonitor/urlWatchInfo', { params })
}

export const postUrl = (payload) => {
  return requests.post('/System/ServiceMonitor/addUrlWatch', payload)
}

export const patchUrl = (payload) => {
  return requests.post('/System/ServiceMonitor/updateUrlWatch', payload)
}

export const deleteUrl = (payload) => {
  return requests.post('/System/ServiceMonitor/delUrlWatch', payload)
}

// upstream列表
export const fetchUpstreamList = (params = {}) => {
  return requests.get('/System/ServiceMonitor/upStreamList', { params })
}

export const fetchUpstreamInfo = (params = {}) => {
  return requests.get('/System/ServiceMonitor/upStreamInfo', { params })
}

export const postUpstream = (payload) => {
  return requests.post('/System/ServiceMonitor/addUpStream', payload)
}

export const patchUpstream = (payload) => {
  return requests.post('/System/ServiceMonitor/updateUpStream', payload)
}

export const deleteUpstream = (payload) => {
  return requests.post('/System/ServiceMonitor/delUpStream', payload)
}

export const fetchIPAccessList = (params = {}) => {
  return requests.get('/System/IpAccess/list', { params })
}
