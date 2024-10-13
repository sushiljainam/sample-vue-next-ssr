export default {
    target: 'static',
    components: true,
    modules: [
        '@nuxt/content'
    ],
    content: {
        // Options
    },
    generate: {
        async routes() {
            const { $content } = require('@nuxt/content')
            const files = await $content('posts').only(['slug']).fetch()
            return files.map(file => `/posts/${file.slug}`)
        }
    }
}
