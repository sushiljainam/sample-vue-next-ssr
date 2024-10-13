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
  