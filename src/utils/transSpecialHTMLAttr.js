/**
 * 提取指定HTML标签的某个属性
 * @param {string} domName HTML DOM name
 * @param {string} attr HTML DOM attribute
 * @param {string} content raw html string
 *
 * TODO 需要重构，避免外层处理冗余
 */
export default function transSpecialDOM(domName, attr, content) {
  /* eslint-disable */
  let resultDomNS = []
  // 只能匹配半封闭标签
  const domReg = new RegExp(`<${domName}.*?(?:>|\/>)`, 'gi')

  if (content) {
    const matchedContent = content.match(domReg) || []
    resultDomNS = matchedContent.map((domStr) => {
      const attrReg = new RegExp(`${attr}=[\'\"]?([^\'\"]*)[\'\"]`, 'gi')
      attrReg.exec(domStr)
      try {
        return decodeURIComponent(RegExp.$1)
      } catch (error) {
        return domStr
      }
    })
  }
  return resultDomNS
}
