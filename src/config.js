// const runtimeEnv = process.env.NODE_ENV
const buildEnv = process.env.VUE_APP_BUILD

const serverURL = new Map([
  ['development', 'http://test-coconutapi.qixincha.com'],
  ['testbuild', 'http://test-coconutapi.qixincha.com'],
  ['production', 'https://coconutapi.qixincha.com'],
])

const ssoURL = new Map([
  ['development', 'http://test-sso.qixincha.com'],
  ['testbuild', 'http://test-sso.qixincha.com'],
  ['production', 'https://yassoapi.qixincha.com'],
])

const ssoCallback = new Map([
  ['development', 'http://test-coconut.qixincha.com/sso/cas/auth/'],
  ['testbuild', 'http://test-coconut.qixincha.com/sso/cas/auth/'],
  ['production', 'https://coconut.qixincha.com/sso/cas/auth/'],
])

export const SERVER_API = serverURL.get(buildEnv)
export const SSO_API = ssoURL.get(buildEnv)
export const SSO_CALLBACK = ssoCallback.get(buildEnv)
export const SSO_LOGIN = `${SSO_API}/cas/login/?service=${SSO_CALLBACK}`
export const SSO_LOGOUT = `${SSO_API}/staff/logout/?service=${SSO_CALLBACK}`
export const SSO_CHANGE_PASSWORD = `${SSO_API}/account/password_reset/?service=${SSO_CALLBACK}`

export const AUTH_TOKEN = 'coconutToken'
export const USER_INFO = 'coconutUserinfo'

// upload
export const UPLOAD_URL = `${serverURL.get(buildEnv)}/misc/encrypt_file/`
export const NOREMAL_UPLOAD_URL = `${serverURL.get(buildEnv)}/misc/file/`
