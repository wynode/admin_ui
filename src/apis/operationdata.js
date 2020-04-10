import request from './requests'

// 获取运营数据的细则
export function fetchOperationData(params = {}) {
  return request.get('/purify_stat/purify_stat/', {
    params,
  })
}

// 获取运营数据统计
export function fetchOperationDataTotal(params = {}) {
  return request.get('/purify_stat/purify_stat/overall/', {
    params,
  })
}
