<template>
    <div>
        <h1>Welcome to My Blog</h1>
        <ul>
            <li v-for="post in posts" :key="post.slug">
                <nuxt-link :to="`/blog/${post.slug}`">{{ post.title }}</nuxt-link>
            </li>
        </ul>
    </div>
</template>
  
  <script>
export default {
    async asyncData({ $content }) {
        const posts = await $content('posts').fetch()
        return { posts }
    }
}
</script>