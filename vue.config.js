module.exports = {

    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,

        proxy: {
            '/img': {
                target: 'http://cangdu.org:8001', //要访问 后台的 接口地址
                changeOrigin: true, // true --- 开启反向代理
                pathRewrite: {
                    '^/img': '/img/' // 代理 上面 target 的地址.此处不写，为空。
                }
            },
            '/shopping': {
                target: 'http://cangdu.org:8001', //要访问 后台的 接口地址
                changeOrigin: true, // true --- 开启反向代理
                pathRewrite: {
                    '^/shopping': '/shopping/' // 代理 上面 target 的地址.此处不写，为空。
                }
            },
            '/ugc': {
                target: 'http://cangdu.org:8001', //要访问 后台的 接口地址
                changeOrigin: true, // true --- 开启反向代理
                pathRewrite: {
                    '^/ugc': '/ugc/' // 代理 上面 target 的地址.此处不写，为空。
                }
            },
            '/v1': {
                target: 'http://cangdu.org:8001', //要访问 后台的 接口地址
                changeOrigin: true, // true --- 开启反向代理
                pathRewrite: {
                    '^/v1': '/v1/' // 代理 上面 target 的地址.此处不写，为空。
                }
            },
            '/v2': {
                target: 'http://cangdu.org:8001', //要访问 后台的 接口地址
                changeOrigin: true, // true --- 开启反向代理
                pathRewrite: {
                    '^/v2': '/v2/' // 代理 上面 target 的地址.此处不写，为空。
                }
            },
            '/v3': {
                target: 'http://cangdu.org:8001', //要访问 后台的 接口地址
                changeOrigin: true, // true --- 开启反向代理
                pathRewrite: {
                    '^/v3': '/v3/' // 代理 上面 target 的地址.此处不写，为空。
                }
            },
            '/v4': {
                target: 'http://cangdu.org:8001', //要访问 后台的 接口地址
                changeOrigin: true, // true --- 开启反向代理
                pathRewrite: {
                    '^/v4': '/v4/' // 代理 上面 target 的地址.此处不写，为空。
                }
            },
            '/bos': {
                target: 'http://cangdu.org:8001', //要访问 后台的 接口地址
                changeOrigin: true, // true --- 开启反向代理
                pathRewrite: {
                    '^/bos': '/bos/' // 代理 上面 target 的地址.此处不写，为空。
                }
            },
            '/member': {
                target: 'http://cangdu.org:8001', //要访问 后台的 接口地址
                changeOrigin: true, // true --- 开启反向代理
                pathRewrite: {
                    '^/member': '/member/' // 代理 上面 target 的地址.此处不写，为空。
                }
            },
            '/promotion': {
                target: 'http://cangdu.org:8001', //要访问 后台的 接口地址
                changeOrigin: true, // true --- 开启反向代理
                pathRewrite: {
                    '^/promotion': '/promotion/' // 代理 上面 target 的地址.此处不写，为空。
                }
            },
            '/eus': {
                target: 'http://cangdu.org:8001', //要访问 后台的 接口地址
                changeOrigin: true, // true --- 开启反向代理
                pathRewrite: {
                    '^/eus': '/eus/' // 代理 上面 target 的地址.此处不写，为空。
                }
            },
            '/payapi': {
                target: 'http://cangdu.org:8001', //要访问 后台的 接口地址
                changeOrigin: true, // true --- 开启反向代理
                pathRewrite: {
                    '^/payapi': '/payapi/' // 代理 上面 target 的地址.此处不写，为空。
                }
            }
        }, // 设置代理
        // '/shopping',
        //         '/ugc',
        //         '/v1',
        //         '/v2',
        //         '/v3',
        //         '/v4',
        //         '/bos',
        //         '/member',
        //         '/promotion',
        //         '/eus',
        //         '/payapi',
        //         '/img',
    }
}