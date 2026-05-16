<script setup lang="ts">
defineProps<{ items: { title: string; content: string }[] }>()
const openIndex = ref<number | null>(0)

function toggle(i: number) {
  openIndex.value = openIndex.value === i ? null : i
}
</script>

<template>
  <div class="divide-y border border-border rounded-lg overflow-hidden bg-white">
    <motion.div v-for="(item, i) in items" :key="i">
      <button
        type="button"
        class="flex w-full items-center justify-between px-4 py-4 text-left font-medium hover:bg-muted/50 transition-colors"
        @click="toggle(i)"
      >
        {{ item.title }}
        <span class="i-lucide-chevron-down transition-transform" :class="openIndex === i ? 'rotate-180' : ''" />
      </button>
      <div v-show="openIndex === i" class="overflow-hidden">
        <div class="px-4 pb-4 text-sm text-muted-foreground prose-sm" v-html="item.content" />
      </div>
    </motion.div>
  </div>
</template>
