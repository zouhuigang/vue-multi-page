const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
//生成可运行的html
let utils = require('./utils');

module.exports = merge(webpackBaseConfig, {
    plugins: [
        ...utils.packHtml(),
    ],
    devServer: {//2018-06-28跨域解决
        historyApiFallback: true,
        disableHostCheck: true,
        hot: true,
        inline: true,
        overlay: true,
        stats: { colors: true },
        host: '127.0.0.1',
        port: '8080',
        proxy: {
          '/restricted': {
                target:'http://192.168.50.60:8888', 
                changeOrigin:true,
                pathRewrite:{  
                    '^/restricted': '/restricted'
                }
            },
            '/api': {
                target:'http://192.168.50.60:8888', 
                changeOrigin:true,
                pathRewrite:{  
                    '^/api': '/api'
                }
            }
        }
  }
});