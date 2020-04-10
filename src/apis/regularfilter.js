import request from './requests'

export function fetchQuestionCommonStat(params = {}) {
  return request.get('/exam/exam_question/common_filter_statistics/', {
    params,
  })
}

// 站内信的常用筛选
export function fetchMessageCommonStat(params = {}) {
  return request.get('/notify/list/common_filter_statistics/', {
    params,
  })
}

export function fetchCheckPointCommonStat(params = {}) {
  return request.get('/exam/checkpoint/common_filter_statistics/', {
    params,
  })
}
// 净网明细常用筛选
export function fetchPurifyDetailCommonStat(params = {}) {
  return request.get('/purify/admin/order_detail/common_filter_statistics/', {
    params,
  })
}
// 内容明细常用筛选
export function fetchContentDetailCommonStat(params = {}) {
  return request.get('/purify/admin/order_list/common_filter_statistics/', {
    params,
  })
}
// 归档净网明细常用筛选
export function fetchArchivePurifyDetailCommonStat(params = {}) {
  return request.get('/archive/admin/order_detail/common_filter_statistics/', {
    params,
  })
}
// 归档内容明细常用筛选
export function fetchArchiveContentDetailCommonStat(params = {}) {
  return request.get('/archive/admin/order_list/common_filter_statistics/', {
    params,
  })
}
// 用户反馈常用筛选
export function fetchClientFeedbackCommonStat(params = {}) {
  return request.get('/client/admin/order_feedback/common_filter_statistics/', {
    params,
  })
}

export function fetchRegularFilters(params = {}) {
  return request.get('/ks_common_filter/', { params })
}

export function postRegularFilters(payload) {
  return request.post('/ks_common_filter/', payload)
}

export function deleteRegularFilters(payload) {
  return request.post('/ks_common_filter/batch_destroy/', payload)
}

// 积分明细的常用筛选
export function fetchIntegralCommonStat(params = {}) {
  return request.get('/score_log/score_log/common_filter_statistics/', {
    params,
  })
}

// 用户常用筛选
export function UserprofileadminviewCommonStat(params = {}) {
  return request.get('/user/admin/userprofile/common_filter_statistics/', {
    params,
  })
}
