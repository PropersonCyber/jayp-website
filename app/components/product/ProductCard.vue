<script setup lang="ts">
import type { Product } from '~/types'
import { PLACEHOLDER_PRODUCT_IMAGE } from '~/lib/constants'
import { getProductPriceRange } from '~/composables/useCatalog'

const props = defineProps<{ product: Product }>()
const { t } = useI18n()
const localePath = useLocalePath()
const wishlist = useWishlistStore()
const range = computed(() => getProductPriceRange(props.product))
const config = useRuntimeConfig()
</script>

<template>
  <motion.div
    class="group relative"
    :while-hover="{ y: -4 }"
    :transition="{ type: 'spring', stiffness: 400 }"
  >
    <div class="overflow-hidden bg-transparent">
      <NuxtLink :to="localePath(`/products/${product.slug}`)" class="block relative aspect-[0.85/1] overflow-hidden rounded-2xl bg-[#f5f5f5] mb-3 p-4 flex items-center justify-center">
        <img
          :src="product.images?.[0] || PLACEHOLDER_PRODUCT_IMAGE"
          :alt="product.title"
          class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 mix-blend-multiply"
          loading="lazy"
        >
        <button
          type="button"
          class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center shadow-sm hover:scale-110 transition-transform z-10"
          @click.prevent="wishlist.toggle(product.id)"
        >
          <span
            class="i-lucide-heart text-sm"
            :class="wishlist.has(product.id) ? 'text-red-500 fill-red-500' : 'text-foreground'"
          />
        </button>
      </NuxtLink>
      <div class="px-1">
        <NuxtLink :to="localePath(`/products/${product.slug}`)" class="font-medium text-sm hover:text-primary line-clamp-1 mb-1">
          {{ product.title }}
        </NuxtLink>
        <p class="text-xs text-muted-foreground">
          {{ priceRange(range.min, range.max, config.public.currency) }}
        </p>
      </div>
    </div>
  </motion.div>
</template>
