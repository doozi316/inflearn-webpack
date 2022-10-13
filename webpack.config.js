const loader = require('css-loader');
const { resolve } = require('path');
const path = require('path');
const MyWebPackPlugin = require('./my-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/app.js',
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.css$/, // 모든 .css 확장자가 붙은 파일에 적용됨
                use: ['style-loader', 'css-loader'],
                // style-loader: js 로 모듈화된 css를 브라우저에 불러오기 위한 로더
                // css-loader: css 를 js로 모듈화하기 위한 로더
                // use 배열은 뒤에서 부터 실행된다.
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    publicPath: './dist/', // 경로 앞에 추가되는 문자열
                    name: '[name].[ext]?[hash]', // 빌드된 파일이 이름.확장자?해시 로 불러와지게 함. 해시는 성능을 위해 자체적으로 수정되는 해시값
                    limit: 20000, //20kb
                },
                // use: ['file-loader'], // 이미지를 불러오기 위한 로더
            },
        ],
    },
    plugins: [
        new MyWebPackPlugin()
    ]
};
