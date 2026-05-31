<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const formData = ref({
  fullName: '',
  company: '',
  email: '',
  phone: '',
  country: '',
  product: '',
  message: '',
  privacy: false
})

const countries = [
  'United States', 'United Kingdom', 'Canada', 'Germany', 'France', 
  'Australia', 'United Arab Emirates', 'Saudi Arabia', 'Other'
]

const products = [
  'Velvet Bags', 'Cotton Bags', 'Canvas Bags', 'Drawstring Bags',
  'Jewelry Pouches', 'Gift Bags', 'PU Leather Bags', 'Custom Design'
]

const contactInfo = [
  {
    icon: 'fas-map-marker-alt',
    title: 'address',
    content: 'addressContent'
  },
  {
    icon: 'fas-envelope',
    title: 'email',
    content: 'emailSales'
  },
  {
    icon: 'fas-phone',
    title: 'phone',
    content: 'phoneMain'
  },
  {
    icon: 'fas-clock',
    title: 'hours',
    content: 'hoursDesc'
  }
]

const socialLinks = ['fab-linkedin-in', 'fab-facebook-f', 'fab-instagram', 'fab-youtube']

const submitForm = () => {
  if (!formData.value.fullName || !formData.value.email || !formData.value.message) {
    alert(t('contact.required'))
    return
  }
  if (!formData.value.privacy) {
    alert(t('contact.privacyRequired'))
    return
  }
  alert(t('contact.thankYou'))
  formData.value = {
    fullName: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    product: '',
    message: '',
    privacy: false
  }
}
</script>

<template>
  <section id="contact" class="py-20 lg:py-32">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-16">
        <div>
          <span class="text-sm font-semibold text-accent tracking-wider uppercase">{{ t('contact.tag') }}</span>
          <h2 class="text-3xl lg:text-4xl font-bold mt-4 mb-6">{{ t('contact.title') }}</h2>
          <p class="text-lg text-secondary leading-relaxed mb-8">
            {{ t('contact.subtitle') }}
          </p>
          
          <div class="space-y-6">
            <div 
              v-for="info in contactInfo" 
              :key="info.title"
              class="flex items-start space-x-4"
            >
              <div class="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <span :class="info.icon + ' text-accent text-xl'"></span>
              </div>
              <div>
                <h3 class="font-semibold mb-1">{{ t(`contact.${info.title}`) }}</h3>
                <p class="text-secondary whitespace-pre-line">{{ t(`contact.${info.content}`) }}</p>
              </div>
            </div>
          </div>
          
          <div class="mt-8">
            <p class="text-sm font-medium mb-4">{{ t('contact.followUs') }}</p>
            <div class="flex space-x-4">
              <a 
                v-for="social in socialLinks" 
                :key="social"
                href="#" 
                class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition"
              >
                <span :class="social + ' text-secondary'"></span>
              </a>
            </div>
          </div>
        </div>
        
        <div class="bg-surface rounded-2xl p-8 lg:p-10">
          <h3 class="text-xl font-semibold mb-6">{{ t('contact.formTitle') }}</h3>
          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium mb-2">{{ t('contact.fullName') }} *</label>
                <input 
                  v-model="formData.fullName"
                  type="text" 
                  required
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-accent transition"
                  placeholder="John Smith"
                >
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">{{ t('contact.company') }}</label>
                <input 
                  v-model="formData.company"
                  type="text" 
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-accent transition"
                  placeholder="Your Company Name"
                >
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium mb-2">{{ t('contact.emailLabel') }} *</label>
                <input 
                  v-model="formData.email"
                  type="email" 
                  required
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-accent transition"
                  placeholder="john@company.com"
                >
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">{{ t('contact.phoneLabel') }}</label>
                <input 
                  v-model="formData.phone"
                  type="tel" 
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-accent transition"
                  placeholder="+1 234 567 8900"
                >
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-2">{{ t('contact.country') }}</label>
              <select 
                v-model="formData.country"
                class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-accent transition"
              >
                <option value="">{{ t('contact.selectCountry') }}</option>
                <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-2">{{ t('contact.productInterest') }}</label>
              <select 
                v-model="formData.product"
                class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-accent transition"
              >
                <option value="">{{ t('contact.selectProduct') }}</option>
                <option v-for="product in products" :key="product" :value="product">{{ product }}</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-2">{{ t('contact.message') }} *</label>
              <textarea 
                v-model="formData.message"
                required 
                rows="4" 
                class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-accent transition resize-none"
                :placeholder="t('contact.messagePlaceholder')"
              ></textarea>
            </div>
            
            <div class="flex items-start space-x-3">
              <input 
                v-model="formData.privacy"
                type="checkbox" 
                id="privacy" 
                required 
                class="mt-1"
              >
              <label for="privacy" class="text-sm text-secondary">
                {{ t('contact.privacy', { privacyLink: '' }) }}
                <a href="#" class="text-accent hover:underline">{{ t('contact.privacyLink') }}</a>.
              </label>
            </div>
            
            <button type="submit" class="btn-primary w-full py-4 rounded-full text-base font-medium">
              {{ t('contact.sendInquiry') }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
