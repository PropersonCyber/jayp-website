<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CheckboxIndicator, CheckboxRoot } from 'reka-ui'
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  id?: string
}>()

const model = defineModel<boolean>({ default: false })
</script>

<template>
  <CheckboxRoot
    :id="props.id"
    v-model="model"
    :class="cn(
      'peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
      props.class,
    )"
  >
    <CheckboxIndicator class="grid place-content-center text-current">
      <span class="i-lucide-check text-[12px]" />
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
