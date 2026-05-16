<script setup lang="ts">
import { cn } from '~/lib/utils'
</script>

<template>
  <motion.div
    :initial="{ opacity: 0, y: 8 }"
    :enter="{ opacity: 1, y: 0 }"
    :class="cn('rounded-[var(--radius)] border border-border bg-card text-card-foreground shadow-soft', $attrs.class as string)"
  >
    <slot />
  </motion.div>
</template>
