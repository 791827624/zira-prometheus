module.exports = {
    // cli3 代理是从指定的target后面开始匹配的，不是任意位置；配置pathRewrite可以做替换
    publicPath:'./',
    devServer: {
        port:8081,
        overlay: { //通过设置让浏览器 overlay 同时显示警告和错误
            warnings: true,
            errors: true
        },
        proxy: {
            './': {
                target: 'http://localhost:9090',
                changeOrigin: true,
                secure: false,
                /*pathRewrite: { }*/
            }
        }
    },
    css: {
        loaderOptions: { // 向 CSS 相关的 loader 传递选项
            less: {
                javascriptEnabled: true
            }
        }
    }
};