export const liveStatus = new Map([
  ['qps', '当前qps'],
  ['requestTimes', ' 当前总请求次数'],
  ['outcomeTransfer', '当前出网总流量'],
  ['outcomeAverageTransfer', '当前出网平均流量'],
  ['incomeTransfer', '当前入网总流量'],
  ['incomeAverageTransfer', '当前入网平均流量'],
  ['attackTimes', '今日攻击次数'],
])

export const liveStatusDay = new Map([
  ['qps', '今日qps'],
  ['requestTimes', '总请求次数'],
  ['outcomeTransfer', '今日出网总流量'],
  ['outcomeAverageTransfer', '今日出网平均流量'],
  ['incomeTransfer', '今日入网总流量'],
  ['incomeAverageTransfer', '今日入网平均流量'],
  ['attackTimes', '今日攻击次数'],
])

export const liveStatusDayHistory = new Map([
  ['qps', 'qps'],
  ['requestTimes', '总请求次数'],
  ['outcomeTransfer', '出网总流量'],
  ['outcomeAverageTransfer', '出网平均流量'],
  ['incomeTransfer', '入网总流量'],
  ['incomeAverageTransfer', '入网平均流量'],
  ['attackTimes', '攻击次数'],
])

export const liveLine = new Map([
  ['requestTimes', '当前总请求次数'],
  ['qps', '当前qps'],
  ['status10x', '当前10x响应次数'],
  ['status20x', '当前20x响应次数'],
  ['status30x', '当前30x响应次数'],
  ['status40x', '当前40x响应次数'],
  ['status50x', '当前50x响应次数'],
])

export const liveLineFlow = new Map([
  ['incomeTransfer', '当前入网总流量'],
  ['incomeAverageTransfer', '当前平均入网流量'],
  ['outcomeTransfer', '当前出网总流量'],
  ['outcomeAverageTransfer', '当前平均出网流量'],
])

export const liveLineAttack = new Map([['attackTimes', '当前攻击拦截次数']])

// 实时监控

export const liveHistogram = new Map([
  ['status10x', ' 10x'],
  ['status20x', '20x'],
  ['status30x', '30x'],
  ['status40x', '40x'],
  ['status50x', '50x'],
])

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

export const diskStatis = new Map([
  ['device', '设备'],
  ['reads', '读取'],
  ['writes', '写入'],
  ['inProg', 'inProg'],
  ['time', 'time'],
])

export const memory = new Map([])
