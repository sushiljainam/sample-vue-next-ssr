<template>
    <article>
        <h1>{{ post.title }}</h1>
        <p>{{ post.date }}</p>
        <div v-html="post.content"></div>
    </article>
</template>

<script>
export default {
    props: ['post']
}
</script>