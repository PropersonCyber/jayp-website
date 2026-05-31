<script setup lang="ts">
const stats = [
  { value: '50,000m²', label: 'Production Area', icon: 'fas-industry' },
  { value: '500+', label: 'Skilled Workers', icon: 'fas-users' },
  { value: '200+', label: 'Modern Machines', icon: 'fas-cogs' },
  { value: '15+', label: 'Years Experience', icon: 'fas-calendar-check' }
]

const certifications = [
  { icon: 'fas-certificate', label: 'ISO 9001', color: 'text-gray-600' },
  { icon: 'fas-leaf', label: 'Eco-Friendly', color: 'text-green-600' },
  { icon: 'fas-shield-alt', label: 'BSCI', color: 'text-blue-600' },
  { icon: 'fas-award', label: 'SEDEX', color: 'text-purple-600' }
]

// Using reliable picsum images for factory
const images = [
  {
    src: 'https://picsum.photos/seed/factory1/800/400',
    alt: 'Factory Overview',
    large: true
  },
  {
    src: 'https://picsum.photos/seed/factory2/400/200',
    alt: 'Production Line',
    large: false
  },
  {
    src: 'https://picsum.photos/seed/factory3/400/200',
    alt: 'Quality Control',
    large: false
  }
]
</script>

<template>
  <section id="factory" class="py-20 lg:py-32">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <span class="text-sm font-semibold text-accent tracking-wider uppercase">Our Factory</span>
        <h2 class="text-3xl lg:text-4xl font-bold mt-4 mb-6">Manufacturing Excellence</h2>
        <p class="text-lg text-secondary max-w-2xl mx-auto">
          State-of-the-art production facilities ensuring consistent quality and efficient delivery worldwide.
        </p>
      </div>
      
      <!-- Factory Stats Grid -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div 
          v-for="stat in stats" 
          :key="stat.label"
          class="bg-gradient-to-br from-white to-surface rounded-2xl p-6 lg:p-8 text-center card-hover"
        >
          <div class="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span :class="stat.icon + ' text-accent text-2xl'"></span>
          </div>
          <div class="text-3xl lg:text-4xl font-bold mb-2">{{ stat.value }}</div>
          <div class="text-sm text-secondary">{{ stat.label }}</div>
        </div>
      </div>
      
      <!-- Factory Images Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div 
          v-for="image in images" 
          :key="image.alt"
          :class="[
            'rounded-2xl overflow-hidden relative',
            image.large ? 'lg:col-span-2' : ''
          ]"
        >
          <img 
            :src="image.src" 
            :alt="image.alt" 
            :class="[
              'w-full object-cover transition-transform duration-500 hover:scale-105',
              image.large ? 'h-64 lg:h-80' : 'h-40'
            ]"
          >
        </div>
      </div>
      
      <!-- Certifications -->
      <div class="mt-16 text-center">
        <h3 class="text-xl font-semibold mb-8">Certified Quality Standards</h3>
        <div class="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
          <div 
            v-for="cert in certifications" 
            :key="cert.label"
            class="flex items-center space-x-3 p-4 hover:bg-gray-50 rounded-xl transition"
          >
            <div class="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
              <span :class="cert.icon + ' ' + cert.color + ' text-xl'"></span>
            </div>
            <span class="font-medium">{{ cert.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
