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
