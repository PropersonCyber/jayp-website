<script setup lang="ts">
const brands = [
  'CHANEL', 'GUCCI', 'DIOR', 'LOUIS VUITTON', 'CARTIER', 'SWAROVSKI'
]
</script>

<template>
  <section class="py-12 lg:py-16 border-y border-gray-100 bg-surface">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p class="text-center text-sm font-medium text-secondary mb-8">Trusted by leading brands worldwide</p>
      <div class="flex flex-wrap justify-center items-center gap-8 lg:gap-16 opacity-60">
        <div 
          v-for="brand in brands" 
          :key="brand" 
          class="text-2xl font-bold text-secondary"
        >
          {{ brand }}
        </div>
      </div>
    </div>
  </section>
</template>
