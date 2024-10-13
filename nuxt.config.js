export default {
    target: 'server',
    ssr: true,
    components: true,

    modules: [
        '@nuxt/image',
        '@nuxt/content'
    ],

    plugins: [
        '~/plugins/contentLoader.js'
    ],

    build: {
        transpile: ['vue-instantsearch', 'instantsearch.js/es'],
    },

    compatibilityDate: '2024-10-13'
};