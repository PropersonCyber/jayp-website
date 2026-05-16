<script setup lang="ts">
import type { OrderPayload } from '~/types'

const props = defineProps<{ form: Omit<OrderPayload, 'items'> }>()
const { t } = useI18n()
const cart = useCartStore()
const config = useRuntimeConfig()
const loading = ref(false)

const stripeEnabled = computed(() => !!config.public.stripePublishableKey)

async function payWithStripe() {
  if (cart.isEmpty) return
  loading.value = true
  try {
    const res = await $fetch<{ url: string }>('/api/stripe/create-checkout-session', {
      method: 'POST',
      body: {
        ...props.form,
        locale: useI18n().locale.value,
        items: cart.items,
        success_url: `${config.public.siteUrl}${useLocalePath()('/account')}?payment=success`,
        cancel_url: `${config.public.siteUrl}${useLocalePath()('/checkout')}`,
      },
    })
    if (res.url) window.location.href = res.url
  } catch {
    alert(t('common.error'))
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UiButton
    v-if="stripeEnabled"
    type="button"
    variant="outline"
    class="w-full"
    :disabled="loading || cart.isEmpty"
    @click="payWithStripe"
  >
    Pay with Stripe
  </UiButton>
</template>
