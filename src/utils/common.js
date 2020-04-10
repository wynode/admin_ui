import { dateTimeRangeFormat } from './dateFormat'

export const toPercent = (num, decimals = 2) => {
  const n = Number(num)
  if (Number.isNaN(n)) {
    throw new Error('paramater must be num-like')
  }

  return `${(n * 100).toFixed(decimals)}%`
}

export const toThousands = (num) => {
  if (num == null) return num
  const numSplitStr = num.toString().split('.')

  if (numSplitStr.length > 1) {
    const [integer, reset] = numSplitStr
    const thousandsInt = integer.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    return `${thousandsInt}.${reset}`
  }

  return num.toLocaleString ? num.toLocaleString() : num.toString()
}

export const splite = (raw, mixSymbl = ' ') => {
  return typeof raw === 'string' ? raw.split(mixSymbl) : raw
}

export const join = (raw, mixSymbl = ',') => {
  return Array.isArray(raw) ? raw.join(mixSymbl) : raw
}

export const minuteJoin = (raw, mixSymbl = ',') => {
  if (!Array.isArray(raw) || !raw[1]) return
  return raw.map((item) => item * 60 || 0).join(mixSymbl)
}

export const dateTimeJoin = (raw, mixSymbl = ',') => {
  return join(dateTimeRangeFormat(raw), mixSymbl)
}

export const dateJoin = (raw, mixSymbl = ',') => {
  return join(dateTimeRangeFormat(raw, 'yyyy-MM-dd'), mixSymbl)
}

export const numberJoin = (raw, mixSymbl = ',') => {
  if (Array.isArray(raw) && raw.some((v) => v == null)) {
    return null
  }
  return join(raw, mixSymbl)
}

export const cascaderJoin = (raw, mixSymbl = ',') => {
  if (Array.isArray(raw)) {
    // NOTE 数组 v 可能为空，导致 dp 里最终数据可能会出现 undefined
    const dp = raw.map((v) => v[v.length - 1])
    return join(dp, mixSymbl)
  }
  return raw
}

export const textCutOff = (text, retain) => {
  return typeof text === 'string'
    ? text.length <= retain
      ? text
      : text.slice(0, retain) + '...'
    : text
}
