// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@element-plus/nuxt',
        '@nuxt/devtools',
        '@nuxt/image-edge',
        '@nuxtjs/google-fonts',
        '@nuxtjs/i18n',
        '@vueuse/nuxt',
        'nuxt-windicss',
        'nuxt-lodash',
        'nuxt-icon',
        [
            '@pinia/nuxt', {
                autoImports: ['defineStore', 'storeToRefs']
            }
        ]
    ],
    ssr: false,
    i18n: {
        locales: [
            {
                code: 'en',
                file: 'en-US.ts'
            },
            {
                code: 'vi',
                file: 'vi-VN.ts'
            }
        ],
        lazy: true,
        langDir: 'locales',
        defaultLocale: 'vi',
        vueI18n: {
            fallbackLocale: 'vi'
        }
    },
    image: {
        dir: 'assets/images'
    },
    imports: {
        dirs: ['stores']
    },
    app: {
        pageTransition: {
            name: 'page',
            mode: 'out-in'
        }
    },
    googleFonts: {
        prefetch: true,
        preconnect: true,
        families: {
            'IBM Plex Sans': [100, 200, 300, 400, 500, 600, 700, 800, 900]
        }
    },
    components: [
        {
            path: '~/components',
            pathPrefix: false
        }
    ],
    lodash: {
        prefix: '_',
        prefixSkip: ['string'],
        upperAfterPrefix: false
    },
    runtimeConfig: {
        public: {
            apiBase: process.env.NUXT_PUBLIC_API_BASE
        }
    }
})
