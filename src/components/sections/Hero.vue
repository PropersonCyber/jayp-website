<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const scrollTo = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    const headerHeight = 80
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
  }
}

const stats = [
  { value: '15+', key: 'years' },
  { value: '50M+', key: 'bagsProduced' },
  { value: '120+', key: 'countries' }
]

const heroImage = 'https://picsum.photos/seed/fabric/800/600'
</script>

<template>
  <section id="hero" class="bg-gradient-to-b from-surface to-white min-h-[calc(100vh-5rem)] flex items-center">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 w-full">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <!-- Left: Content -->
        <div class="animate-fade-in order-2 lg:order-1">
          <div class="inline-flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2 mb-6">
            <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span class="text-sm font-medium text-secondary">{{ t('hero.badge') }}</span>
          </div>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
            {{ t('hero.title1') }}<br>
            <span class="gradient-text">{{ t('hero.title2') }}</span>
          </h1>
          <p class="text-lg lg:text-xl text-secondary leading-relaxed mb-8 max-w-xl">
            {{ t('hero.description') }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 mb-12">
            <button @click="scrollTo('contact')" class="btn-primary px-8 py-4 rounded-full text-base font-medium text-center">
              {{ t('hero.requestQuote') }}
            </button>
            <button @click="scrollTo('products')" class="btn-secondary px-8 py-4 rounded-full text-base font-medium text-center">
              {{ t('hero.browseCatalog') }}
            </button>
          </div>
          
          <div class="grid grid-cols-3 gap-6 lg:gap-8">
            <div v-for="stat in stats" :key="stat.key">
              <div class="text-3xl lg:text-4xl font-bold mb-1">{{ stat.value }}</div>
              <div class="text-sm text-secondary">{{ t(`hero.${stat.key}`) }}</div>
            </div>
          </div>
        </div>
        
        <!-- Right: Image with floating cards -->
        <div class="relative animate-fade-in order-1 lg:order-2 h-full">
          <!-- Main Image Container - fills available height -->
          <div class="relative h-full min-h-[400px] lg:min-h-[500px]">
            <img 
              :src="heroImage" 
              alt="Premium Fabric Bags" 
              class="w-full h-full object-cover rounded-2xl shadow-2xl"
            >
            
            <!-- Floating Card 1: ISO Certified -->
            <div class="absolute -left-4 lg:-left-6 top-1/4 -translate-y-1/4 bg-white rounded-xl shadow-xl p-4 animate-float z-20">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <span i="fas-check-circle text-green-600 text-xl"></span>
                </div>
                <div>
                  <div class="text-sm font-bold">{{ t('hero.isoCertified') }}</div>
                  <div class="text-xs text-secondary">{{ t('hero.certified') }}</div>
                </div>
              </div>
            </div>
            
            <!-- Floating Card 2: Global Shipping -->
            <div class="absolute -right-4 lg:-right-6 bottom-1/3 bg-white rounded-xl shadow-xl p-4 animate-float-delay z-20">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <span i="fas-shipping-fast text-blue-600 text-xl"></span>
                </div>
                <div>
                  <div class="text-sm font-bold">{{ t('hero.global') }}</div>
                  <div class="text-xs text-secondary">{{ t('hero.shipping') }}</div>
                </div>
              </div>
            </div>
            
            <!-- Floating Card 3: Quick Stats -->
            <div class="absolute -right-4 lg:-right-8 top-8 bg-white rounded-xl shadow-xl p-3 z-20 hidden md:block">
              <div class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                  <span i="fas-box text-accent text-sm"></span>
                </div>
                <div>
                  <div class="text-sm font-bold">50M+</div>
                  <div class="text-xs text-secondary">Bags/Year</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
