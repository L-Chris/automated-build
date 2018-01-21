module.exports = {
  router: {
    middleware: 'auth'
  },
  head: {
    title: 'nuxt-element-demo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js + element-ui DEMO' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  build: {
    vendor: [
      'element-ui', 'axios'
    ],
    babel: {
      plugins: [
        ['component', [{
          libraryName: 'element-ui',
          styleLibraryName: 'theme-chalk'
        }]],
        'transform-decorators-legacy'
      ]
    },
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 1000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 1000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ],
    postcss: [
      require('autoprefixer')({
        browsers: ['last 3 versions']
      })
    ]
  },
  env: {
    HOST_URL: process.env.HOST_URL || 'http://127.0.0.1:3000'
  },
  loading: { color: '#3B8070' },
  css: [
    'element-ui/lib/theme-chalk/index.css',
    { src: '~assets/css/index.scss', lang: 'scss' },
    { src: '~assets/css/reset.scss', lang: 'scss' }
  ],
  plugins: [
    '~plugins/element-ui'
  ]
}