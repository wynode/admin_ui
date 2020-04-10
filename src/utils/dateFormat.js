import format from 'date-fns/format'

export function dateFormat(time, pattern = 'yyyy-MM-dd HH:mm:ss') {
  return time ? format(new Date(time), pattern) : ''
}

export function expireTimeFormat(time) {
  const baseTime = new Date('1970-1-1 00:00:00').getTime() + time
  const curDay = new Date(baseTime).getDate()
  const curHours = new Date(baseTime).getHours()
  if (curDay > 1) {
    return format(new Date(baseTime).setDate(curDay - 1), 'd天H小时m分钟')
  } else if (curHours >= 1) {
    return format(new Date(baseTime), 'H小时m分钟')
  } else {
    return format(new Date(baseTime), 'm分钟')
  }
}

export function dateTimeRangeFormat(
  dateRange,
  pattern = 'yyyy-MM-dd HH:mm:ss'
) {
  if (Array.isArray(dateRange)) {
    const dr = dateRange.map((date) => dateFormat(date, pattern))

    // startTime and endTime must exist togegher.
    if (dr[0] && dr[1]) {
      return dr
    }
    return []
  }
  return dateRange || []
}

export function todayRangeFormat(date = Date.now()) {
  const start = dateFormat(new Date(date).setHours(0, 0, 0))
  const end = dateFormat(new Date(date).setHours(23, 59, 59))
  return [start, end]
}
