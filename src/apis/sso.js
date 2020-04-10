import requests from './requests'

// 获取 SSO 登录态，返回新的 SSO 数据
export const postRefreshSSOToken = (payload) => {
  return requests.post('/sso/refresh_token/', payload)
}
