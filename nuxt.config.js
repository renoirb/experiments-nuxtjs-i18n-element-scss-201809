import {
  resolve,
} from 'path'
import {
  name, description, browserslist,
} from './package'

const dev = process.env.NODE_ENV !== 'production'

import {
  visualizeConfig,
} from './utils/webpack-debugging'

import VueI18nExtensions from 'vue-i18n-extensions'

const BASE_NUXT = '' // portal' // NO Trailing slash!
const API_PREFIX = BASE_NUXT + '/bff'

/**
 * TODO: Continue review this Nuxt config.
 * https://github.com/wemake-services/wemake-vue-template/blob/master/template/nuxt.config.js
 */
export default {
  mode: 'universal',
  dev,

  head: {
    title: name,
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: description,
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: BASE_NUXT + '/favicon.ico',
      },
    ],
  },

  css: [
    'normalize.css/normalize.css',
    {
      src: '@/assets/styles/index.scss',
      lang: 'scss',
    },
  ],

  // Loaded before mounting the App
  plugins: [
    '@/plugins/main',
    {
      src: '@/plugins/client-side-init',
      ssr: false,
    },
  ],

  modules: [
    [
      '@nuxtjs/axios',
      {
        prefix: API_PREFIX,
      },
    ],
  ],

  axios: {
    // See "Apply defaults" in node_modules/@nuxtjs/axios/lib/module.js
    debug: dev,
    proxy: true,
  },

  proxy: {
    /**
     * See also
     * https://github.com/chimurai/http-proxy-middleware#options
     * https://github.com/nuxt-community/axios-module/blob/dev/lib/module.js#L88
     */
    '/bff/github': {
      target: 'https://api.github.com',
      pathRewrite: {
        '^/bff/github': '',
      },
    },
    '/bff/reqres': {
      target: 'https://reqres.in',
      pathRewrite: {
        '^/bff/reqres': '/api',
      },
    },
  },

  router: {
    base: BASE_NUXT + '/',
    middleware: ['mobile'],
  },

  build: {
    // publicPath: '/frontend/',
    extractCSS: true,
    postcss: {
      /**
       * Adjust compiled CSS to support older User-Agents.
       * https://nuxtjs.org/api/configuration-build/#postcss
       * https://github.com/csstools/postcss-preset-env#features
       * https://github.com/csstools/postcss-preset-env#browsers
       */
      preset: {
        browserslist,
      },
    },
    /**
     * How to handle JavaScript support for server and client bundles[1].
     *
     * server bundle is what runs Server-side.
     * client bundle is what runs on the browser.
     *
     * Nuxt's babel presets defaults to vue-app, and for client bundle,
     * it supports until IE 9[2].
     *
     * What's used under the hood is babel-preset-vue-app [3][4].
     * One could change this by adding a section below similar to [5].
     *
     * [1]: https://new.babeljs.io/docs/en/next/babel-preset-env.html#target-specific-browsers-via-browserslist
     * [2]: https://github.com/nuxt/nuxt.js/issues/3430#issuecomment-417433970
     * [3]: https://github.com/vuejs/babel-preset-vue-app#targets
     * [4]: https://nuxtjs.org/api/configuration-build/#babel
     * [5]: https://github.com/nuxt/nuxt.js/issues/271#issuecomment-370800435
     */
    loaders: {
      imgUrl: {
        /**
         * What goes in url-loader options.
         * #ChangingImgUrl
         * https://github.com/webpack-contrib/url-loader#options
         * https://nuxtjs.org/api/configuration-build/#loaders-in-extend
         * https://nuxtjs.org/api/configuration-build/#loaders
         */
        limit: 101000,
      },
    },
    extend (config, {
      isDev, isClient,
    }) {
      /**
       * Extend build.
       *
       * There are two builds, one for "client", one "server".
       * This part is executed for both cases.
       *
       * See ./node_modules/nuxt/lib/builder/webpack/base.js
       *
       * loaders from context above has, among others, the following keys;
       *
       *  * imgUrl
       *  * file
       *  * fontUrl
       *  * pugPlain
       *  * vue
       *  * css
       *  * cssModules
       *  * scss
       *  * vueStyle
       *  * ...
       *
       * ```
       * loaders[imgUrl] { limit: 101001, name: '[path][name].[ext]' }
       * loaders[vueStyle] { sourceMap: true }
       * ```
       */
      // Object.keys(loaders).forEach(lk => console.log(`loaders[${lk}]`, loaders[lk]))

      /**
       * If one needs to change more than just options in Webpack loader.
       *
       * Following will adjust the same as what we see in imgUrl above. rel=#ChangingImgUrl
       *
       * https://github.com/nuxt/nuxt.js/issues/148#issuecomment-402955923
       * https://vue-svg-loader.js.org/#nuxt.js
       * https://github.com/nuxt/nuxt.js/blob/2.x/examples/custom-build/nuxt.config.js#L13
       */
      config.module.rules.some(loader => {
        if (loader.use) {
          const urlLoaderCheck = use => use.loader === 'url-loader'
          const urlLoader = loader.use.find(urlLoaderCheck)
          if (urlLoader) {
            // Uncomment to see in build output (visualizeConfig) the effect.
            // urlLoader.options.limit = 101001
            return true
          }
        }
      })

      // https://www.npmjs.com/package/vue-ionicons
      config.resolve.alias['~ionicons'] = resolve(__dirname, 'node_modules', 'vue-ionicons', 'dist')

      // This line allows us to use `@import "~/styles/..."` in components <style> tags:
      config.resolve.alias['/styles'] = resolve(__dirname, 'assets', 'styles')

      if (isDev && isClient) {
        // Run ESLint on save
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }

      config.module.rules.push({
        resourceQuery: /blockType=i18n/,
        loader: '@kazupon/vue-i18n-loader',
      })

      if (dev) {
        visualizeConfig(config)
      }
    },
  },

  render: {
    // see Nuxt.js docs: https://nuxtjs.org/api/configuration-render#bundleRenderer
    bundleRenderer: {
      directives: {
        t: VueI18nExtensions.directive,
      },
    },
  },
}
