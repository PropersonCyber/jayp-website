<script setup lang="ts">
const { t, locale, locales, setLocale } = useI18n()
const localePath = useLocalePath()
const cart = useCartStore()
const wishlist = useWishlistStore()
const route = useRoute()

const categories = ref<{ slug: string; name: string }[]>([])
const searchOpen = ref(false)
const searchQuery = ref('')

const localeCookie = useCookie('bagluxe_locale')

onMounted(async () => {
  const saved = localeCookie.value
  if ((saved === 'en' || saved === 'zh') && saved !== locale.value) {
    setLocale(saved)
  }
  cart.hydrate()
  wishlist.hydrate()
  const { getCategories } = useCatalog()
  categories.value = await getCategories()
})

function switchLocale(code: 'en' | 'zh') {
  localeCookie.value = code
  setLocale(code)
}

function goSearch() {
  if (searchQuery.value.trim()) {
    navigateTo(localePath(`/search?q=${encodeURIComponent(searchQuery.value)}`))
    searchOpen.value = false
  }
}
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-border/80 bg-white/95 backdrop-blur">
    <div class="container-site flex h-18 items-center justify-between gap-4">
      <NuxtLink :to="localePath('/')" class="text-[1.2rem] font-bold tracking-[0.09em] text-foreground font-serif">
        BAGLUXE
      </NuxtLink>

      <nav class="hidden lg:flex items-center gap-7 text-[12px]">
        <UiDropdownMenu>
          <UiDropdownMenuTrigger asChild>
            <button type="button" class="flex items-center gap-1 text-foreground/90 hover:text-primary outline-none">
              {{ t('nav.shop') }}
              <span class="i-lucide-chevron-down text-xs" />
            </button>
          </UiDropdownMenuTrigger>
          <UiDropdownMenuContent align="start" class="w-52 rounded-xl">
            <UiDropdownMenuItem v-for="cat in categories" :key="cat.slug" asChild>
              <NuxtLink :to="localePath(`/collections/${cat.slug}`)" class="cursor-pointer">
                {{ cat.name }}
              </NuxtLink>
            </UiDropdownMenuItem>
          </UiDropdownMenuContent>
        </UiDropdownMenu>
        <NuxtLink :to="localePath('/custom-packaging')" class="hover:text-primary">{{ t('nav.customPackaging') }}</NuxtLink>
        <NuxtLink :to="localePath('/about')" class="hover:text-primary">{{ t('nav.about') }}</NuxtLink>
        <NuxtLink :to="localePath('/blog')" class="hover:text-primary">{{ t('nav.resources') }}</NuxtLink>
        <NuxtLink :to="localePath('/contact')" class="hover:text-primary">{{ t('nav.contact') }}</NuxtLink>
      </nav>

      <motion.div class="flex items-center gap-1">
        <button
          type="button"
          class="h-9 w-9 rounded-full text-foreground/80 hover:bg-muted hover:text-primary grid place-items-center transition-colors"
          :aria-label="t('nav.search')"
          @click="searchOpen = !searchOpen"
        >
          <span class="i-lucide-search text-[16px]" />
        </button>
        <NuxtLink
          :to="localePath('/account')"
          class="h-9 w-9 rounded-full text-foreground/80 hover:bg-muted hover:text-primary hidden sm:grid place-items-center transition-colors"
          :aria-label="t('nav.account')"
        >
          <span class="i-lucide-user-round text-[16px]" />
        </NuxtLink>
        <NuxtLink
          :to="localePath('/wishlist')"
          class="h-9 w-9 rounded-full text-foreground/80 hover:bg-muted hover:text-primary relative grid place-items-center transition-colors"
          :aria-label="t('nav.wishlist')"
        >
          <span class="i-lucide-heart text-[16px]" />
          <UiBadge v-if="wishlist.count" class="absolute -top-1 -right-1 h-4 min-w-4 text-[10px]">{{ wishlist.count }}</UiBadge>
        </NuxtLink>
        <button
          type="button"
          class="h-9 w-9 rounded-full text-foreground/80 hover:bg-muted hover:text-primary relative grid place-items-center transition-colors"
          :aria-label="t('nav.cart')"
          @click="cart.toggle()"
        >
          <span class="i-lucide-shopping-bag text-[16px]" />
          <span v-if="!cart.itemCount" class="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-primary" />
          <UiBadge v-if="cart.itemCount" class="absolute -top-1 -right-1 h-4 min-w-4 text-[10px]">{{ cart.itemCount }}</UiBadge>
        </button>
        
        <UiDropdownMenu>
          <UiDropdownMenuTrigger asChild>
            <button type="button" class="ml-2 hidden sm:flex items-center gap-1 text-xs border border-border rounded-md px-2 py-1.5 bg-white hover:bg-muted/50 transition-colors outline-none">
              {{ locales.find(l => l.code === locale)?.name || locale }}
              <span class="i-lucide-chevron-down text-[10px] opacity-50" />
            </button>
          </UiDropdownMenuTrigger>
          <UiDropdownMenuContent align="end" class="min-w-[100px]">
            <UiDropdownMenuItem 
              v-for="l in locales" 
              :key="l.code"
              class="cursor-pointer text-xs flex items-center justify-between"
              @click="switchLocale(l.code)"
            >
              {{ l.name }}
              <span v-if="locale === l.code" class="i-lucide-check text-xs ml-2" />
            </UiDropdownMenuItem>
          </UiDropdownMenuContent>
        </UiDropdownMenu>
      </motion.div>
    </div>

    <motion.div v-if="searchOpen" class="border-t border-border bg-white px-4 py-3">
      <form class="container-site flex gap-2" @submit.prevent="goSearch">
        <UiInput v-model="searchQuery" :placeholder="t('search.placeholder')" class="flex-1" />
        <UiButton type="submit">{{ t('nav.search') }}</UiButton>
      </form>
    </motion.div>
  </header>
</template>
