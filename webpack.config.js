let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
// 将js中的css拆分成link css样式的插件
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
// 打包前先清空dist目录
let CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        index: './src/template/welcome/index.js',
        login: './src/template/login/index.js'
    },
    output: {
        filename: '[name].[hash:4].js',      // 打包后会根据entry里面的名称，生成新的name.js
        path: path.resolve('dist')
    },  
    plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './src/template/welcome/index.html',   
                filename: 'index.html',//打包后的文件名称
                chunks: ['index']   //将entry名称对应的js文件，打包进对应的filename页面中
            }),
            new HtmlWebpackPlugin({
                template: './src/template/login/index.html',
                filename: 'login.html',
                chunks: ['login']
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
            },
            {
                test:/\.js$/,
                use: 'babel-loader',
                include: /src/,          // 只转化src目录下的js
                exclude: /node_modules/  // 排除掉node_modules，优化打包速度
            }
        ]
    }
}