<template>
    <div>
        <h2>Comments</h2>
        <!-- This component will be client-side rendered -->
        <div v-if="comments.length">
            <ul>
                <li v-for="comment in comments" :key="comment.id">
                    {{ comment.text }}
                </li>
            </ul>
        </div>
        <form @submit.prevent="addComment">
            <textarea v-model="newComment"></textarea>
            <button type="submit">Add Comment</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            comments: [],
            newComment: ''
        }
    },
    methods: {
        addComment() {
            if (this.newComment.trim()) {
                this.comments.push({ id: Date.now(), text: this.newComment })
                this.newComment = ''
            }
        }
    }
}
</script>