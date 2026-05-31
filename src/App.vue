<script setup lang="ts">
import Header from './components/layout/Header.vue'
import Hero from './components/sections/Hero.vue'
import TrustedBy from './components/sections/TrustedBy.vue'
import ProductCategories from './components/sections/ProductCategories.vue'
import Factory from './components/sections/Factory.vue'
import WhyChooseUs from './components/sections/WhyChooseUs.vue'
import Process from './components/sections/Process.vue'
import Testimonials from './components/sections/Testimonials.vue'
import FAQ from './components/sections/FAQ.vue'
import Blog from './components/sections/Blog.vue'
import Contact from './components/sections/Contact.vue'
import Newsletter from './components/ui/Newsletter.vue'
import Footer from './components/layout/Footer.vue'
import BackToTop from './components/ui/BackToTop.vue'
</script>

<template>
  <div class="font-sans antialiased bg-white text-primary min-h-screen">
    <Header />
    <Hero />
    <TrustedBy />
    <ProductCategories />
    <Factory />
    <WhyChooseUs />
    <Process />
    <Testimonials />
    <FAQ />
    <Blog />
    <Contact />
    <Newsletter />
    <Footer />
    <BackToTop />
  </div>
</template>

<style>
body {
  font-family: 'Inter', system-ui, sans-serif;
}

* {
  scroll-behavior: smooth;
}

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

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeInUp 0.6s ease forwards;
}

.gradient-text {
  background: linear-gradient(135deg, #0a0a0a 0%, #6366f1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
