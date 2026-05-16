<script setup lang="ts">
import type { ProductVariant } from '~/types'
import { PLACEHOLDER_PRODUCT_IMAGE } from '~/lib/constants'
import { getProductPriceRange } from '~/composables/useCatalog'

const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()
const cart = useCartStore()
const config = useRuntimeConfig()

const slug = route.params.slug as string
const { getProduct } = useCatalog()
const product = await getProduct(slug)

if (!product) {
  throw createError({ statusCode: 404, message: 'Product not found' })
}

const selectedColor = ref(product.variants?.[0]?.color ?? '')
const selectedSize = ref(product.variants?.[0]?.size ?? '')
const quantity = ref(product.moq)
const activeImage = ref(0)

const colors = computed(() => [...new Set(product.variants?.map(v => v.color) ?? [])])
const sizesForColor = computed(() =>
  product.variants?.filter(v => v.color === selectedColor.value).map(v => v.size) ?? [],
)

const selectedVariant = computed<ProductVariant | undefined>(() =>
  product.variants?.find(v => v.color === selectedColor.value && v.size === selectedSize.value),
)

const prices = computed(() => getProductPriceRange(product))

watch(selectedColor, (c) => {
  const sizes = product.variants?.filter(v => v.color === c).map(v => v.size) ?? []
  if (!sizes.includes(selectedSize.value)) selectedSize.value = sizes[0] ?? ''
})

function addToCart() {
  if (!selectedVariant.value) return
  cart.addItem(product, selectedVariant.value, quantity.value)
}

function buyNow() {
  addToCart()
  navigateTo(localePath('/checkout'))
}

function colorHex(name: string) {
  return product.variants?.find(v => v.color === name)?.color_hex ?? '#ccc'
}

const accordionItems = computed(() => [
  { title: t('product.description'), content: product.description || t('product.descFallback') },
  { title: t('product.materialCare'), content: product.material_care || product.material || t('product.materialFallback') },
  { title: t('product.shippingReturns'), content: product.shipping_returns || t('product.shippingFallback') },
])

useSeoMeta({ title: product.title })
</script>

<template>
  <div class="container-site py-8 lg:py-10">
    <nav class="text-sm text-muted-foreground mb-6">
      <NuxtLink :to="localePath('/')" class="hover:text-primary">{{ t('common.home') }}</NuxtLink>
      <span class="mx-2">/</span>
      <NuxtLink
        v-if="product.categories?.[0]"
        :to="localePath(`/collections/${product.categories[0].slug}`)"
        class="hover:text-primary"
      >
        {{ product.categories[0].name }}
      </NuxtLink>
      <span class="mx-2">/</span>
      <span>{{ product.title }}</span>
    </nav>

    <div class="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-12">
      <!-- Gallery -->
      <div class="flex gap-4">
        <div v-if="(product.images?.length ?? 0) > 1" class="hidden sm:flex flex-col gap-2">
          <button
            v-for="(img, i) in product.images"
            :key="i"
            type="button"
            class="w-16 h-16 rounded-lg overflow-hidden border-2 bg-white"
            :class="activeImage === i ? 'border-primary' : 'border-transparent'"
            @click="activeImage = i"
          >
            <img :src="img" :alt="`${product.title} ${i + 1}`" class="w-full h-full object-cover">
          </button>
        </div>
        <motion.div class="flex-1 aspect-square rounded-[var(--radius)] overflow-hidden bg-[#f5f5f5] flex items-center justify-center p-8">
          <img
            :src="product.images?.[activeImage] || PLACEHOLDER_PRODUCT_IMAGE"
            :alt="product.title"
            class="w-full h-full object-contain mix-blend-multiply"
          >
        </motion.div>
      </div>

      <!-- Info -->
      <motion.div class="surface-card p-6 lg:p-7 h-fit">
        <h1 class="text-[2rem] mb-2">{{ product.title }}</h1>
        <p class="text-xl font-semibold mb-2">
          {{ priceRange(prices.min, prices.max, config.public.currency) }}
        </p>
        <div class="flex items-center gap-2 text-sm mb-4">
          <div class="flex text-amber-500">
            <span v-for="i in 5" :key="i" class="i-lucide-star" :class="i <= (product.rating || 5) ? 'fill-amber-500' : 'text-muted'" />
          </div>
          <span class="text-muted-foreground">{{ t('product.reviewsFallback', { count: product.review_count || 32 }) }}</span>
        </div>
        <p class="text-muted-foreground mb-6 text-sm">{{ product.short_description || t('product.shortDescFallback') }}</p>

        <div class="space-y-6 mb-8">
          <motion.div>
            <p class="text-sm font-semibold mb-2">{{ t('product.color') }}</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="c in colors"
                :key="c"
                type="button"
                class="w-9 h-9 rounded-full border-2 transition-all"
                :style="{ backgroundColor: colorHex(c) }"
                :class="selectedColor === c ? 'ring-2 ring-primary ring-offset-2 border-primary' : 'border-border hover:scale-110'"
                :title="c"
                @click="selectedColor = c"
              />
            </div>
          </motion.div>

          <motion.div>
            <p class="text-sm font-semibold mb-2">{{ t('product.size') }}</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="s in sizesForColor"
                :key="s"
                type="button"
                class="w-12 h-10 text-sm border border-border rounded-md bg-white"
                :class="selectedSize === s ? 'border-primary bg-primary text-white' : 'hover:border-primary/40'"
                @click="selectedSize = s"
              >
                {{ s }}
              </button>
            </div>
          </motion.div>

          <motion.div>
            <p class="text-sm font-semibold mb-2">{{ t('product.quantity') }}</p>
            <div class="flex items-center gap-3">
              <button type="button" class="w-10 h-10 border border-border rounded-md bg-white" @click="quantity = Math.max(product.moq, quantity - 1)">−</button>
              <input v-model.number="quantity" type="number" :min="product.moq" class="w-16 text-center border border-border rounded-md h-10 bg-white">
              <button type="button" class="w-10 h-10 border border-border rounded-md bg-white" @click="quantity++">+</button>
            </div>
          </motion.div>
        </div>

        <div class="flex flex-wrap gap-3 mb-8">
          <UiButton size="lg" variant="outline" class="flex-1 min-w-[140px]" @click="addToCart">{{ t('product.addToCart') }}</UiButton>
          <UiButton size="lg" class="flex-1 min-w-[140px]" @click="buyNow">{{ t('product.buyNow') }}</UiButton>
        </div>

        <div class="grid grid-cols-3 gap-4 text-sm border border-border rounded-lg p-4 mb-8 bg-[#fcfcfb]">
          <div>
            <p class="text-muted-foreground">{{ t('product.moq') }}</p>
            <p class="font-medium">{{ product.moq }} {{ t('product.units') }}</p>
          </div>
          <div>
            <p class="text-muted-foreground">{{ t('product.production') }}</p>
            <p class="font-medium">{{ product.production_days }} {{ t('product.days') }}</p>
          </div>
          <div>
            <p class="text-muted-foreground">{{ t('product.shipping') }}</p>
            <p class="font-medium text-xs">{{ product.shipping_note ?? t('product.shippingNoteFallback') }}</p>
          </div>
        </div>

        <UiAccordion :items="accordionItems" />
      </motion.div>
    </div>
  </div>
</template>
