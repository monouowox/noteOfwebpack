module.exports={
    //继承eslint规则
    extends:['eslint:recommended'],
    env:{
        node:true,//启动node中全局变量
        browser:true,//启动浏览器中的全局变量
    },
    parserOptions:{
        ecmaVersion:6,//es6
        sourceType:'module',//es模块化
    },
    rules:{
        'no-var':2//不能使用var定义变量 1是警告程序2是终止程序
    },
    plugins:[
        "import"//动态导入
    ]
}