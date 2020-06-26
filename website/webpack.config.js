const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackDevServer = require('webpack-dev-server')

const htmlPlugin = [
    new HtmlWebpackPlugin({
        filename: 'test/index.html',
        template: path.join(__dirname, './src/test/index.html'),
        chunks: ["test"]
    }),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(__dirname, './src/main/index.html'),
        chunks: ["main", "favicon"]
    }),
    new HtmlWebpackPlugin({
        filename: 'home/index.html',
        template: path.join(__dirname, './src/home/index.html'),
        chunks: ["home"]
    }),
    new HtmlWebpackPlugin({
        filename: 'articles/article_list/index.html',
        template: path.join(__dirname, './src/articles/article_list/index.html'),
        chunks: ["article_list"]
    }),
    new HtmlWebpackPlugin({
        filename: 'articles/article/index.html',
        template: path.join(__dirname, './src/articles/article/index.html'),
        chunks: ["article"]
    }),
    new HtmlWebpackPlugin({
        filename: 'articles/editor/index.html',
        template: path.join(__dirname, './src/articles/editor/index.html'),
        chunks: ["editor"]
    }),
    new HtmlWebpackPlugin({
        filename: 'sign-in/index.html',
        template: path.join(__dirname, './src/sign-in/index.html'),
        chunks: ["signin"]
    }),
    new HtmlWebpackPlugin({
        filename: 'tools/index.html',
        template: path.join(__dirname, './src/tools/index.html'),
        chunks: ["tools"]
    })
]

module.exports = {
    mode: "development",
    entry: {
        favicon: './src/favicon/favicon.js',
        test: './src/test/test.js',
        main: './src/main/index.js',
        home: './src/home/home.js',
        article_list: './src/articles/article_list/article_list.js',
        article: './src/articles/article/article.js',
        editor: './src/articles/editor/editor.js',
        signin: './src/sign-in/sign-in.js',
        tools: './src/tools/tools.js'
    },
    output: {
        filename: 'js/[name].js',
        path: __dirname + '/dist'
    },
    plugins: htmlPlugin,
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /src\/favicon/,
                loader: 'file-loader',
                exclude: /\.js$/,
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.ttf|woff|woff2|eot|sev$/,
                use: 'url-loader'
            },
            {
                test: /\.png|jpg|gif|svg$/,
                loader: 'file-loader',
                exclude: /src\/favicon/,
                options: {
                    name: '[path][name].[ext]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@': path.join(__dirname, './src')
        }
    },
    devServer: {
        host: '0.0.0.0'
    }
}
