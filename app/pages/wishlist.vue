<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const wishlist = useWishlistStore()
const { getProducts } = useCatalog()

onMounted(() => wishlist.hydrate())

const allProducts = await getProducts()
const products = computed(() => allProducts.filter(p => wishlist.has(p.id)))

useSeoMeta({ title: t('nav.wishlist') })
</script>

<template>
  <div class="container-site py-12">
    <h1 class="text-[2rem] mb-8">{{ t('nav.wishlist') }}</h1>
    <motion.div v-if="products.length" class="grid grid-cols-2 lg:grid-cols-4 gap-5">
      <ProductProductCard v-for="p in products" :key="p.id" :product="p" />
    </motion.div>
    <motion.div v-else class="text-center py-16 text-muted-foreground">
      <span class="i-lucide-heart text-4xl mb-4 block opacity-30" />
      <p>{{ t('cart.empty') }}</p>
      <UiButton class="mt-4" as="NuxtLink" :to="localePath('/collections/velvet-bags')">{{ t('cart.continueShopping') }}</UiButton>
    </motion.div>
  </div>
</template>
