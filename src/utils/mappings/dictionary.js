// 实时监控
export const liveTime = new Map([
  ['qps', '当前QPS'],
  ['incomeTransfer', '当前流量'],
  ['requestTimes', '今日总请求数'],
  ['status10x', '今日10x百分比'],
  ['status20x', '今日20x百分比'],
  ['status30x', '今日30x百分比'],
  ['status40x', '今日40x百分比'],
  ['status50x', '今日50x百分比'],
  ['attackTimes', '今日攻击次数'],
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
