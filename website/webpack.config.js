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
        filename: 'articles/article-list/index.html',
        template: path.join(__dirname, './src/articles/article-list/index.html'),
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
        chunks: ["sign_in"]
    }),
    new HtmlWebpackPlugin({
        filename: 'tools/index.html',
        template: path.join(__dirname, './src/tools/index.html'),
        chunks: ["tools"]
    }),
    new HtmlWebpackPlugin({
        filename: 'about-me/index.html',
        template: path.join(__dirname, './src/about-me/index.html'),
        chunks: ["about_me"]
    }),
    new HtmlWebpackPlugin({
        filename: 'neighbor/index.html',
        template: path.join(__dirname, './src/neighbor/index.html'),
        chunks: ["neighbor"]
    }),
    new HtmlWebpackPlugin({
        filename: 'music/index.html',
        template: path.join(__dirname, './src/music/index.html'),
        chunks: ["music"]
    })
]

module.exports = {
    mode: "development",
    entry: {
        favicon: './src/favicon/favicon.js',
        test: './src/test/test.js',
        main: './src/main/index.js',
        home: './src/home/home.js',
        article_list: './src/articles/article-list/article-list.js',
        article: './src/articles/article/article.js',
        editor: './src/articles/editor/editor.js',
        sign_in: './src/sign-in/sign-in.js',
        tools: './src/tools/tools.js',
        about_me: './src/about-me/about-me.js',
        neighbor: './src/neighbor/neighbor.js',
        music: './src/music/music.js'
    },
    output: {
        filename: 'js/[name].js',
        path: __dirname + '/dist'
    },
    plugins: htmlPlugin,
    module: {
        rules: [
            {
                test: /(\.js?|jsx?)$/,
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
                test: /\.png|jpg|gif|svg|pdf$/,
                loader: 'file-loader',
                exclude: /src\/favicon/,
                options: {
                    publicPath: '../',
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
