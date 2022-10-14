const loader = require('css-loader');
const { resolve } = require('path');
const path = require('path');
const webpack = require('webpack');
const childProcess = require('child_process');
const { web } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: './app.js',
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.css$/, // 모든 .css 확장자가 붙은 파일에 적용됨
                use: [
                    process.env.NODE_ENV === 'production'
                        ? MiniCssExtractPlugin.loader
                        : 'style-loader',
                    'css-loader',
                ],
                // style-loader: js 로 모듈화된 css를 브라우저에 불러오기 위한 로더
                // css-loader: css 를 js로 모듈화하기 위한 로더
                // use 배열은 뒤에서 부터 실행된다.
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    // publicPath: './dist/', // 경로 앞에 추가되는 문자열
                    name: '[name].[ext]?[hash]', // 빌드된 파일이 이름.확장자?해시 로 불러와지게 함. 해시는 성능을 위해 자체적으로 수정되는 해시값
                    limit: 20000, //20kb
                },
                // use: ['file-loader'], // 이미지를 불러오기 위한 로더
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new webpack.BannerPlugin({
            // banner: '이것은 배너입니다.',
            banner: `Build Date: ${new Date().toLocaleString()}
            Commit Version: ${childProcess.execSync(
                'git rev-parse --short HEAD'
            )}
            Author: ${childProcess.execSync('git config user.name')}
            `,
        }),
        new webpack.DefinePlugin({
            // TWO: '1+1', 숫자
            TWO: JSON.stringify('1+1'), // 문자 그대로
            'api.domain': JSON.stringify('http://dev/api/domain.com'),
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            templateParameters: {
                env: process.env.NODE_ENV === 'development' ? '(개발용)' : '',
            },
            minify:
                process.env.NODE_ENV === 'production'
                    ? {
                          collapseWhitespace: true, // 빈칸 제거
                          removeComments: true, // 주석 제거
                      }
                    : false,
        }),
        new CleanWebpackPlugin({}),
        ...(process.env.NODE_ENV === 'production'
            ? [
                  new MiniCssExtractPlugin({
                      filename: '[name].css',
                  }),
              ]
            : []),
    ],
};
