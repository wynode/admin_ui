const path = require('path')
const resolve = (filePath) => path.resolve(__dirname, '.', filePath)

module.exports = {
  productionSourceMap: process.env.VUE_APP_BUILD !== 'production',

  chainWebpack: (config) => {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/svg'))
      .end()

    config.module
      .rule('svg-complie')
      .test(/\.(svg)(\?.*)?$/)
      .include.add(resolve('src/assets/svg'))
      .end()
      .exclude.add(/node_modules/)
      .end()
      .use('svg')
      .loader('svg-sprite-loader')
  },
}
