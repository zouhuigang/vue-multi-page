const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
//生成nginx方便解析的html
let utils = require('./utils');

module.exports = merge(webpackBaseConfig, {
    plugins: [
        ...utils.packHtmlToNginx(),
    ]
});