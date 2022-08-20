const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports = {
    //多入口文件
    entry: {
        app: './src/app.js',
        main: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        //[name].js是webpack的命名方式，是使用模板文件名
        filename: '[name].js',
        chunkFilename:"static/js/[name].js",
        clean:true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public/index.html")
        })
    ],
    mode: 'production',
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                // defaultVendors: {
                //     test: /[\\/]node_modules[\\/]/,
                //     priority: -10,
                //     reuseExistingChunk: true,
                // },
                default: {
                    minSize:0,
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },
}