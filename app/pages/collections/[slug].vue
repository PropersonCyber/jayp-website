<script setup lang="ts">
import { getUniqueColors, getUniqueMaterials, getUniqueSizes } from '~/composables/useCatalog'

const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()
const slug = computed(() => route.params.slug as string)

const sort = ref((route.query.sort as string) || 'best_selling')
const selectedColors = ref<string[]>([])
const selectedSizes = ref<string[]>([])
const selectedMaterials = ref<string[]>([])
const filterOpen = ref(false)

const { getProducts, getCategories } = useCatalog()
const categories = await getCategories()
const category = categories.find(c => c.slug === slug.value)

const products = ref(await getProducts({
  category: slug.value,
  colors: selectedColors.value,
  sizes: selectedSizes.value,
  materials: selectedMaterials.value,
  sort: sort.value,
}))

async function refresh() {
  products.value = await getProducts({
    category: slug.value,
    colors: selectedColors.value.length ? selectedColors.value : undefined,
    sizes: selectedSizes.value.length ? selectedSizes.value : undefined,
    materials: selectedMaterials.value.length ? selectedMaterials.value : undefined,
    sort: sort.value === 'newest' ? undefined : sort.value,
  })
}

watch([sort, selectedColors, selectedSizes, selectedMaterials], refresh)

const colors = computed(() => getUniqueColors(products.value))
const sizes = computed(() => getUniqueSizes(products.value))
const materials = computed(() => getUniqueMaterials(products.value))

function toggleColor(c: string) {
  const i = selectedColors.value.indexOf(c)
  if (i >= 0) selectedColors.value.splice(i, 1)
  else selectedColors.value.push(c)
}

function toggleSize(s: string) {
  const i = selectedSizes.value.indexOf(s)
  if (i >= 0) selectedSizes.value.splice(i, 1)
  else selectedSizes.value.push(s)
}

function toggleMaterial(m: string) {
  const i = selectedMaterials.value.indexOf(m)
  if (i >= 0) selectedMaterials.value.splice(i, 1)
  else selectedMaterials.value.push(m)
}

function clearFilters() {
  selectedColors.value = []
  selectedSizes.value = []
  selectedMaterials.value = []
}

useSeoMeta({ title: () => category?.name ?? slug.value })
</script>

