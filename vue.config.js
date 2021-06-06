// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

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
    
    configureWebpack: () => {
        plugins: [
            // new CleanWebpackPlugin(['docs']),
            // new HtmlWebpackPlugin({   
            //     title: '渐进式网络应用程序'
            // }),
            new WorkboxPlugin.GenerateSW({
                // 这些选项帮助快速启用 ServiceWorkers
                // 不允许遗留任何“旧的” ServiceWorkers
                clientsClaim: true,
                skipWaiting: true
            })
        ]
    },
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
        manifestPath: './public/manifest.json',
        // configure the workbox plugin
        workboxPluginMode: 'InjectManifest',
        // workboxPluginMode: 'GenerateSW',
        workboxOptions: {
        // swSrc is required in InjectManifest mode.
        // swSrc: 'src/service-worker.js',
        swSrc: './src/sw.js',
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