const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  pages: {
    index: {
      //入口
      entry: 'src/renderer/main.js',
    },
  },
  devServer:{
    port:8080,
    proxy:{
      '/api': {
        target: 'http://127.0.0.1:7001',//6.9号 改域名访问
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      },
    }
  },
  // vue中配置
  pluginOptions: {
    electronBuilder: {
      mainProcessFile: 'src/main/background.js', //  设置自定义入口文件
      nodeIntegration: true,
    }
  },
  // css:{
  //   loaderOptions:{
  //     less:{
  //         javascriptEnabled: true,
  //         modifyVars: {
  //           //在此处设置，也可以设置直角、边框色、字体大小等
  //              'primary-color': '#68BDA8',
  //       }
  //     }
  //   }
  // }
})
