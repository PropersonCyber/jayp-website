<script setup lang="ts">
const testimonials = [
  {
    text: '"PremiumPack has been our trusted supplier for 5 years. Their velvet bags consistently exceed our quality standards. The custom branding service is exceptional."',
    name: 'Sarah Johnson',
    role: 'CEO, LuxeJewelry Inc.',
    avatar: ''
  },
  {
    text: '"The attention to detail is remarkable. Our cotton tote bags have become a hit at trade shows. Highly recommend for any brand looking for premium packaging."',
    name: 'Michael Chen',
    role: 'Founder, EcoStyle Co.',
    avatar: ''
  },
  {
    text: '"Fast turnaround and excellent communication throughout the project. The leather pouches we ordered look absolutely stunning. Will definitely order again."',
    name: 'Emma Williams',
    role: 'Procurement, StyleHouse',
    avatar: ''
  }
]

const stats = [
  { value: '4.9/5', label: 'Average Rating' },
  { value: '2,500+', label: 'Happy Clients' },
  { value: '98%', label: 'Return Rate' }
]
</script>

<template>
  <section class="py-20 lg:py-32 bg-surface">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <span class="text-sm font-semibold text-accent tracking-wider uppercase">Testimonials</span>
        <h2 class="text-3xl lg:text-4xl font-bold mt-4 mb-6">What Our Clients Say</h2>
        <p class="text-lg text-secondary max-w-2xl mx-auto">
          Trusted by businesses worldwide for consistent quality and reliable service.
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="(testimonial, index) in testimonials" 
          :key="index"
          class="bg-gradient-to-br from-white to-surface rounded-2xl p-8 border border-gray-100 card-hover"
        >
          <div class="flex items-center space-x-1 mb-4">
            <span v-for="i in 5" :key="i" i="fas-star text-yellow-400"></span>
          </div>
          <p class="text-secondary leading-relaxed mb-6">{{ testimonial.text }}</p>
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 rounded-full" :class="['bg-gray-200', 'bg-gray-300', 'bg-gray-400'][index]"></div>
            <div>
              <div class="font-semibold">{{ testimonial.name }}</div>
              <div class="text-sm text-secondary">{{ testimonial.role }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Trust Stats -->
      <div class="mt-16 flex flex-wrap justify-center items-center gap-8">
        <div v-for="stat in stats" :key="stat.label" class="text-center">
          <div class="text-4xl font-bold text-accent mb-2">{{ stat.value }}</div>
          <div class="text-sm text-secondary">{{ stat.label }}</div>
        </div>
        <div v-if="stats.length > 1" class="hidden sm:block w-px h-12 bg-gray-300"></div>
      </div>
    </div>
  </section>
</template>
