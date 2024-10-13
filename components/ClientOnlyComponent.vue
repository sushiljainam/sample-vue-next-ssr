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
  