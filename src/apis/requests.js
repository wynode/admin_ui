import Axios from 'axios'
import store from 'store2'
import { SERVER_API, AUTH_TOKEN } from '@/config'
import { Notification } from 'element-ui'

function requestFactory(httpClient) {
  httpClient.interceptors.request.use(
    (opts) => {
      const token = store.get(AUTH_TOKEN)
      if (token) {
        /* eslint-disable no-param-reassign */
        if (opts.params) {
          opts.params[AUTH_TOKEN] = token
        } else {
          opts.data[AUTH_TOKEN] = token
        }
      }
      if (opts.data) {
        const formData = new FormData()
        Object.keys(opts.data).forEach((key) => {
          formData.append(key, opts.data[key])
        })
        opts.data = formData
      }
      opts.headers = {
        ...opts.headers,
        'Content-Type': 'multipart/form-data',
      }
      const verifyCodeTime = store.get('verifyCodeTime')
      const verifyCodeHash = store.get('verifyCodeHash')
      const isLogin = opts.url == '/System/Auth/login'
      if (verifyCodeTime && verifyCodeHash && isLogin) {
        opts.headers = {
          ...opts.headers,
          'Content-Type': 'multipart/form-data',
          Authorization: `verifyCodeTime=${verifyCodeTime};verifyCodeHash=${verifyCodeHash}`,
        }
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
        window.location.replace('/login')
        return Promise.reject(new Error({ code: 401, message: '登录超时' }))
      } else if (error.response.status === 500) {
        Notification.error('服务器处理出错')
      } else {
        Notification.error(error.response.data.msg || '请求出错')
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
