'use strict'
const path = require('path');
//读取文件
const glob = require('glob');
//解析html
let HtmlWebpackPlugin = require('html-webpack-plugin');
let HtmlResWebpackPlugin = require('html-res-webpack-plugin');
//Html模板存放根目录
const TEMPLATE_PATH = path.resolve(__dirname, '../src/template')
const TEMPLATE_JAVA_PATH = path.resolve(__dirname, '../../../templates')


exports.assetsPath = function (_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production'
        ? '/statics'
        : '/statics'

    return path.posix.join(assetsSubDirectory, _path)
}

exports.entries = function () {
    /*用于匹配 pages 下一级文件夹中的 index.js 文件 */
    var entryFiles = glob.sync(TEMPLATE_PATH + '/**/index.js')
    var map = {}
    entryFiles.forEach((filePath) => {
        var entryPath = path.dirname(filePath);
        var index = entryPath.replace(/\//g, '_');
        index = index.split("template_")[1];

        /* 生成对应的键值对 */
        map[index] = filePath
    });
    return map
}


exports.packHtml = function () {
    var entryFiles = glob.sync(TEMPLATE_PATH + '/**/index.html');
    const configHtmlPlugins = [];
    entryFiles.forEach((template) => {
        var index = path.dirname(template).replace(/\//g, '_');
        var chunks_js = index.split("template_")[1];
        var filename = chunks_js.replace(/_/g, '\/') + '/index.html';//打包后的文件路径

        //首页更改为根目录
        if (filename == 'collection/index.html') {
            filename = 'index.html';
        }
        const conf = {
            template: template,
            filename: filename,//打包后的文件名称
            chunks: ['vendor', chunks_js]   // 将entry名称对应的js文件，打包进对应的filename页面中
        }
        const htmlPlugin = new HtmlWebpackPlugin(conf);
        configHtmlPlugins.push(htmlPlugin);
    });
    return configHtmlPlugins;
}

//打包成nginx方便访问的文件，packHtml生成的文件，会在每个路由后面带上斜杆/.
exports.packHtmlToNginx = function () {
    var entryFiles = glob.sync(TEMPLATE_PATH + '/**/index.html');
    const configHtmlPlugins = [];
    entryFiles.forEach((template) => {
        var index = path.dirname(template).replace(/\//g, '_');
        var chunks_js = index.split("template_")[1];
        var filename = chunks_js.replace(/_/g, '\/') + '.html';//打包后的文件路径
        //首页更改为根目录
        if (filename == 'welcome.html') {
            filename = 'index.html';
        }
        const conf = {
            hash: true,
            template: template,
            filename: filename,//打包后的文件名称
            chunks: ['vendor', chunks_js]   // 将entry名称对应的js文件，打包进对应的filename页面中
        }
        const htmlPlugin = new HtmlWebpackPlugin(conf);
        configHtmlPlugins.push(htmlPlugin);
    });
    return configHtmlPlugins;
}

//java
exports.packHtmlToJava = function () {
    var entryFiles = glob.sync(TEMPLATE_JAVA_PATH + '/**/*.pod.html');
    const configHtmlPlugins = [];
    entryFiles.forEach((template) => {
        let chunks = {};
        chunks['vendor.js'] = {
            attr: "crossorigin=\"anonymous\"", // attributes for js file in index chunk
        }
        chunks['index.js'] = {
            attr: "crossorigin=\"anonymous\"" // attributes for js file in index chunk
        }
        chunks['index.css'] = {}
        const conf = {
            template: template,
            filename: 'index3.pod.html',//打包后的文件名称
            chunks: chunks,   // 将entry名称对应的js文件，打包进对应的filename页面中
            templateContent: function(tpl) {
                console.info(tpl);
                // 你可以在这里修改html内容tpl
                // 你也可以在这里使用this.options[用户传入的插件options]
                // 和this.webpackOptions[webpack配置]
                // 打开插件的index.js可以查看都有哪些option提供使用
                return tpl;
            }
        }
        const htmlPlugin = new HtmlResWebpackPlugin(conf);
        configHtmlPlugins.push(htmlPlugin);
    });
    return configHtmlPlugins;
}
