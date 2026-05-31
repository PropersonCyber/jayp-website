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
  { value: '15+', label: 'Years Experience' },
  { value: '50M+', label: 'Bags Produced' },
  { value: '120+', label: 'Countries Served' }
]

const heroImage = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop'
</script>

<template>
  <section id="hero" class="pt-32 lg:pt-40 pb-20 lg:pb-32 bg-gradient-to-b from-surface to-white overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <!-- Left: Content -->
        <div>
          <div class="inline-flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2 mb-6">
            <span class="w-2 h-2 bg-green-500 rounded-full"></span>
            <span class="text-sm font-medium text-secondary">Factory Direct · Custom Solutions</span>
          </div>
          
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
            Premium Fabric<br>
            <span class="gradient-text">Packaging Solutions</span>
          </h1>
          
          <p class="text-lg lg:text-xl text-secondary leading-relaxed mb-8 max-w-xl">
            Leading manufacturer of high-quality fabric bags and pouches. From velvet to leather, we craft packaging that elevates your brand.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 mb-12">
            <button @click="scrollTo('contact')" class="btn-primary px-8 py-4 rounded-full text-base font-medium text-center">
              Request Custom Quote
            </button>
            <button @click="scrollTo('products')" class="btn-secondary px-8 py-4 rounded-full text-base font-medium text-center">
              Browse Catalog
            </button>
          </div>
          
          <div class="grid grid-cols-3 gap-6 lg:gap-8">
            <div v-for="stat in stats" :key="stat.label">
              <div class="text-3xl lg:text-4xl font-bold mb-1">{{ stat.value }}</div>
              <div class="text-sm text-secondary">{{ stat.label }}</div>
            </div>
          </div>
        </div>
        
        <!-- Right: Image with floating cards -->
        <div class="relative">
          <div class="relative z-10">
            <img 
              :src="heroImage" 
              alt="Premium Fabric Bags" 
              class="w-full rounded-2xl shadow-2xl"
            >
          </div>
          <div class="absolute -top-8 -right-8 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
          <div class="absolute -bottom-8 -left-8 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
          
          <!-- Floating Elements -->
          <div class="absolute -left-4 top-1/4 bg-white rounded-xl shadow-lg p-4 animate-float z-20">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span i="fas-check text-green-600"></span>
              </div>
              <div>
                <div class="text-sm font-semibold">ISO 9001</div>
                <div class="text-xs text-secondary">Certified</div>
              </div>
            </div>
          </div>
          
          <div class="absolute -right-4 bottom-1/4 bg-white rounded-xl shadow-lg p-4 animate-float-delay z-20">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span i="fas-shipping-fast text-blue-600"></span>
              </div>
              <div>
                <div class="text-sm font-semibold">Global</div>
                <div class="text-xs text-secondary">Shipping</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delay {
  animation: float 6s ease-in-out infinite;
  animation-delay: 2s;
}

.gradient-text {
  background: linear-gradient(135deg, #0a0a0a 0%, #6366f1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
