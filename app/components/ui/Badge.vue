<script setup lang="ts">
import { cn } from '~/lib/utils'

defineProps<{ variant?: 'default' | 'secondary' }>()
</script>

<template>
  <span
    :class="cn(
      'inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-semibold',
      variant === 'secondary' ? 'bg-secondary text-secondary-foreground' : 'bg-primary text-white',
      $attrs.class as string,
    )"
  >
    <slot />
  </span>
</template>
