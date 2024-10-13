<template>
    <div>
        <BlogPost :post="post" />
        <Comments />
    </div>
</template>

<script>
export default {
    async asyncData({ $content, params }) {
        const post = await $content('posts', params.slug).fetch()
        return { post }
    }
}
</script>