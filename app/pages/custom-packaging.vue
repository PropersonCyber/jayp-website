<script setup lang="ts">
import type { QuotePayload } from '~/types'
import { customServices } from '~/data/content'

const { t, locale } = useI18n()
const localePath = useLocalePath()

const form = reactive({
  company: '',
  contact_name: '',
  email: '',
  phone: '',
  product_type: 'velvet',
  quantity: 100,
  requirements: '',
})
const loading = ref(false)
const success = ref(false)

async function submit() {
  loading.value = true
  try {
    const payload: QuotePayload = { ...form, locale: locale.value }
    await $fetch('/api/quote', { method: 'POST', body: payload })
    success.value = true
  } catch {
    alert(t('common.error'))
  } finally {
    loading.value = false
  }
}

useSeoMeta({ title: t('custom.title') })
</script>

<template>
  <motion.div>
    <section class="bg-primary text-white py-14">
      <div class="container-site text-center">
        <h1 class="text-[2.2rem] mb-4">{{ t('custom.title') }}</h1>
        <p class="text-white/80 text-sm md:text-base">{{ t('custom.subtitle') }}</p>
      </div>
    </section>

    <section class="container-site py-12 grid lg:grid-cols-2 gap-8 lg:gap-10">
      <motion.div>
        <h2 class="text-[1.7rem] mb-6">{{ t('custom.getQuote') }}</h2>
        <div class="grid sm:grid-cols-2 gap-4 mb-8">
          <motion.div
            v-for="(svc, i) in customServices"
            :key="i"
            class="border border-border rounded-xl p-4 bg-white shadow-soft"
            :initial="{ opacity: 0, y: 8 }"
            :enter="{ opacity: 1, y: 0 }"
            :delay="i * 50"
          >
            <h3 class="font-medium text-sm mb-1">{{ svc.title }}</h3>
            <p class="text-xs text-muted-foreground">{{ svc.description }}</p>
          </motion.div>
        </div>
      </motion.div>

      <motion.div class="bg-white border border-border rounded-[var(--radius)] p-6 lg:p-8 shadow-soft">
        <motion.div v-if="success" class="text-center py-8">
          <span class="i-lucide-check-circle text-4xl text-primary mb-4 block" />
          <p>{{ t('custom.success') }}</p>
        </motion.div>
        <form v-else class="space-y-4" @submit.prevent="submit">
          <div>
            <UiLabel>{{ t('custom.company') }}</UiLabel>
            <UiInput v-model="form.company" required />
          </div>
          <div>
            <UiLabel>{{ t('custom.contactName') }}</UiLabel>
            <UiInput v-model="form.contact_name" required />
          </div>
          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <UiLabel>{{ t('checkout.email') }}</UiLabel>
              <UiInput v-model="form.email" type="email" required />
            </div>
            <div>
              <UiLabel>{{ t('checkout.phone') }}</UiLabel>
              <UiInput v-model="form.phone" required />
            </div>
          </div>
          <div>
            <UiLabel>{{ t('custom.productType') }}</UiLabel>
            <UiSelect v-model="form.product_type">
              <UiSelectTrigger class="w-full bg-white">
                <UiSelectValue :placeholder="t('custom.productType')" />
              </UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem value="velvet">Velvet Bags</UiSelectItem>
                <UiSelectItem value="cotton">Cotton Bags</UiSelectItem>
                <UiSelectItem value="organza">Organza Bags</UiSelectItem>
                <UiSelectItem value="linen">Linen Bags</UiSelectItem>
                <UiSelectItem value="jute">Jute Bags</UiSelectItem>
                <UiSelectItem value="other">Other / Mixed</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
          <div>
            <UiLabel>{{ t('custom.quantity') }}</UiLabel>
            <UiInput v-model.number="form.quantity" type="number" :min="1" required />
          </div>
          <div>
            <UiLabel>{{ t('custom.requirements') }}</UiLabel>
            <UiTextarea v-model="form.requirements" rows="5" required />
          </div>
          <UiButton type="submit" class="w-full" :disabled="loading">{{ t('custom.submit') }}</UiButton>
        </form>
      </motion.div>
    </section>
  </motion.div>
</template>
