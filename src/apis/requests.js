import Axios from 'axios'
import store from 'store2'
import { SERVER_API, AUTH_TOKEN, USER_INFO } from '@/config'
import { Notification } from 'element-ui'

function requestFactory(httpClient) {
  httpClient.interceptors.request.use(
    (opts) => {
      const token = store.get(AUTH_TOKEN)
      if (token) {
        /* eslint-disable no-param-reassign */
        opts.headers.Authorization = `JWT ${token}`
      }
      return opts
    },
    (error) => Promise.reject(error)
  )
}

function responseFactory(httpClient) {
  httpClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
      if (error.response.status === 401) {
        store.remove(AUTH_TOKEN)
        store.remove('perms')
        store.remove(USER_INFO)
        window.location.replace(`/login?next=${window.location.href}`)
        return Promise.reject(new Error({ code: 401, message: '登录超时' }))
      } else if (error.response.status === 500) {
        Notification.error('服务器处理出错')
      }

      return Promise.reject(error.response)
    }
  )
}

function clientFactory(options = {}) {
  const client = Axios.create(options)
  requestFactory(client)
  responseFactory(client)
  return client
}

const request = clientFactory({
  baseURL: SERVER_API,
  timeout: 1000 * 180, // 20sec
})

export default request
