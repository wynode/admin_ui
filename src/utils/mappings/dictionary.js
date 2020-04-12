// 实时监控
export const liveTime = new Map([
  ['qps', 'QPS'],
  ['incomeTransfer', '流量'],
  ['requestTimes', '总请求数'],
  ['status10x', '10x百分比'],
  ['status20x', '20x百分比'],
  ['status30x', '30x百分比'],
  ['status40x', '40x百分比'],
  ['status50x', '50x百分比'],
  ['attackTimes', '攻击次数'],
])

export const historyTime = new Map([
  ['incomeTransfer', '今日入网流量'],
  ['incomeAverageTransfer', '今日平均入网流量'],
  ['outcomeTransfer', '今日出网流量曲线'],
  ['outcomeAverageTransfer', '今日平均出网流量曲线'],
  ['qps', '今日QPS'],
  // ['qps', '今日当前QPS'],
  ['attackTimes', '今日攻击曲线'],
])

export const logSetting = new Map([
  ['IS_WRITE_COOKIE_DATA', 'isWriteCookieData'],
  ['IS_WRITE_HEADER_DATA', 'isWriteHeaderData'],
  ['IS_WRITE_POST_DATA', 'isWritePostData'],
  ['MAX_STORAGE_DATE', 'maxStorageDate'],
])

export const baseSetting = new Map([
  ['LOG', '日志设置'],
  ['DDOS', 'DDOS设置'],
  ['BLACK_IP', '黑名单设置'],
  ['UUID', 'UUID设置'],
  ['SYSTEM', '系统设置'],
])
