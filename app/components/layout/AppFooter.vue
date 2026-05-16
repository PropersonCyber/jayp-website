<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const email = ref('')
const subscribed = ref(false)
const settings = ref(await useCatalog().getSiteSettings())

const shopLinks = [
  { slug: 'velvet-bags', label: 'Velvet Bags' },
  { slug: 'cotton-bags', label: 'Cotton Bags' },
  { slug: 'organza-bags', label: 'Organza Bags' },
  { slug: 'linen-bags', label: 'Linen Bags' },
]

async function subscribe() {
  if (!email.value) return
  try {
    await $fetch('/api/newsletter', { method: 'POST', body: { email: email.value } })
    subscribed.value = true
    email.value = ''
  } catch { /* ignore */ }
}
</script>

<template>
  <footer class="bg-[#172f24] text-white mt-16">
    <div class="container-site py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
      <div class="sm:col-span-2 lg:col-span-1">
        <p class="text-xl font-serif font-bold tracking-[0.08em] mb-4">BAGLUXE</p>
        <p class="text-sm text-white/75 leading-relaxed">
          {{ settings.brand_description || 'BAGLUXE crafts premium fabric packaging that elevates your brand — from velvet pouches to sustainable cotton bags, with low MOQ and worldwide shipping.' }}
        </p>
        <div class="flex gap-3 mt-6">
          <a
            v-for="s in settings.social_links"
            :key="s.platform"
            :href="s.url"
            target="_blank"
            rel="noopener"
            class="h-8 w-8 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/35 grid place-items-center transition-colors"
          >
            <span :class="`i-lucide-${s.platform === 'linkedin' ? 'linkedin' : s.platform}`" class="text-sm" />
          </a>
        </div>
      </div>

      <div>
        <h4 class="font-semibold mb-4 text-sm">{{ t('footer.shop') }}</h4>
        <ul class="space-y-2.5 text-sm text-white/75">
          <li v-for="link in shopLinks" :key="link.slug">
            <NuxtLink :to="localePath(`/collections/${link.slug}`)" class="hover:text-white transition-colors">
              {{ link.label }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/custom-packaging')" class="hover:text-white transition-colors">
              {{ t('nav.customPackaging') }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div>
        <h4 class="font-semibold mb-4 text-sm">{{ t('footer.customerService') }}</h4>
        <ul class="space-y-2.5 text-sm text-white/75">
          <li><NuxtLink :to="localePath('/contact')" class="hover:text-white transition-colors">{{ t('footer.shipping') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/contact')" class="hover:text-white transition-colors">{{ t('footer.returns') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/contact')" class="hover:text-white transition-colors">{{ t('footer.faq') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/contact')" class="hover:text-white transition-colors">{{ t('nav.contact') }}</NuxtLink></li>
        </ul>
      </div>

      <div>
        <h4 class="font-semibold mb-4 text-sm">{{ t('footer.about') }}</h4>
        <ul class="space-y-2.5 text-sm text-white/75">
          <li><NuxtLink :to="localePath('/about')" class="hover:text-white transition-colors">{{ t('footer.ourStory') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/about')" class="hover:text-white transition-colors">{{ t('footer.sustainability') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/blog')" class="hover:text-white transition-colors">{{ t('nav.resources') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/contact')" class="hover:text-white transition-colors">{{ t('footer.careers') }}</NuxtLink></li>
        </ul>
      </div>

      <div>
        <h4 class="font-semibold mb-4 text-sm">{{ t('footer.newsletter') }}</h4>
        <form v-if="!subscribed" class="flex gap-2" @submit.prevent="subscribe">
          <UiInput v-model="email" type="email" :placeholder="t('footer.emailPlaceholder')" class="flex-1 text-foreground bg-white/95 border-white/20" />
          <UiButton type="submit" size="icon" class="shrink-0 bg-primary hover:bg-primary/90">
            <span class="i-lucide-arrow-right" />
          </UiButton>
        </form>
        <p v-else class="text-sm text-white/80">{{ t('footer.subscribed') }}</p>
      </div>
    </div>

    <div class="border-t border-white/15">
      <div class="container-site py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
        <p>© {{ new Date().getFullYear() }} BAGLUXE. All rights reserved.</p>
        <p class="flex items-center gap-2">
          <span class="i-lucide-credit-card text-sm" />
          {{ t('footer.payments') }}
        </p>
      </div>
    </div>
  </footer>
</template>