<template>
  <div class="container-site py-8 lg:py-10">
    <nav class="text-sm text-muted-foreground mb-6">
      <NuxtLink :to="localePath('/')" class="hover:text-primary">{{ t('common.home') }}</NuxtLink>
      <span class="mx-2">/</span>
      <NuxtLink :to="localePath('/collections/velvet-bags')" class="hover:text-primary">{{ t('collection.shop') }}</NuxtLink>
      <span class="mx-2">/</span>
      <span>{{ category?.name ?? slug }}</span>
    </nav>

    <div class="flex flex-col lg:flex-row gap-8 lg:gap-10">
      <aside class="hidden lg:block w-60 shrink-0 space-y-8">
        <div>
          <h3 class="font-medium mb-4 text-sm tracking-wide uppercase text-muted-foreground">{{ t('collection.categories') }}</h3>
          <ul class="space-y-3 text-sm">
            <li v-for="cat in categories" :key="cat.id">
              <NuxtLink
                :to="localePath(`/collections/${cat.slug}`)"
                class="hover:text-primary transition-colors block"
                :class="cat.slug === slug ? 'text-primary font-medium bg-muted/50 px-2 py-1 -ml-2 rounded-md' : 'text-foreground/80'"
              >
                {{ cat.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div v-if="colors.length">
          <h3 class="font-medium mb-4 text-sm tracking-wide uppercase text-muted-foreground">{{ t('collection.color') }}</h3>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="c in colors"
              :key="c.color"
              type="button"
              class="w-7 h-7 rounded-full border border-border/50 transition-all"
              :style="{ backgroundColor: c.hex }"
              :class="selectedColors.includes(c.color) ? 'ring-2 ring-primary ring-offset-2 scale-110' : 'hover:scale-110'"
              :title="c.color"
              @click="toggleColor(c.color)"
            />
          </div>
        </div>

        <motion.div v-if="sizes.length">
          <h3 class="font-medium mb-4 text-sm tracking-wide uppercase text-muted-foreground">{{ t('collection.size') }}</h3>
          <div class="space-y-2">
            <label
              v-for="s in sizes"
              :key="s"
              class="flex items-center gap-2 text-sm cursor-pointer"
            >
              <UiCheckbox :model-value="selectedSizes.includes(s)" @update:model-value="toggleSize(s)" />
              <span>{{ s }}</span>
            </label>
          </div>
        </motion.div>

        <div v-if="materials.length">
          <h3 class="font-medium mb-4 text-sm tracking-wide uppercase text-muted-foreground">{{ t('collection.material') }}</h3>
          <div class="space-y-2">
            <label
              v-for="m in materials"
              :key="m"
              class="flex items-center gap-2 text-sm cursor-pointer"
            >
              <UiCheckbox :model-value="selectedMaterials.includes(m)" @update:model-value="toggleMaterial(m)" />
              <span class="line-clamp-1">{{ m }}</span>
            </label>
          </div>
        </div>

        <button
          v-if="selectedColors.length || selectedSizes.length || selectedMaterials.length"
          type="button"
          class="text-xs text-primary hover:underline"
          @click="clearFilters"
        >
          {{ t('collection.clearFilters') }}
        </button>
      </aside>

      <div class="flex-1">
        <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 class="text-[2rem]">{{ category?.name ?? slug }}</h1>
            <p class="text-sm text-muted-foreground">{{ products.length }} {{ t('collection.products') }}</p>
          </div>
          <div class="flex items-center gap-3">
            <button type="button" class="lg:hidden text-sm border border-border px-3 py-1.5 rounded-md bg-white" @click="filterOpen = true">
              {{ t('collection.filters') }}
            </button>
            <div class="flex items-center gap-2">
              <span class="text-sm text-muted-foreground">{{ t('collection.sortBy') }}</span>
              <UiSelect v-model="sort">
                <UiSelectTrigger class="w-[150px] h-9 text-sm bg-white">
                  <UiSelectValue />
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem value="best_selling">{{ t('collection.bestSelling') }}</UiSelectItem>
                  <UiSelectItem value="newest">{{ t('collection.newest') }}</UiSelectItem>
                  <UiSelectItem value="price_asc">{{ t('collection.priceAsc') }}</UiSelectItem>
                  <UiSelectItem value="price_desc">{{ t('collection.priceDesc') }}</UiSelectItem>
                  <UiSelectItem value="name">{{ t('collection.name') }}</UiSelectItem>
                </UiSelectContent>
              </UiSelect>
            </div>
          </div>
        </div>

        <div v-if="products.length" class="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          <ProductProductCard v-for="p in products" :key="p.id" :product="p" />
        </div>
        <p v-else class="text-center py-16 text-muted-foreground">{{ t('collection.noResults') }}</p>
      </div>
    </div>

    <UiSheet v-model:open="filterOpen">
      <div class="p-4 space-y-6 overflow-y-auto h-full">
        <h3 class="font-semibold">{{ t('collection.filters') }}</h3>
        <div v-if="colors.length">
          <h4 class="text-sm font-medium mb-2">{{ t('collection.color') }}</h4>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="c in colors"
              :key="c.color"
              type="button"
              class="w-8 h-8 rounded-full border-2"
              :style="{ backgroundColor: c.hex }"
              :class="selectedColors.includes(c.color) ? 'border-primary ring-2 ring-primary ring-offset-1' : 'border-border'"
              @click="toggleColor(c.color)"
            />
          </div>
        </div>
        <div v-if="sizes.length">
          <h4 class="text-sm font-medium mb-2">{{ t('collection.size') }}</h4>
          <div class="space-y-2">
            <label v-for="s in sizes" :key="s" class="flex items-center gap-2 text-sm">
              <UiCheckbox :model-value="selectedSizes.includes(s)" @update:model-value="toggleSize(s)" />
              {{ s }}
            </label>
          </div>
        </div>
        <div v-if="materials.length">
          <h4 class="text-sm font-medium mb-2">{{ t('collection.material') }}</h4>
          <motion.div class="space-y-2">
            <label v-for="m in materials" :key="m" class="flex items-center gap-2 text-sm">
              <UiCheckbox :model-value="selectedMaterials.includes(m)" @update:model-value="toggleMaterial(m)" />
              <span class="line-clamp-2">{{ m }}</span>
            </label>
          </motion.div>
        </div>
        <UiButton class="w-full" @click="filterOpen = false">{{ t('collection.applyFilters') }}</UiButton>
      </div>
    </UiSheet>
  </div>
</template>
