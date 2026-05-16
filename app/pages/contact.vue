<script setup lang="ts">
import type { ContactPayload } from '~/types'

const { t, locale } = useI18n()
const { getSiteSettings } = useCatalog()
const settings = await getSiteSettings()

const form = reactive({ name: '', email: '', subject: '', message: '' })
const loading = ref(false)
const success = ref(false)

async function submit() {
  loading.value = true
  try {
    const payload: ContactPayload = { ...form, locale: locale.value }
    await $fetch('/api/contact', { method: 'POST', body: payload })
    success.value = true
  } catch {
    alert(t('common.error'))
  } finally {
    loading.value = false
  }
}

useSeoMeta({ title: t('contact.title') })
</script>

<template>
  <div class="container-site py-12">
    <div class="text-center mb-12">
      <h1 class="mb-2">{{ t('contact.title') }}</h1>
      <p class="text-muted-foreground">{{ t('contact.subtitle') }}</p>
    </div>

    <div class="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
      <motion.div class="space-y-6">
        <div class="flex gap-4 items-start">
          <span class="i-lucide-mail text-primary text-xl mt-1" />
          <div>
            <p class="font-medium">{{ t('contact.emailLabel') }}</p>
            <a :href="`mailto:${settings.contact_email}`" class="text-muted-foreground hover:text-primary">{{ settings.contact_email }}</a>
          </div>
        </div>
        <div class="flex gap-4 items-start">
          <span class="i-lucide-phone text-primary text-xl mt-1" />
          <div>
            <p class="font-medium">{{ t('contact.phoneLabel') }}</p>
            <p class="text-muted-foreground">{{ settings.phone }}</p>
          </div>
        </div>
        <div class="flex gap-4 items-start">
          <span class="i-lucide-map-pin text-primary text-xl mt-1" />
          <div>
            <p class="font-medium">{{ t('contact.addressLabel') }}</p>
            <p class="text-muted-foreground">{{ settings.address }}</p>
          </div>
        </div>
      </motion.div>

      <motion.div class="bg-white border border-border rounded-[var(--radius)] p-6 shadow-soft">
        <motion.div v-if="success" class="text-center py-8">
          <span class="i-lucide-check-circle text-4xl text-primary mb-4 block" />
          <p>{{ t('contact.success') }}</p>
        </motion.div>
        <form v-else class="space-y-4" @submit.prevent="submit">
          <motion.div>
            <UiLabel>{{ t('contact.name') }}</UiLabel>
            <UiInput v-model="form.name" required />
          </motion.div>
          <div>
            <UiLabel>{{ t('checkout.email') }}</UiLabel>
            <UiInput v-model="form.email" type="email" required />
          </div>
          <div>
            <UiLabel>{{ t('contact.subject') }}</UiLabel>
            <UiInput v-model="form.subject" required />
          </div>
          <div>
            <UiLabel>{{ t('contact.message') }}</UiLabel>
            <UiTextarea v-model="form.message" rows="5" required />
          </div>
          <UiButton type="submit" class="w-full" :disabled="loading">{{ t('contact.send') }}</UiButton>
        </form>
      </motion.div>
    </div>
  </div>
</template>
