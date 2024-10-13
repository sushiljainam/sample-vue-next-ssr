// File structure:
// 
// /pages
//   index.vue
//   _app.vue
// /content
//   data.json
// /components
//   ClientOnlyComponent.vue
// next.config.js
// package.json

// /pages/index.vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
    <ClientOnlyComponent />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import ClientOnlyComponent from '../components/ClientOnlyComponent.vue'

export default defineComponent({
  components: {
    ClientOnlyComponent
  },
  async asyncData({ $content }) {
    const data = await $content('data').fetch()
    return {
      title: data.title,
      description: data.description
    }
  }
})
</script>

// /pages/_app.vue
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

// /components/ClientOnlyComponent.vue
<template>
  <div>
    <h2>Client-side rendered component</h2>
    <p>Current time: {{ currentTime }}</p>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  setup() {
    const currentTime = ref('')

    onMounted(() => {
      currentTime.value = new Date().toLocaleTimeString()
      setInterval(() => {
        currentTime.value = new Date().toLocaleTimeString()
      }, 1000)
    })

    return {
      currentTime
    }
  }
})
</script>

// /content/data.json
{
  "title": "Welcome to Partial SSR Example",
  "description": "This page demonstrates server-side rendering with client-side components."
}

// next.config.js
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

// package.json
{
  "name": "vue-nextjs-partial-ssr",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "start": "nuxt start"
  },
  "dependencies": {
    "@nuxt/content": "^1.14.0",
    "@nuxtjs/composition-api": "^0.29.3",
    "core-js": "^3.15.1",
    "nuxt": "^2.15.7",
    "vue": "^2.6.14"
  },
  "devDependencies": {
    "@nuxt/types": "^2.15.7",
    "@nuxt/typescript-build": "^2.1.0"
  }
}