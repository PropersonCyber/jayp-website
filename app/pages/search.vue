<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const q = computed(() => (route.query.q as string) || '')
const { getProducts } = useCatalog()

const products = ref(await getProducts({ search: q.value }))

watch(q, async (val) => {
  products.value = await getProducts({ search: val })
})

useSeoMeta({ title: t('search.title') })
</script>

<template>
  <div class="container-site py-12">
    <h1 class="text-[2rem] mb-2">{{ t('search.title') }}</h1>
    <p v-if="q" class="text-muted-foreground mb-8">"{{ q }}" — {{ products.length }} {{ t('collection.products') }}</p>

    <div v-if="products.length" class="grid grid-cols-2 lg:grid-cols-4 gap-5">
      <ProductProductCard v-for="p in products" :key="p.id" :product="p" />
    </div>
    <p v-else class="text-center py-16 text-muted-foreground">{{ t('search.noResults') }}</p>
  </div>
</template>
