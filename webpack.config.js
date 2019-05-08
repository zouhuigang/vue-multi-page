let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
// 拆分css样式的插件
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: 'bundle.[hash:4].js',
        path: path.resolve('dist')
    },  
    plugins: [
	        new HtmlWebpackPlugin({
	            template: './src/index.html',
	            hash: true, 
            }),
             // 拆分后会把css文件放到dist目录下的css/style.css
            new ExtractTextWebpackPlugin('css/style.css') 
	],
    module: {
        rules: [
            {
                test: /\.css$/,     // 解析css
                use: ExtractTextWebpackPlugin.extract({
                    // 将css用link的方式引入就不再需要style-loader了
                    use: 'css-loader'       
                })
            }
        ]
    }
}