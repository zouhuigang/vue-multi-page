let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
// 将js中的css拆分成link css样式的插件
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
// 打包前先清空dist目录
let CleanWebpackPlugin = require('clean-webpack-plugin');
//vue加载
const VueLoaderPlugin = require('vue-loader/lib/plugin');

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: {
        index: './src/template/welcome/index.js',
        login: './src/template/login/index.js',
        test:'./src/template/test/index.js',
    },
    output: {
        filename: 'js/[name].[hash:4].js',      // 打包后会根据entry里面的名称，生成新的name.js
        path: path.resolve('dist')
    }, 
    // 提取公共代码
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {   // 抽离第三方插件
                    test: /node_modules/,   // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'vendor',  // 打包后的文件名，任意命名    
                    // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                    priority: 10    
                },
                // common: { // 抽离自己写的公共代码，common这个名字可以随意起
                //     chunks: 'initial',
                //     name: 'common',  // 任意命名
                //     minSize: 0    // 只要超出0字节就生成一个新包
                // }
            }
        }
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          'vue$': 'vue/dist/vue.esm.js',
          '@': resolve('src'),
          'template': resolve('src/template'),
          'components': resolve('src/components')
        }
    }, 
    plugins: [
            new CleanWebpackPlugin(),
            new VueLoaderPlugin(),
            new HtmlWebpackPlugin({
                template: './src/template/welcome/index.html',   
                filename: 'index.html',//打包后的文件名称
                chunks: ['vendor','index']   //将entry名称对应的js文件，打包进对应的filename页面中
            }),
            new HtmlWebpackPlugin({
                template: './src/template/login/index.html',
                filename: 'login.html',
                chunks: ['vendor','login']
            }),
            new HtmlWebpackPlugin({
                template: './src/template/test/index.html',
                filename: 'test.html',
                chunks: ['vendor','test']
            }),
             // 拆分后会把css文件放到dist目录下的css/style.css
            new ExtractTextWebpackPlugin('css/[name].[hash:4].css') 
	],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: 'vue-style-loader!css-loader',
                        less: 'vue-style-loader!css-loader!less-loader'
                    },
                    postLoaders: {
                        html: 'babel-loader'
                    }
                }
            },
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
            },
            {
                test: /\.(eot|ttf|woff|svg)$/,
                use: 'file-loader'
            }
        ]
    }
}