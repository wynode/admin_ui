import transSpecialHTMLAttr from '@/utils/transSpecialHTMLAttr'
import escapeSpecialHTML from '@/utils/escapeSpecialHTML'

export default function parseHTMLDom(content) {
  if (content) {
    const domStrList = transSpecialHTMLAttr('e', 'title', content)

    const parsedContent = domStrList.reduce((result, ds) => {
      const eTagReg = /<e[^>]+>/i
      return result.replace(eTagReg, `<pre>${ds}</pre>`)
    }, content)

    const tmpHtml = escapeSpecialHTML(parsedContent, 'img,e,span')

    return tmpHtml
  }
  return ''
}
