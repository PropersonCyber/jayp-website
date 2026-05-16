<script setup lang="ts">
const open = defineModel<boolean>('open', { default: false })

defineProps<{ side?: 'right' | 'left' }>()
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <motion.div
        v-if="open"
        class="fixed inset-0 z-50 bg-black/40"
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1 }"
        :leave="{ opacity: 0 }"
        @click="open = false"
      />
    </Transition>
    <Transition name="slide">
      <motion.aside
        v-if="open"
        class="fixed top-0 z-50 h-full w-full max-w-md bg-white shadow-card flex flex-col border-l border-border"
        :class="side === 'left' ? 'left-0' : 'right-0'"
        :initial="{ x: side === 'left' ? '-100%' : '100%' }"
        :enter="{ x: 0 }"
        :leave="{ x: side === 'left' ? '-100%' : '100%' }"
        :transition="{ type: 'spring', stiffness: 300, damping: 30 }"
      >
        <slot />
      </motion.aside>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
