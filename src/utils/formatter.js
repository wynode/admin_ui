import cloneDeep from 'lodash/cloneDeep'

// 删除对象里面为空的value，包括数组
export function omitKeys(obj) {
  const swapObj = cloneDeep(obj)
  Object.keys(swapObj).forEach((key) => {
    if (
      swapObj[key] === null ||
      swapObj[key] === undefined ||
      swapObj[key] === ''
    ) {
      delete swapObj[key]
    }

    if (Object.prototype.toString.call(swapObj[key]) === '[object Array]') {
      if (swapObj[key].length === 0) {
        delete swapObj[key]
      }
    }

    if (Object.prototype.toString.call(swapObj[key]) === '[object Object]') {
      swapObj[key] = omitKeys(swapObj[key])
    }
  })
  return swapObj
}
