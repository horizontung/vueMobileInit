Vue rem

### 1、vue create myApp

- 自选配置
- eslint【standard】
- sass【node】

### 2、修改package.json

```json
"dev": "vue-cli-service serve --mode development",
"prod": "vue-cli-service serve --mode production",
"build": "vue-cli-service build",
"lint": "vue-cli-service lint"
```

### 3、根目录下新增文件

.env.development

```
VUE_APP_BASEURL='http://host.dev.com'
```

.env.production

```
VUE_APP_BASEURL='http://host.prod.com'
```

### 4、安装依赖

```bash
yarn add amfe-flexible   
yarn add postcss-pxtorem@5.1.1 --dev
```

### 5、src 下新增文件：main.css

```css
html {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,body{
  width: 100%;
  height: auto;
  position: relative;
  left: 0;
  top: 0;
  overflow:hidden;
  overflow-y:auto;
}
.italic{
  font-style: italic;
}
*, *:before, *:after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}
```

### 6、修改main.js

```
import './main.css'
import 'amfe-flexible'
```

### 7、根目录下新增文件vue.config.js

```js
const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')

module.exports = {
  outputDir: 'dist',
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production' ? 'https://abc.com/app/' : '/',
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
  devServer: {
    proxy: process.env.VUE_APP_BASEURL
  }
}
```

### 8、移除console.log的配置

```
yarn add babel-plugin-transform-remove-console --dev
```

修改babel.config.js

```js
const REMOVE_LOG = true // 是否移除 console
const prodPlugin = []
if (REMOVE_LOG) {
  prodPlugin.push([
    'transform-remove-console'
  ])
}
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ...prodPlugin
  ]
}
```

### 9、moment优化、分包配置（vue.config.js）

- 先安装webpack

```json
const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
const webpack = require('webpack')

module.exports = {
  outputDir: 'dist',
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production' ? 'https://litatom.oss-cn-hongkong.aliyuncs.com/activity/most-famous-room/' : '/',
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
```

