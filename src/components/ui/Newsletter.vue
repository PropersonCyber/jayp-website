<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')

const subscribe = () => {
  if (!email.value) {
    alert('Please enter your email address.')
    return
  }
  alert('Thank you for subscribing! You will receive our latest updates.')
  email.value = ''
}
</script>

<template>
  <section class="py-16 bg-primary">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-2xl lg:text-3xl font-bold text-white mb-4">Stay Updated</h2>
      <p class="text-gray-400 mb-8">Subscribe to our newsletter for industry insights and exclusive offers.</p>
      <form @submit.prevent="subscribe" class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <input 
          v-model="email"
          type="email" 
          placeholder="Enter your email" 
          class="flex-1 px-6 py-4 rounded-full bg-secondary text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
        >
        <button 
          type="submit" 
          class="px-8 py-4 bg-accent text-white rounded-full font-medium hover:bg-accent-hover transition"
        >
          Subscribe
        </button>
      </form>
    </div>
  </section>
</template>
