<script setup lang="ts">
import { PLACEHOLDER_PRODUCT_IMAGE } from '~/lib/constants'

const { t } = useI18n()
const localePath = useLocalePath()
const { getCategories, getHomeSection } = useCatalog()
const home = await getHomeSection()
const categories = await getCategories()

const heroSubtitle = computed(() => home.hero_subtitle || t('home.heroSubtitleFallback'))

useSeoMeta({ title: 'BAGLUXE – Premium Fabric Packaging' })
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="container-site py-10 lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
      <motion.div
        :initial="{ opacity: 0, x: -20 }"
        :enter="{ opacity: 1, x: 0 }"
      >
        <h1 class="mb-5 font-serif">
          <span class="block text-foreground">{{ t('home.heroLine1') }}</span>
          <span class="block text-primary mt-1">{{ t('home.heroLine2') }}</span>
        </h1>
        <p class="text-[15px] md:text-base text-muted-foreground max-w-xl mb-8 leading-relaxed">
          {{ heroSubtitle }}
        </p>
        <motion.div class="flex flex-wrap gap-3">
          <NuxtLink :to="localePath('/collections/velvet-bags')">
            <UiButton size="lg" class="min-w-[140px] rounded-md">{{ t('home.shopNow') }}</UiButton>
          </NuxtLink>
          <NuxtLink :to="localePath('/custom-packaging')">
            <UiButton variant="outline" size="lg" class="min-w-[160px] rounded-md border-foreground/20">
              {{ t('home.customYourBag') }}
            </UiButton>
          </NuxtLink>
        </motion.div>
      </motion.div>
      <motion.div
        :initial="{ opacity: 0, x: 20 }"
        :enter="{ opacity: 1, x: 0 }"
        class="relative aspect-[1.12/1] rounded-[20px] overflow-hidden bg-[#ebe8e3]"
      >
        <img
          src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop"
          alt="Premium velvet packaging"
          class="w-full h-full object-cover"
        >
      </motion.div>
    </section>

    <!-- Value props — flat bar, circular sage icon badges (no surface-card) -->
    <section class="border-y border-border/50 bg-white py-8 lg:py-10">
      <div class="container-site grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        <motion.div
          v-for="(prop, i) in home.value_props"
          :key="i"
          class="flex flex-col items-center text-center gap-2.5 px-2"
          :initial="{ opacity: 0, y: 10 }"
          :enter="{ opacity: 1, y: 0 }"
          :delay="i * 80"
        >
          <div class="h-11 w-11 rounded-full bg-[#e8f0e9] flex items-center justify-center shrink-0">
            <span :class="prop.icon" class="text-[18px] text-primary" />
          </div>
          <p class="font-semibold text-sm text-foreground">{{ prop.title }}</p>
          <p class="text-xs text-muted-foreground leading-snug max-w-[200px]">{{ prop.description }}</p>
        </motion.div>
      </div>
    </section>

    <!-- Categories -->
    <section class="container-site py-12 lg:py-14">
      <div class="mb-8 flex items-center justify-between">
        <h2 class="text-[1.75rem] lg:text-[1.9rem]">{{ t('home.shopByCategory') }}</h2>
        <NuxtLink :to="localePath('/collections/velvet-bags')" class="text-sm text-primary hover:underline inline-flex items-center gap-0.5">
          {{ t('home.viewAll') }}
          <span class="i-lucide-arrow-right text-xs" />
        </NuxtLink>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-5">
        <NuxtLink
          v-for="cat in categories"
          :key="cat.id"
          :to="localePath(`/collections/${cat.slug}`)"
          class="group text-center"
        >
          <div class="aspect-square rounded-2xl overflow-hidden bg-[#f0eeea] mb-3 p-0 transition-colors group-hover:bg-[#ebe8e3]">
            <img
              :src="cat.image || PLACEHOLDER_PRODUCT_IMAGE"
              :alt="cat.name"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            >
          </div>
          <h3 class="font-semibold text-sm mb-0.5 text-foreground">{{ cat.name }}</h3>
          <p class="text-xs text-muted-foreground">{{ cat.description || t('home.categoryBlurbFallback') }}</p>
        </NuxtLink>
      </div>
    </section>

    <!-- Promotional banners — flat colored panels, no shadow -->
    <section class="container-site pb-16 lg:pb-20 grid md:grid-cols-2 gap-5">
      <NuxtLink
        :to="localePath('/custom-packaging')"
        class="relative rounded-[20px] overflow-hidden aspect-[16/8.5] bg-[#f0eeea] flex items-center p-7 lg:p-8 group"
      >
        <div class="relative z-10 text-foreground w-[52%] min-w-0">
          <p class="text-[11px] uppercase tracking-widest text-primary mb-2 font-medium">{{ t('home.customBannerEyebrow') }}</p>
          <h3 class="text-[1.45rem] lg:text-[1.55rem] mb-2 leading-tight font-serif">{{ t('home.customBannerTitle') }}</h3>
          <p class="text-sm text-muted-foreground mb-4 line-clamp-2">{{ t('home.customBannerLead') }}</p>
          <span class="inline-flex items-center gap-1 text-sm font-medium group-hover:text-primary transition-colors">
            {{ t('home.customBannerCta') }}
            <span class="i-lucide-arrow-right text-sm" />
          </span>
        </div>
        <div class="absolute right-0 top-0 bottom-0 w-[48%] flex items-center justify-center p-5">
          <img
            src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=400&h=400&fit=crop"
            alt="Custom packaging"
            class="max-h-full w-auto object-contain mix-blend-multiply"
          >
        </div>
      </NuxtLink>

      <NuxtLink
        :to="localePath('/about')"
        class="relative rounded-[20px] overflow-hidden aspect-[16/8.5] bg-[#e8f0e9] flex items-center p-7 lg:p-8 group"
      >
        <div class="relative z-10 text-foreground w-[52%] min-w-0">
          <p class="text-[11px] uppercase tracking-widest text-primary mb-2 font-medium">{{ t('home.sustainBannerEyebrow') }}</p>
          <h3 class="text-[1.45rem] lg:text-[1.55rem] mb-2 leading-tight font-serif">{{ t('home.sustainBannerTitle') }}</h3>
          <p class="text-sm text-muted-foreground mb-4 line-clamp-2">{{ t('home.sustainBannerLead') }}</p>
          <span class="inline-flex items-center gap-1 text-sm font-medium group-hover:text-primary transition-colors">
            {{ t('home.sustainBannerCta') }}
            <span class="i-lucide-arrow-right text-sm" />
          </span>
        </div>
        <div class="absolute right-0 top-0 bottom-0 w-[48%] flex items-center justify-center p-5 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400&h=400&fit=crop"
            alt="Sustainable packaging"
            class="max-h-full w-full object-cover rounded-xl"
          >
        </div>
      </NuxtLink>
    </section>
  </div>
</template>
