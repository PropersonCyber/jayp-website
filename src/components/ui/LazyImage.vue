<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Props {
  src: string
  alt: string
  className?: string
  aspectRatio?: string
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  aspectRatio: '16/9'
})

const isLoaded = ref(false)
const hasError = ref(false)
const fallbackSrc = ref('')

const generateFallback = () => {
  const seed = Math.random().toString(36).substring(7)
  fallbackSrc.value = `https://picsum.photos/seed/${seed}/800/600`
}

onMounted(() => {
  const img = new Image()
  img.onload = () => {
    isLoaded.value = true
  }
  img.onerror = () => {
    hasError.value = true
    generateFallback()
  }
  img.src = props.src
})

const currentSrc = computed(() => {
  if (hasError.value) {
    return fallbackSrc.value
  }
  return props.src
})
</script>

<template>
  <div :class="['relative overflow-hidden bg-gray-100', className]" :style="{ aspectRatio }">
    <img 
      v-if="isLoaded || hasError"
      :src="currentSrc"
      :alt="alt"
      class="w-full h-full object-cover transition-opacity duration-300"
      :class="{ 'opacity-0': !isLoaded }"
    >
    <div v-if="!isLoaded && !hasError" class="absolute inset-0 flex items-center justify-center">
      <div class="w-8 h-8 border-4 border-gray-300 border-t-accent rounded-full animate-spin"></div>
    </div>
  </div>
</template>
