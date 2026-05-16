// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@vueuse/motion/nuxt',
    'shadcn-nuxt',
  ],

  css: ['~/assets/css/tailwind.css', '~/assets/css/main.css'],

  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: '',
  },

  i18n: {
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'zh', language: 'zh-CN', name: '中文', file: 'zh.json' },
    ],
    defaultLocale: 'en',
    strategy: 'prefix',
    langDir: 'locales',
    detectBrowserLanguage: false,
  },

  runtimeConfig: {
    directusUrl: process.env.DIRECTUS_URL || 'http://localhost:8055',
    directusServerToken: process.env.DIRECTUS_SERVER_TOKEN || '',
    resendApiKey: process.env.RESEND_API_KEY || '',
    resendFromEmail: process.env.RESEND_FROM_EMAIL || 'orders@bagluxe.com',
    salesEmail: process.env.SALES_EMAIL || 'sales@bagluxe.com',
    stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      directusUrl: process.env.NUXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055',
      stripePublishableKey: process.env.NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
      brandName: 'BAGLUXE',
      currency: 'USD',
    },
  },

  image: {
    directus: {
      baseURL: process.env.NUXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055',
    },
  },

  nitro: {
    preset: 'vercel',
  },

  imports: {
    dirs: ['app/lib'],
  },

  app: {
    head: {
      titleTemplate: '%s | BAGLUXE',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Premium fabric packaging for elevated brands.' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@500;600;700&display=swap' },
      ],
    },
  },

  shadcn: {
    prefix: 'Ui',
    componentDir: './app/components/ui',
  },

  routeRules: {
    '/': { prerender: true },
    '/en': { prerender: true },
    '/zh': { prerender: true },
    '/en/about': { prerender: true },
    '/zh/about': { prerender: true },
  },
})
