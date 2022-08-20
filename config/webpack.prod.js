const os = require('os')//用来获取计算机的cpu核数
const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require('terser-webpack-plugin')//引入内置模块

const cores = os.cpus().length//计算机CPU核数
module.exports = {
    // 入口
    // 使用相对路径
    entry: './src/main.js',
    // 输出
    output: {
        // 所有文件的输出路径
        // 使用绝对路径
        path: path.resolve(__dirname, '../dist'),
        // js输出文件名
        filename: 'static/js/[name].js',
        chunkFilename:'static/js/chumk/[name].js',
        // assetMouduleFilename:'static/media/[hash:4][ext][query]',
        clean: true//自动清空上次打包好的内容
    },
    // loader
    module: {
        rules: [
            {
                oneOf: [//一个文件进来，有一个loader去处理了，就不去遍历其它loader去处理该文件了
                    {
                        test: /\.css$/,//css文件
                        use: [
                            // 'style-loader',//js文件中创建style标签到html中
                            MiniCssExtractPlugin.loader,
                            'css-loader',//编译css文件到js文件中
                            {
                                loader: "postcss-loader",//样式兼容性处理
                                options: {
                                    postcssOptions: {
                                        plugins: [
                                            [
                                                "postcss-preset-env",
                                                {
                                                    // Options
                                                },
                                            ],
                                        ],
                                    },
                                },
                            },
                        ]//使用loader处理，处理顺序从右到左或者从下到上
                    },
                    {
                        test: /\.less$/,//less文件
                        use: [//use可以使用多个loader loader只能使用一个loader
                            {
                                // loader: "style-loader" // creates style nodes from JS strings
                                loader: MiniCssExtractPlugin.loader//提取css为单独文件
                            },
                            {
                                loader: "css-loader" // translates CSS into CommonJS
                            },
                            {
                                loader: "postcss-loader",//样式兼容性处理
                                options: {
                                    postcssOptions: {
                                        plugins: [
                                            [
                                                "postcss-preset-env",
                                                {
                                                    // Options
                                                },
                                            ],
                                        ],
                                    },
                                },
                            },
                            {
                                loader: "less-loader" // compiles Less to CSS
                            }
                        ]
                    },
                    {
                        test: /\.s[ac]ss$/,//sass文件或者scss文件
                        use: [//use可以使用多个loader loader只能使用一个loader
                            {
                                // loader: "style-loader" // creates style nodes from JS strings
                                loader: MiniCssExtractPlugin.loader//提取css为单独文件
                            },
                            {
                                loader: "css-loader" // translates CSS into CommonJS
                            },
                            {
                                loader: "postcss-loader",//样式兼容性处理
                                options: {
                                    postcssOptions: {
                                        plugins: [
                                            [
                                                "postcss-preset-env",
                                                {
                                                    // Options
                                                },
                                            ],
                                        ],
                                    },
                                },
                            },
                            {
                                loader: "sass-loader" // compiles sass to CSS
                            }
                        ]
                    },
                    {
                        test: /\.styl$/,//styl文件或者scss文件
                        use: [//use可以使用多个loader loader只能使用一个loader
                            {
                                // loader: "style-loader" // creates style nodes from JS strings
                                loader: MiniCssExtractPlugin.loader//提取css为单独文件
                            },
                            {
                                loader: "css-loader" // translates CSS into CommonJS
                            },
                            {
                                loader: "postcss-loader",//样式兼容性处理
                                options: {
                                    postcssOptions: {
                                        plugins: [
                                            [
                                                "postcss-preset-env",
                                                {
                                                    // Options
                                                },
                                            ],
                                        ],
                                    },
                                },
                            },
                            {
                                loader: "stylus-loader" // compiles stylus to CSS
                            }
                        ]
                    },
                    {
                        test: /\.(png|jpe?g|gif|webp|svg)$/,
                        type: 'asset',
                        parser: {
                            dataUrlCondition: {
                                maxSize: 8 * 1024 // 8kb 小于8kb的图片会转base64
                            }
                        },
                        generator: {
                            // filename: 'static/images/[hash][ext][query]'//[hash做文件名][ext之前文件扩展名是什么就是什么][query请求时的查询参数]
                            //为了文件名短一些改hash
                            filename: 'static/images/[hash:4][ext][query]'//[hash做文件名][ext之前文件扩展名是什么就是什么][query请求时的查询参数]
                        }
                    },
                    {
                        test: /\.(ttf|woff2?|map4|avi)$/,//ttf|woff2|map4|avi文件
                        type: 'asset/resource',//使用asset下的resource，就是字体不用转base64,原封不动的照搬就是了
                        generator: {
                            // filename: 'static/images/[hash][ext][query]'//[hash做文件名][ext之前文件扩展名是什么就是什么][query请求时的查询参数]
                            //为了文件名短一些改hash
                            filename: 'static/media/[hash:4][ext][query]'//[hash做文件名][ext之前文件扩展名是什么就是什么][query请求时的查询参数]
                        }
                    },
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,//排除node_modules文件，因为这些已经被处理过了
                        use: [
                            {
                                loader: 'thread-loader',
                                options: {
                                    works: cores//使用进程数
                                }
                            },
                            {
                                loader: 'babel-loader',
                                options: {//配置项写在bable.config.js中
                                    // presets: ['@babel/preset-env']
                                    cacheDirectory: true,//开启babel检查缓存
                                    cacheCompression: false,//关闭缓存文件的压缩
                                    plugins: ['@babel/plugin-transform-runtime'],//减少babel体积
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    },
    // plugin
    // 插件需要引入才能调用
    plugins: [
        new ESLintPlugin({
            //检查哪个文件
            context: path.resolve(__dirname, '../src'),
            cache: true,//开启缓存
            cacheLocation: path.resolve(__dirname, '../node_modules/.cache/eslint-plugin/eslintcache.json'),
            threads: cores
        }),
        new HtmlWebpackPlugin({
            // 以public/index.html为模板创建index.html文件，特点：1.结构和public/index.html一致 2.自动引入打包资源
            template: path.resolve(__dirname, '../public/index.html')
        }),
        new MiniCssExtractPlugin({//css打包成单独文件
            filename: 'static/css/[name].css',
            chunkFilename:'static/css/chunk/[name].css'
        }),
        new CssMinimizerPlugin(),//css打包成单独文件进行压缩
        new TerserWebpackPlugin({//这个内置的压缩js的模块再这里写，是想给它弄个多进程去压缩代码
            parallel: cores//使用多进程数
        }),
    ],
    // devServer:{//开个服务器
    //     host:'localhost',
    //     port:'3000',
    //     open:true//是否自动打开浏览器
    // },
    // mode
    devtool: 'source-map',
    mode: 'production'
}