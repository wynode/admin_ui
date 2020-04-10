import * as dicts from './dictionary'

export function getDict(name) {
  return dicts[name] || new Map()
}

export function translate(field, dict) {
  return getDict(dict).get(field)
}

export function getArray(name) {
  const map = getDict(name)
  return Array.from(map)
}

export function getMapOptions(name, excludes = []) {
  const arr = getArray(name)
  if (!excludes.length) {
    return arr.map(([value, label]) => ({ label, value }))
  }

  return arr.reduce((result, current) => {
    const [value, label] = current
    return excludes.indexOf(value) > -1
      ? result
      : result.concat({ label, value })
  }, [])
}
