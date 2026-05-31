<script setup lang="ts">
const posts = [
  {
    title: '5 Trends Shaping Packaging Industry in 2025',
    excerpt: 'Discover the latest innovations in sustainable packaging and consumer preferences.',
    category: 'Industry',
    date: 'Dec 15, 2024',
    image: 'https://picsum.photos/seed/blog1/400/250'
  },
  {
    title: 'How to Choose the Right Packaging for Your Products',
    excerpt: 'A comprehensive guide to selecting materials, sizes, and styles for your needs.',
    category: 'Guide',
    date: 'Dec 10, 2024',
    image: 'https://picsum.photos/seed/blog2/400/250'
  },
  {
    title: 'Our New Sustainable Production Line is Now Live',
    excerpt: 'We\'re excited to announce our eco-friendly manufacturing expansion.',
    category: 'Company',
    date: 'Dec 5, 2024',
    image: 'https://picsum.photos/seed/blog3/400/250'
  }
]
</script>

<template>
  <section class="py-20 lg:py-32 bg-surface">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
        <div>
          <span class="text-sm font-semibold text-accent tracking-wider uppercase">Blog & News</span>
          <h2 class="text-3xl lg:text-4xl font-bold mt-4">Latest Updates</h2>
        </div>
        <a 
          href="#" 
          class="mt-4 md:mt-0 text-sm font-medium text-accent hover:text-accent-hover transition flex items-center"
        >
          View All Posts <span i="fas-arrow-right ml-2"></span>
        </a>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article 
          v-for="(post, index) in posts" 
          :key="index"
          class="blog-card bg-white rounded-2xl overflow-hidden border border-gray-100 card-hover group"
        >
          <div class="overflow-hidden">
            <img 
              :src="post.image" 
              :alt="post.title" 
              class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
            >
          </div>
          <div class="p-6">
            <div class="flex items-center space-x-4 mb-4">
              <span class="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">{{ post.category }}</span>
              <span class="text-xs text-secondary">{{ post.date }}</span>
            </div>
            <h3 class="text-lg font-semibold mb-3">{{ post.title }}</h3>
            <p class="text-sm text-secondary mb-4">{{ post.excerpt }}</p>
            <a href="#" class="text-sm font-medium text-accent hover:text-accent-hover transition inline-flex items-center">
              Read More <span i="fas-arrow-right ml-1"></span>
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.blog-card:hover img {
  transform: scale(1.05);
}
</style>
