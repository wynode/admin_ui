// const runtimeEnv = process.env.NODE_ENV
const buildEnv = process.env.VUE_APP_BUILD

const serverURL = new Map([
  ['development', 'http://waf.fosuss.com:9502/'],
  ['testbuild', 'http://waf.fosuss.com:9502/'],
  ['production', 'http://waf.fosuss.com:9502/'],
])

export const SERVER_API = serverURL.get(buildEnv)

export const AUTH_TOKEN = 'userSession'
export const USER_INFO = 'adminUser'

// upload
export const UPLOAD_URL = `http://waf.fosuss.com:9502/`
// export const NOREMAL_UPLOAD_URL = `${serverURL.get(buildEnv)}/misc/file/`
