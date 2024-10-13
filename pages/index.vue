<template>
    <div>
        <h1>My Blog</h1>
        <ul>
            <li v-for="post in posts" :key="post.slug">
                <NuxtLink :to="`/posts/${post.slug}`">{{ post.title }}</NuxtLink>
            </li>
        </ul>
    </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
    async asyncData({ $content }) {
        const posts = await $content('posts').only(['title', 'slug']).fetch()
        return { posts }
  }
})
</script>
