const path = require('path')
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: `http://47.107.36.107:8088`,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  lintOnSave: false,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        'D:\\资料\\outbao\\亿业云\\cli3\\yiyeyun\\src\\assets\\less\\variable.less'
      ]
    }
  }
}
