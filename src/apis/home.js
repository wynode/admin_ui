import requests from './requests'

export const getCurrentData = (params = {}) => {
  return requests.get('/System/Statistics/current', { params })
}

export const getDateData = (params = {}) => {
  return requests.get('/System/Statistics/date', { params })
}
