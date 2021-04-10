module.exports = {
    publicPath: './',
    outputDir: 'docs',
    lintOnSave: true,
    runtimeCompiler: false,
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = '大声朗读'
                return args
            })
    },
    configureWebpack: () => {},
    devServer: {
        // 略...
    },
    css: {
        loaderOptions: {
            less: {
            lessOptions: {
                // If you are using less-loader@5 please spread the lessOptions to options directly
                modifyVars: {
                'primary-color': '#666',
                'switch-color': '#666',
                'switch-shadow-color': 'rgba(0,0,0,0.1)',

                'link-color': '#ccc',
                // 'border-radius-base': '4px',
                'slider-handle-background-color': '#ccc',
                'slider-rail-background-color': '#eee',
                'select-item-selected-bg': '#ccc'
                },
                javascriptEnabled: true,
            },
            },
        },
    },
    pwa: {
        name: '大声朗读',
        themeColor: '#666',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'default',
        manifestPath: './manifest.webmanifest',
        // configure the workbox plugin
        workboxPluginMode: 'InjectManifest',
        // workboxPluginMode: 'GenerateSW',
        workboxOptions: {
        // swSrc is required in InjectManifest mode.
        // swSrc: 'src/service-worker.js',
        swSrc: 'src/sw.js',
        // navigateFallback: '/index.html',
        // runtimeCaching: [
        //     {
        //     urlPattern: new RegExp('^https://guozhigq.io'),
        //     handler: 'networkFirst',
        //     options: {
        //         networkTimeoutSeconds: 20,
        //         cacheName: 'api-cache',
        //         cacheableResponse: {
        //         statuses: [0, 200]
        //         }
        //     }
        //     }
        // ]
        // ...other Workbox options...
        }
    }
    // ......
};