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

const footerLinks = {
  products: ['Velvet Bags', 'Cotton Bags', 'Canvas Bags', 'Drawstring Bags', 'Jewelry Pouches'],
  company: ['About Us', 'Our Factory', 'Quality Control', 'Sustainability', 'Careers'],
  resources: ['Catalog', 'Blog', 'Case Studies', 'FAQ', 'Support']
}

const socialLinks = ['fab-linkedin-in', 'fab-facebook-f', 'fab-twitter', 'fab-instagram']

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-secondary pt-20 pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
        <!-- Company Info -->
        <div class="col-span-2 lg:col-span-1">
          <div class="flex items-center space-x-2 mb-6">
            <div class="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
              <span class="text-white font-bold text-xl">P</span>
            </div>
            <span class="text-xl font-semibold text-white">PremiumPack</span>
          </div>
          <p class="text-gray-400 text-sm mb-6">
            {{ t('footer.tagline') }}
          </p>
          <div class="flex space-x-4">
            <a 
              v-for="social in socialLinks" 
              :key="social"
              href="#" 
              class="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition"
            >
              <span :class="social + ' text-gray-400'"></span>
            </a>
          </div>
        </div>
        
        <!-- Products -->
        <div>
          <h4 class="text-white font-semibold mb-4">{{ t('footer.products') }}</h4>
          <ul class="space-y-3">
            <li v-for="link in footerLinks.products" :key="link">
              <a href="#" class="text-gray-400 hover:text-white text-sm transition">{{ link }}</a>
            </li>
          </ul>
        </div>
        
        <!-- Company -->
        <div>
          <h4 class="text-white font-semibold mb-4">{{ t('footer.company') }}</h4>
          <ul class="space-y-3">
            <li v-for="link in footerLinks.company" :key="link">
              <a href="#" class="text-gray-400 hover:text-white text-sm transition">{{ link }}</a>
            </li>
          </ul>
        </div>
        
        <!-- Resources -->
        <div>
          <h4 class="text-white font-semibold mb-4">{{ t('footer.resources') }}</h4>
          <ul class="space-y-3">
            <li v-for="link in footerLinks.resources" :key="link">
              <a href="#" class="text-gray-400 hover:text-white text-sm transition">{{ link }}</a>
            </li>
          </ul>
        </div>
        
        <!-- Contact -->
        <div>
          <h4 class="text-white font-semibold mb-4">{{ t('footer.contactTitle') }}</h4>
          <ul class="space-y-3">
            <li class="text-gray-400 text-sm">{{ t('footer.contactEmail') }}</li>
            <li class="text-gray-400 text-sm">{{ t('footer.contactPhone') }}</li>
            <li class="text-gray-400 text-sm">Mon-Fri: 9AM-6PM</li>
          </ul>
          <div class="mt-4">
            <button @click="scrollTo('contact')" class="text-sm font-medium text-accent hover:text-accent-hover transition">
              {{ t('footer.getQuote') }} →
            </button>
          </div>
        </div>
      </div>
      
      <!-- Bottom Footer -->
      <div class="border-t border-gray-700 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p class="text-gray-400 text-sm">© {{ currentYear }} PremiumPack. {{ t('footer.copyright') }}</p>
          <div class="flex flex-wrap justify-center space-x-6">
            <a href="#" class="text-gray-400 hover:text-white text-sm transition">{{ t('footer.privacy') }}</a>
            <a href="#" class="text-gray-400 hover:text-white text-sm transition">{{ t('footer.terms') }}</a>
            <a href="#" class="text-gray-400 hover:text-white text-sm transition">{{ t('footer.cookies') }}</a>
          </div>
          <div class="flex items-center space-x-4">
            <div class="w-8 h-8 bg-gray-700 rounded flex items-center justify-center text-xs text-gray-400">VISA</div>
            <div class="w-8 h-8 bg-gray-700 rounded flex items-center justify-center text-xs text-gray-400">MC</div>
            <div class="w-8 h-8 bg-gray-700 rounded flex items-center justify-center text-xs text-gray-400">PP</div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
