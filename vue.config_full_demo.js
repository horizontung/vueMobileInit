const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
const webpack = require('webpack')

module.exports = {
  outputDir: 'dist',
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production' ? 'https://www.abc.com/de/' : '/',
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 75,
            propList: ['*']
          })
        ]
      }
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.ContextReplacementPlugin(
        /moment[/\\]locale$/, // 这个参数表明了我们要改变的打包上下文
        /zh-cn/ // 这个参数表示我们只想打包这个正则匹配的文件
      )
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          moment: {
            test: /[\\/]node_modules[\\/](moment)[\\/]/,
            name: 'moment-vendor',
            chunks: 'all',
            priority: 10
          }
        }
      }
    }
  },
  devServer: {
    proxy: process.env.VUE_APP_BASEURL
  }
}
