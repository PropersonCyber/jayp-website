<script setup lang="ts">
const features = [
  {
    icon: 'fas-dollar-sign',
    title: 'Competitive Pricing',
    description: 'Direct factory pricing with no middlemen. Get the best value without compromising quality.'
  },
  {
    icon: 'fas-clock',
    title: 'Fast Turnaround',
    description: 'Efficient production lines ensure quick delivery. Standard orders ship in 2-3 weeks.'
  },
  {
    icon: 'fas-check-double',
    title: 'Quality Assurance',
    description: 'Rigorous quality control at every stage. 99.5% on-time delivery rate.'
  },
  {
    icon: 'fas-headset',
    title: '24/7 Support',
    description: 'Dedicated account managers for every client. Multilingual support team.'
  },
  {
    icon: 'fas-shipping-fast',
    title: 'Global Shipping',
    description: 'Worldwide delivery with tracking. Express shipping to 120+ countries.'
  },
  {
    icon: 'fas-lock',
    title: 'Data Security',
    description: 'Protected business information. NDA available for all projects.'
  }
]
</script>

<template>
  <section id="about" class="py-20 lg:py-32 bg-primary text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <span class="text-sm font-semibold text-accent tracking-wider uppercase">Why PremiumPack</span>
        <h2 class="text-3xl lg:text-4xl font-bold mt-4 mb-6">Your Trusted Partner</h2>
        <p class="text-lg text-gray-400 max-w-2xl mx-auto">
          We combine manufacturing excellence with customer-focused service to deliver outstanding results.
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="feature in features" 
          :key="feature.title"
          class="bg-secondary rounded-2xl p-8 card-hover hover:bg-gray-800"
        >
          <div class="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center mb-6">
            <span :class="feature.icon + ' text-accent text-2xl'"></span>
          </div>
          <h3 class="text-xl font-semibold mb-3">{{ feature.title }}</h3>
          <p class="text-gray-400 leading-relaxed">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
