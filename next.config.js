const { defineNuxtConfig } = require('@nuxt/bridge')

module.exports = defineNuxtConfig({
  target: 'server',
  ssr: true,
  components: true,
  buildModules: [
    '@nuxtjs/composition-api/module'
  ],
  modules: [
    '@nuxt/content'
  ]
})
