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
        port: '8080',
        proxy: {
          '/restricted': {
                target:'https://c3.helendoctor.com', 
                changeOrigin:true,
                pathRewrite:{  
                    '^/restricted': '/restricted'
                }
            },
            '/api': {
                target:'https://c3.helendoctor.com', 
                changeOrigin:true,
                pathRewrite:{  
                    '^/api': '/api'
                }
            }
        }
  }
});