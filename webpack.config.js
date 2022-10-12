const { resolve } = require('path');
const path = require('path');

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
                test: /\.js$/, // 모든 .js 확장자가 붙은 파일에 적용됨
                use: [path.resolve('./my-webpack-loader.js')],
            },
        ],
    },
};
