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