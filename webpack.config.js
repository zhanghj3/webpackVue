const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const autoprefixer = require('autoprefixer');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

// 判断启动脚本是用的development（开发）还是production（生产）
const isDev = process.env.NODE_ENV === 'development'
const config = {
    //入口文件
    entry: {
        main: './main.js',
    },
    //打包之后输出的文件位置和文件名，，注意__dirname代表当前路径，是两个下划线
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].[khash:8].bundle.js"
    },
    //环境，development：开发环境
    mode: 'development',
    resolve: {
        //配置目录别名
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@assets': path.resolve('./src/assets'),
            '@templates': path.resolve('./src/templates'),
            '@utils': path.resolve('./src/utils'),
            '@components': path.resolve('./src/components'),
        },
        //配置文件扩展名，这样引入的时候后面就不用加.vue、.js等后缀名了
        extensions: ['*', '.js', '.vue', '.json']
    },
    module: {
        // 验证规则：比如.js结尾的文件用‘babel-loader’去进行加载
        // test后面的是正则表达式，/\.js$/指的是以.js结尾的文件
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [autoprefixer(['last 2 version', '> 1%', 'not ie < 11'])]
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        // 当小于3k的时候，会直接将图片转换成base64,减少请求
                        limit: 3 * 1024,
                        // 比如原来图片叫bg.jpg,打包后就会在dist文件夹下面生成bg-aaa.jpg
                        name: '[name]-aaa.[ext]'
                    }
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            }
            // ,
            // {
            //     // sourceMap: true 的作用是：使用stylus-loader,会生成sourceMap,postcss-loader
            //     // 就可以直接使用已经生成的sourceMap,不需要重新生成sourceMap,提高了效率
            //     test: /\.styl$/,
            //     use: [
            //         'style-loader',
            //         'css-loader',
            //         {
            //             loader: 'postcss-loader',
            //             options: {
            //                 sourceMap: true
            //             }
            //         },
            //         'stylus-loader'
            //     ]
            // }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        // HtmlWebpackPlugin,这个是必须的，有这个才可以指定入口html
        new HtmlWebpackPlugin({
            //引用的模板文件路径
            template: './public/index.html',
            filename: 'index.html'
        }),
        // 可以在其他地方使用 process.env.NODE_ENV 获取
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        })
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                //是否缓存
                cache: true,
                //是否定位源文件的代码
                sourceMap: true,
                terserOptions: {
                    comments: false,
                    //打包的时候不打包用不到的、console.log的、debug调试的、死代码等代码
                    compress: {
                        unused: true,
                        drop_console: true,
                        drop_debugger: true,
                        dead_code: true
                    }
                },
                //是否多进程并行压缩代码
                parallel: true,
            })
        ]
    }

}

// webpack2才可以用devServer
if (isDev) {
    // devtool 使用这个方便在浏览器调试
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
        port: 3000,
        host: '0.0.0.0', //写0.0.0.0的好处是可以同时用localhost和127.0.0.1还有自己的ip来访问
        overlay: {
            errors: true //overlay的作用是将错误显示在网页上面，方便开发
        },
        // 修改vue代码的时候，页面不刷新,需要配合下面HotModuleReplacementPlugin的插件
        // 缺点：如果使用热加载，那子组件修改页面修改东西页面也不会重新加载，还是不用的好
        hot: true
    }
    config.plugins.push(
        // 加上这个会好一点，具体的以后再研究
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}
module.exports = config