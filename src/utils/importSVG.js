/**
 * 动态引入 assets/icons/ 目录下所有 svg 文件，并打包为 svg-sprite
 */
const request = require.context('../assets/svg', true, /\.(svg)(\?.*)?/)
request.keys().forEach((svg) => {
  request(svg)
})
