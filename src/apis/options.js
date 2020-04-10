import request from './requests'

// 获取当前筛选项的配置
export function fetchOptions(option, params = {}) {
  return request.get(`/options/${option}/`, {
    params,
  })
}

// 获取当前筛选项的配置(没有options)
export function fetchNoOptions(option, params = {}) {
  return request.get(`${option}`, {
    params,
  })
}

// 职位
export function fetchOptsPosition(params = {}) {
  return request.get('/account_manage/admin/position/get_position_options/', {
    params,
  })
}

// 部门
export function fetchOptsDepartment(params) {
  return request.get(
    '/account_manage/admin/department/get_department_options/',
    { params }
  )
}

// 二级标签
export function fetchOptsSecondTags(params) {
  return request.get('/options/second_tags/', { params })
}

// 帮助页面跳转获取
export function fetchOptsHelpCenter(params) {
  return request.get('/help/helpcenter/simple/', { params })
}
