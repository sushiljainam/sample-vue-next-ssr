// File structure:
// 
// /pages
//   index.vue
//   posts/[slug].vue
//   _app.vue
// /content
//   posts/
//     post1.json
//     post2.json
//     post3.json
// /components
//   ClientOnlyComments.vue
// nuxt.config.js
// package.json

// /pages/index.vue
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

// /pages/posts/[slug].vue
<template>
  <div>
    <h1>{{ post.title }}</h1>
    <p>{{ post.date }}</p>
    <div v-html="post.content"></div>
    <ClientOnlyComments :post-id="post.slug" />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import ClientOnlyComments from '~/components/ClientOnlyComments.vue'

export default defineComponent({
  components: {
    ClientOnlyComments
  },
  async asyncData({ $content, params }) {
    const post = await $content('posts', params.slug).fetch()
    return { post }
  }
})
</script>

// /components/ClientOnlyComments.vue
<template>
  <div>
    <h3>Comments</h3>
    <ul>
      <li v-for="comment in comments" :key="comment.id">
        {{ comment.text }}
      </li>
    </ul>
    <form @submit.prevent="addComment">
      <input v-model="newComment" placeholder="Add a comment" />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api'

export default defineComponent({
  props: ['postId'],
  setup(props) {
    const comments = ref([])
    const newComment = ref('')

    onMounted(() => {
      // Simulating API call to fetch comments
      comments.value = [
        { id: 1, text: 'Great post!' },
        { id: 2, text: 'Thanks for sharing.' }
      ]
    })

    const addComment = () => {
      if (newComment.value.trim()) {
        comments.value.push({
          id: comments.value.length + 1,
          text: newComment.value
        })
        newComment.value = ''
      }
    }

    return {
      comments,
      newComment,
      addComment
    }
  }
})
</script>

// /content/posts/post1.json
{
  "title": "My First Blog Post",
  "slug": "my-first-blog-post",
  "date": "2023-06-01",
  "content": "<p>This is the content of my first blog post.</p>"
}

// /content/posts/post2.json
{
  "title": "My Second Blog Post",
  "slug": "my-second-blog-post",
  "date": "2023-06-15",
  "content": "<p>This is the content of my second blog post.</p>"
}

// nuxt.config.js
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

// package.json
{
  "name": "vue-nextjs-blog-ssr",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "start": "nuxt start",
    "generate": "nuxt generate"
  },
  "dependencies": {
    "@nuxt/content": "^1.14.0",
    "@nuxtjs/composition-api": "^0.29.3",
    "nuxt": "^2.15.7",
    "vue": "^2.6.14"
  },
  "devDependencies": {
    "@nuxt/types": "^2.15.7",
    "@nuxt/typescript-build": "^2.1.0"
  }
}