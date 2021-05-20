const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
let path = require('path');

module.exports = merge(webpackBaseConfig, {
    output: {
        filename: 'js/[name].js',      // 打包后会根据entry里面的名称，生成新的name.js
        path: path.resolve('../../static'),
        publicPath: '/api/post-tool/static/',//需要设置为根目录，不然会找不到字体文件
    },
    mode: "production"
});
