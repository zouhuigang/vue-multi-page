###第一次使用WEBPACK


	npm init

一路回车，生成一个package.json



### 安装webpack

	
	npm i webpack --save-dev
	npm i webpack-cli --save-dev

或者

	npm i webpack webpack-cli -D 
	#npm i -D 是 npm install --save-dev 的简写


### 新建index.js

在src目录下新建一个index.js，内容如下：
	
	console.info("hello world");




### 测试webpack:

> node v8.2版本以后都会有一个npx , npx会执行bin里的文件
	
	npx webpack     // 不设置mode的情况下 打包出来的文件自动压缩
	
	npx webpack --mode development  // 设置mode为开发模式，打包后的文件不被压缩


当执行npx webpack命令的时候，webpack会自动查找项目中src目录下的index.js文件，然后进行打包，生成一个dist目录并存在一个打包好的main.js文件


----

# 配置webpack


### 新建webpack.config.js,内容如下：

	module.exports = {
	    entry: '',               // 入口文件
	    output: {},              // 出口文件
	    module: {},              // 处理对应模块
	    plugins: [],             // 对应的插件
	    devServer: {},           // 开发服务器配置
	    mode: 'development'      // 模式配置
	}

### 安装测试环境

	npm i webpack-dev-server -D


### 继续修改webpack.config.js配置

	// webpack.config.js

	const path = require('path');
	
	module.exports = {
	    entry: './src/index.js',    // 入口文件
	    output: {
	        filename: 'bundle.js',      // 打包后的文件名称
	        path: path.resolve('dist')  // 打包后的目录，必须是绝对路径
	    }
	}


上面就可以说是实现了最简单的webpack配置了，那接下来就打包一下看看：

	
	npx webpack 


---


#配置执行文件

配置开发运行环境:

	npm run dev


修改package.jso为:

	  "scripts": {
	    "test": "echo \"Error: no test specified\" && exit 1"
	  },

改为:

	"scripts": {
	    "build": "webpack",
	    "dev":"webpack-dev-server"
	  }


运行一下:

	npm run dev (开发环境)
	npm run build (上线环境)


打开http://localhost:8080/ 会看到代码的目录结构.


---

# 多文件入库


多个入口可以有两种实现方式进行打包:

一种是没有关系的但是要打包到一起去的，可以写一个数组，实现多个文件打包
另一种就是每一个文件都单独打包成一个文件的



#### 1.写成数组的方式就可以打出多入口文件，不过这里打包后的文件都合成了一个

    entry: ['./src/index.js', './src/login.js'],


其中login.js的内容为:

	console.info("login");

执行打包:

	npm run build

2个文件打包生成了一个bundle.js，具体可以查看里面的内容.



#### 2.真正实现多入口和多出口需要写成对象的方式


	 entry: {
        index: './src/index.js',
        login: './src/login.js'
    },
	  output: {
	        // 1. filename: 'bundle.js',
	        // 2. [name]就可以将出口文件名和入口文件名一一对应
	        filename: '[name].js',      // 打包后会生成index.js和login.js文件
	        path: path.resolve('dist')
	    }

执行打包:

	npm run build

在dist目录下生成2个js文件,index.js和login.js

---

# 配置Html模板


> 文件都打包好了，但是我们在使用的时候不能在dist目录下去创建一个html文件，然后去引用打包后的js吧，这不合理，实际开发中也不会这样
我们需要实现html打包功能，可以通过一个模板实现打包出引用好路径的html来


安装:

	npm i html-webpack-plugin -D


然后引用:

	// 插件都是一个类，所以我们命名的时候尽量用大写开头
	let HtmlWebpackPlugin = require('html-webpack-plugin');


##### 单页面


	let path = require('path');
	// 插件都是一个类，所以我们命名的时候尽量用大写开头
	let HtmlWebpackPlugin = require('html-webpack-plugin');
	
	module.exports = {
	    entry: './src/index.js',
	    output: {
	        // 添加hash可以防止文件缓存，每次都会生成4位的hash串
	        filename: 'bundle.[hash:4].js',   
	        path: path.resolve('dist')
	    },
	    plugins: [
	        // 通过new一下这个类来使用插件
	        new HtmlWebpackPlugin({
	            // 用哪个html作为模板
	            // 在src目录下创建一个index.html页面当做模板来用
	            template: './src/index.html',
	            hash: true, // 会在打包好的bundle.js后面加上hash串
	        })
	    ]
	}


在src目录下,新建一个index.html


运行打包:

	npm run build

dist下生成一个新的index.html和bundle.0b77.js:


	<body>
	    主页面
	<script type="text/javascript" src="bundle.0b77.js?0b77b63aa4db991722c8"></script></body>



### 多页面

>如果开发的时候不只一个页面，我们需要配置多页面，那么需要怎么来搞呢？不用担心，html-webpack-plugin插件自有办法，我们来观望一下


新建一个login.html，里面的内容随便写点。


webpack.config.js配置如下:

	let path = require('path');
	let HtmlWebpackPlugin = require('html-webpack-plugin');
	
	module.exports = {
	    // 多页面开发，怎么配置多页面
	    entry: {
	        index: './src/index.js',
	        login: './src/login.js'
	    },
	    // 出口文件  
	    output: {                       
	        filename: '[name].js',
	        path: path.resolve('dist')
	    },
	    plugins: [
	        new HtmlWebpackPlugin({
	            template: './src/index.html',   
	            filename: 'index.html',
	            chunks: ['index']   // 对应关系,index.js对应的是index.html
	        }),
	        new HtmlWebpackPlugin({
	            template: './src/login.html',
	            filename: 'login.html',
	            chunks: ['login']   // 对应关系,login.js对应的是login.html
	        })
	    ]
	}
	

运行打包:

	npm run build

dist目录下生成4个文件,index.html,index.js,login.html,login.js




### 参考文档

https://github.com/zhouyupeng/webpack4.x_demo

https://juejin.im/post/5adea0106fb9a07a9d6ff6de