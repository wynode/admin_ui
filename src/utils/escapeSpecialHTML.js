/**
 * 实体化HTML代码，避免v-html时出现XSS攻击;
 * @param {string} content HTML 字符串
 * @param {string} tags 需要排除HTML Tag的名称, 以逗号分隔: 'img,e'
 */

export default function escapeSpecialHTML(content, tags = '') {
  const tagList = tags
    .split(',')
    .map((t) => t.trim())
    .join('|')
  const reg = tagList ? `(?!${tagList}|font|/font)` : ''
  const escapeReg = new RegExp(`<${reg}[^>]+>`, 'gi')

  return content.replace(escapeReg, (str) => {
    const elem = document.createElement('div')
    const txt = document.createTextNode(str)
    elem.appendChild(txt)
    return elem.innerHTML
  })
}
