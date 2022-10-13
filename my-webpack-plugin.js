class MyWebPackPlugin {
    apply(compiler) {
        // compiler.hooks.done.top('My Plugin', stats => {
        //     console.log('MyPlugin: done'); // 플러그인이 완료됐을 때 발생하는 콜백함수
        // })

        compiler.plugin('emit', (compilation, callback) => {
            const source = compilation.assets['main.js'].source(); // 웹팩이 번들링한 결과에 접근
            compilation.assets['main.js'].source = () => {
                // 번들한 결과물에 내용 추가
                const banner = [
                    '/**',
                    ' * 이것은 BannerPlugin 이 처리한 결과입니다.',
                    ' * Build Date: 2019-10-10',
                    ' */',
                ].join('/n');
                return banner + '\n\n' + source;
            };

            callback();
        });
    }
}

module.exports = MyWebPackPlugin;
