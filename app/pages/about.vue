<script setup lang="ts">
import { aboutValues } from '~/data/content'

const { t } = useI18n()

useSeoMeta({ title: t('about.title') })
</script>

<template>
  <motion.div>
    <section class="container-site py-12 lg:py-16 grid lg:grid-cols-2 gap-10 items-center">
      <motion.div
        :initial="{ opacity: 0, x: -20 }"
        :enter="{ opacity: 1, x: 0 }"
      >
        <h1 class="mb-6">{{ t('about.title') }}</h1>
        <p class="text-muted-foreground leading-relaxed">
          {{ t('about.lead') }}
        </p>
      </motion.div>
      <motion.div class="aspect-[4/3] rounded-[var(--radius)] overflow-hidden bg-muted border border-border shadow-soft">
        <img
          src="https://images.unsplash.com/photo-1607083206869-4c8d2f4bf528?w=800&h=600&fit=crop"
          alt="BAGLUXE craftsmanship"
          class="w-full h-full object-cover"
        >
      </motion.div>
    </section>

    <section class="bg-white py-12">
      <motion.div class="container-site">
        <h2 class="text-center mb-10">{{ t('about.values') }}</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            v-for="(v, i) in aboutValues"
            :key="i"
            class="text-center p-6 border border-border rounded-xl shadow-soft"
            :initial="{ opacity: 0, y: 12 }"
            :enter="{ opacity: 1, y: 0 }"
            :delay="i * 80"
          >
            <h3 class="font-medium mb-2">{{ v.title }}</h3>
            <p class="text-sm text-muted-foreground">{{ v.description }}</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  </motion.div>
</template>
