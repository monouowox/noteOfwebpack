# 1.生成包描述文件 package.json
# npm init -y

# package.json 文件 
{
  "name": "node_test",
  "version": "1.0.0",
  "description": "",
  # 2.指定入口文件目录
  "main": "./src/main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

# 3.安装webpack和webpack-cli在局部
# npm i webpack webpack-cli -D

# 4.npx 可以把node_modules下的.bin临时添加为电脑系统的环境变量，就可以访问.bin下面的cmd了

# 5.打包命令
# npx webpack ./src/main.js --mode=development （入口文件为./src/main.js 模式是开发模式）
# npx webpack ./src/main.js --mode=production （入口文件为./src/main.js 模式是开发模式）

### 6.已上是处理浏览器不识别import 后面会学习处理浏览器不识别其他资源

# 7.webpack的5大概念 
(1) 入口
(2) mode
(3) loader
(4) plugins
(5) 出口

# 8.webpack 的配置文件 写在根目录下 文件名叫webpack.config.js
# webpack 的配置文件用来配置webpack的5大核心概念

# 9.所有配置文件都是运行在node环境下所以模块化使用commonjs模块化

# 10.打包命令(写了webpack.config.js配置文件)
# npx webpack

# 11.开发模式（写代码时的模式）和生产模式（上线的模式）

# 12.处理css、less、sass、scss、styl样式资源

# 13.配置属性在 webpack中文文档 中查找

# 14.Module not found: Error: Can't resolve 'style-loader' in 'C:\Users\hw\Desktop\node_test'这个包没下载的意思，管网的通病：npm install --save-dev css-loader 只叫安装cssloader了，你就用了几个包下载几个包。

# 15.常用步骤：下载依赖，配置配置文件

# 16.处理图片资源(不处理会原封不动的复制)
# base64就是图片转成字符串，从而减少请求，字符串的大小可能会大于图片的大小，base64一般用于小图

# 17.打包后 js去js目录，css去css目录

# 18.处理字体图标资源

# 19.eslint语法（js|jsx）检查工具
eslint是facebook收购的，react是facebook收购的
ERROR in [eslint] No ESLint configuration found in C:\Users\hw\Desktop\node_test\src.
# 需要创建eslint的配置文件

# 20. .eslintignore配置文件给vscode中eslint插件使用，忽略检查哪个文件

# 21. bable 把es6转成es5，更好的兼容浏览器
# 配置文件名babel.config.js
# preset预设就是balel添加一些插件

# 22.处理index.html，使得文件自动引入打包后的文件

# 23.让改动源代码后自动打包----使用devServer
#  npm i webpack-dev-server -D
  devServer:{//开个服务器
        host:'localhost',
        port:'3000',
        open:true//是否自动打开浏览器
    },
# 打包指令npx webpack加个serve 变成npx webpack serve，不加启动不了服务器
# 这个指令只会输出在内存中，所以dist文件中会没有文件，应为dist是在硬盘中

# 24.配置文件一分为二，一个做开发模式，一个做生产模式。
# 相对路径不需要改，因为node在哪运行，就相对在哪，绝对路径需要回退
# 打包指令指定配置文件在哪npx webpack serve --config ./config/webpack.dev.js
# 打包指令指定配置文件在哪npx webpack --config ./config/webpack.prod.js

# 25.在package.json中简化24的指令
 "scripts": {
    "dev": "npx webpack serve --config ./config/webpack.dev.js"//配置指令可省略npx，不省也行
    "dev": "webpack serve --config ./config/webpack.dev.js"
    "start":"npm run dev"//给开发模式再次配置,除了start不需要run其他的指令都需要run
    "build": "webpack --config ./config/webpack.prod.js"
  },

# 26.使用style-loder会把css文件打包到js中由js创建style标签插入到index.html中如果网络不好可能会出现闪屏显现
# 使用mini-css-extract-plugin替换style-loader 把css文件打包到css文件中，index.html文件通过link标签引入就不会有闪屏现象

# 27.css 样式兼容性处理，需要在package.json文件中告知样式兼容性处理做到什么程度
# postcss-loader
# 位置放在css-loader的后面
# npm install --save-dev postcss-loader postcss postcss-preset-env
 "browserslist":[
    "ie >=8"
  ]//浏览器的兼容性处理做ie8以上

  "browserslist":[
    "last 2 version",//最新的两个版本
    "> 1%",//99%的浏览器
    "not dead"//不要死掉的浏览器
  ]//三个条件取的是交集

  # 28.css打包后的文件压缩，html和js是默认会被压缩的
  # new CssMinimizerPlugin()//css打包成单独文件进行压缩

  # ###----------webpack优化，也是webpack高级
  使得具有良好的开发体验
  提升打包构建速度
  减少代码体积
  优化代码运行性能

  # 29.源代码映射sourceMap
  Uncaught TypeError: args.reduce(...) is not a function     main.js:398
  # 控制台报错会报打包后的代码错误位置，但打包后的代码的位置大概率不和源代码位置相同，所以需要源代码映射来映射源代码错误位置
  # 开发模式使用cheap-module-source-map 只关心行
  # 生产模式使用soure-map既关心行也关心列

  # 30.打包速度提升
  # hotModuleReplacement
  # 原先webpack打包呢是改了所有内容全部重新打包一遍，使用这个过后，哪个模块改了就使用哪个模块
  # 在webpack5，成为了默认配置，但是js需要做热模替换判断

  # 31.oneOf 
  # 配置去处理文件时，假设处理js文件，就会从第一个cssloader遍历到最后一个loader，假设处理css文件，就会遇到第一个cssloader后不停下来继续往下遍历loader，但一般一个文件只用一个loader处理就好了

  # 32.include和exclude
  # 开发的时候会下载很多依赖，include是处理哪些文件，exclude是排除哪些文件
  # include和exclude只能同一个loader配置中只能写一个

  # 33.每次打包时js文件都要经过eslint检查和babel编译，速度比较慢
  # 我们可以缓存之前eslint和bablel检查的结果，这样第二次打包时速度就更快了
  # 缓存的文件会放在node_modules/cache/babel-loader

  # 34.terser是内置的，压缩js的

  # 35.多进程打包  多进程：计算机每个进程开启的时间大概是600ms左右，所以使用的额外进程一般用在特别耗时的资源处理中
  # eslint babel terser 单线程就比较慢
  # npm install --save-dev thread-loader

  # 36.减少代码体积，tree Shaking,对es6模块化的内容没有使用到的代码进行移除
  # 生产模式自动开启

  # 37.本地图片压缩
  # 无损压缩和有损压缩
  # npm install image-minimizer-webpack-plugin imagemin --save-dev
  # 无损压缩npm install imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo --save-dev
  # 暂未弄好

  # 38.code split
  # 打包后的js是统一放在main.js中，但不想这样，想分成多个js文件，要用哪部分js代码就用哪个js文件

  # 39.preload和peafetch
  # 让浏览器加载资源进行缓存，并不执行这些资源
  # preload优先级高于preafetch,preaload是浏览器立即加载，preafetch是浏览器空闲时加载
  # preload只会加载当前页面资源，prefetch下一个页面所需资源也可以加载




  

