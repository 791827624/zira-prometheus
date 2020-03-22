module.exports = {
    // cli3 代理是从指定的target后面开始匹配的，不是任意位置；配置pathRewrite可以做替换
    devServer: {
        proxy: {
            '/': {
                target: 'http://101.132.169.36:9090',

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