// 1.入口文件
// 2.把多个文件打包到一块
import count from "./js/count"//3.js文件可以忽略后缀名
import sum from "./js/sum"
// 4.需要webpack打包资源，必须引入该资源
// You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file.
import "./css/index.css"
import "./less/index.less"
import "./sass/index.sass"
import "./sass/index.scss"
import "./stylus/index.styl"
import "./css/iconfont.css"
import {mul} from "./js/math"

let a=1
console.log('a: ', a);
console.log(count(2,1))
console.log(sum(1,2,3,4))
console.log('mul: ', mul(3,3));

// 5.热模替换判断
// 如果浏览器支持热模替换
if(module.hot){
    // 让./js/count模块可以热模替换
    module.hot.accept("./js/count")
    // 让./js/sum模块可以热模替换
    module.hot.accept("./js/sum")
}