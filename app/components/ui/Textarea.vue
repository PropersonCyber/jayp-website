<script setup lang="ts">
import { cn } from '~/lib/utils'

defineProps<{
  modelValue?: string
  placeholder?: string
  rows?: number
  id?: string
}>()

defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <textarea
    :id="id"
    :value="modelValue"
    :placeholder="placeholder"
    :rows="rows ?? 4"
    :class="cn(
      'flex min-h-[100px] w-full rounded-lg border border-input bg-white px-3.5 py-2.5 text-sm placeholder:text-muted-foreground focus-visible:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20',
      $attrs.class as string,
    )"
    @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
  />
</template>
