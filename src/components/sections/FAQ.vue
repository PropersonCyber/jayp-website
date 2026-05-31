<script setup lang="ts">
import { ref } from 'vue'

const activeIndex = ref<number | null>(null)

const faqs = [
  {
    question: 'What is your minimum order quantity (MOQ)?',
    answer: 'Our MOQ varies by product type. For standard products, MOQ starts at 500 pieces per design. For custom orders with branding, MOQ typically starts at 1,000 pieces. Contact us for specific requirements - we\'re flexible for the right partnership.'
  },
  {
    question: 'How long does production take?',
    answer: 'Standard orders typically take 2-3 weeks for production. Custom orders with special materials or branding may take 3-4 weeks. Express production is available for urgent orders with additional fees. We always provide clear timelines upfront.'
  },
  {
    question: 'Do you offer free samples?',
    answer: 'Yes! We offer free samples for standard products (shipping cost applies). For custom orders, we provide paid samples that are deducted from your final order. Sample lead time is typically 5-7 days. We want you to be 100% confident before placing orders.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept T/T, L/C, PayPal, and Western Union. For first-time orders, we typically require 30% deposit with balance paid before shipping. Regular clients may qualify for open payment terms. Currency options include USD, EUR, and GBP.'
  },
  {
    question: 'Do you ship worldwide?',
    answer: 'Absolutely! We ship to 120+ countries worldwide. We work with major freight forwarders (DHL, FedEx, UPS) and offer sea freight for large orders. All shipments include tracking and insurance. Shipping costs are calculated based on volume and destination.'
  },
  {
    question: 'Can I customize the logo and design?',
    answer: 'Yes! We offer comprehensive customization including logo printing (screen, offset, digital), embroidery, embossing, debossing, and metal hardware. Our design team will work with you to perfect your artwork and ensure the best production method for your vision.'
  }
]

const toggleFAQ = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index
}
</script>

<template>
  <section class="py-20 lg:py-32">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <span class="text-sm font-semibold text-accent tracking-wider uppercase">FAQ</span>
        <h2 class="text-3xl lg:text-4xl font-bold mt-4 mb-6">Frequently Asked Questions</h2>
        <p class="text-lg text-secondary">Find answers to common questions about our products and services.</p>
      </div>
      
      <div class="space-y-4">
        <div 
          v-for="(faq, index) in faqs" 
          :key="index"
          class="bg-white rounded-2xl border border-gray-100 overflow-hidden"
          :class="{ 'ring-2 ring-accent': activeIndex === index }"
        >
          <button 
            @click="toggleFAQ(index)"
            class="w-full px-6 py-5 text-left flex items-center justify-between transition-colors hover:bg-gray-50"
          >
            <span class="font-semibold pr-4">{{ faq.question }}</span>
            <span 
              i="fas-chevron-down text-secondary transition-transform duration-300"
              :class="{ 'rotate-180': activeIndex === index }"
            ></span>
          </button>
          <div 
            class="overflow-hidden transition-all duration-300"
            :class="activeIndex === index ? 'max-h-96' : 'max-h-0'"
          >
            <p class="px-6 pb-5 text-secondary leading-relaxed">{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>
