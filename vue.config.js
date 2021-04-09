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
    pwa: {
        name: '大声朗读',
        themeColor: '#4DBA87',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'default',
        manifestPath: './public/manifest.json',
        // configure the workbox plugin
        workboxPluginMode: 'InjectManifest',
        // workboxPluginMode: 'GenerateSW',
        workboxOptions: {
        // swSrc is required in InjectManifest mode.
        swSrc: 'src/service-worker.js',
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