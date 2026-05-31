<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const scrollTo = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const headerHeight = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  }
};

const steps = [
  {
    num: "01",
    key: "inquiry"
  },
  {
    num: "02",
    key: "design"
  },
  {
    num: "03",
    key: "production"
  },
  {
    num: "04",
    key: "qc"
  },
  {
    num: "05",
    key: "delivery"
  }
];
</script>

<template>
  <section id="process" class="py-20 lg:py-32">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <span class="text-sm font-semibold text-accent tracking-wider uppercase"
          >{{ t('process.tag') }}</span
        >
        <h2 class="text-3xl lg:text-4xl font-bold mt-4 mb-6">
          {{ t('process.title') }}
        </h2>
        <p class="text-lg text-secondary max-w-2xl mx-auto">
          {{ t('process.subtitle') }}
        </p>
      </div>

      <div class="relative">
        <!-- Process Timeline -->
        <div
          class="hidden lg:block absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-gray-200 via-accent to-gray-200"
        ></div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div
            v-for="step in steps"
            :key="step.num"
            class="relative text-center"
          >
            <div
              class="w-16 h-16 bg-accent text-white rounded-2xl flex items-center justify-center mx-auto mb-6 relative z-10 shadow-lg"
            >
              <span class="text-2xl font-bold">{{ step.num }}</span>
            </div>
            <h3 class="text-lg font-semibold mb-3">{{ t(`process.steps.${step.key}`) }}</h3>
            <p class="text-sm text-secondary">{{ t(`process.steps.${step.key}Desc`) }}</p>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center mt-16">
        <div
          class="inline-flex items-center space-x-4 bg-surface rounded-full px-8 py-4"
        >
          <span class="text-secondary">{{ t('process.needSamples') }}</span>
          <button
            @click="scrollTo('contact')"
            class="btn-primary px-6 py-2 rounded-full text-sm font-medium"
          >
            {{ t('process.requestSample') }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
