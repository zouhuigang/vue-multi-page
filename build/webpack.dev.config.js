const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
let path = require('path');
//生成可运行的html
let utils = require('./utils');

module.exports = merge(webpackBaseConfig, {
    mode: "development",
    output: {
        filename: 'js/[name].js',      // 打包后会根据entry里面的名称，生成新的name.js
        path: path.resolve('../../static'),
        publicPath: '/',//需要设置为根目录，不然会找不到字体文件
    },
    plugins: [
        ...utils.packHtml(),
    ],
    devServer: {
        historyApiFallback: true,
        disableHostCheck: true,
        hot: true,
        inline: true,
        overlay: true,
        stats: {colors: true},
        port: '8081',
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8080',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        }
    }
});
