<script setup lang="ts">
import type { OrderPayload } from '~/types'
import { PLACEHOLDER_PRODUCT_THUMB } from '~/lib/constants'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const cart = useCartStore()
const config = useRuntimeConfig()
const route = useRoute()

const step = ref(1)
const paymentMethod = ref('card')
const loading = ref(false)

const countries = [
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'AU', label: 'Australia' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
  { value: 'CN', label: 'China' },
]
const orderNumber = ref('')
const success = ref(false)

const form = reactive({
  email: '',
  first_name: '',
  last_name: '',
  company: '',
  phone: '',
  address_line1: '',
  address_line2: '',
  city: '',
  state: '',
  postal_code: '',
  country: 'US',
  notes: '',
})

onMounted(() => {
  cart.hydrate()
  if (route.query.buyNow && cart.isEmpty) {
    navigateTo(localePath('/collections/velvet-bags'))
  }
})

async function submitOrder() {
  if (cart.isEmpty) return
  loading.value = true
  try {
    const payload: OrderPayload = {
      ...form,
      locale: locale.value,
      items: cart.items,
    }
    const res = await $fetch<{ order_number: string }>('/api/checkout', {
      method: 'POST',
      body: payload,
    })
    orderNumber.value = res.order_number
    success.value = true
    cart.clear()
  } catch {
    alert(t('common.error'))
  } finally {
    loading.value = false
  }
}

useSeoMeta({ title: t('checkout.title') })
</script>

<template>
  <div class="container-site py-8 lg:py-10">
    <h1 class="text-[2rem] mb-8">{{ t('checkout.title') }}</h1>

    <motion.div v-if="success" class="max-w-lg mx-auto text-center py-16">
      <span class="i-lucide-check-circle text-5xl text-primary mb-4 block" />
      <h2 class="text-xl font-semibold mb-2">{{ t('checkout.success') }}</h2>
      <p class="text-muted-foreground">{{ t('checkout.orderNumber') }}: <strong>{{ orderNumber }}</strong></p>
      <UiButton class="mt-6" as="NuxtLink" :to="localePath('/')">{{ t('common.home') }}</UiButton>
    </motion.div>

    <motion.div v-else-if="cart.isEmpty" class="text-center py-16">
      <p class="text-muted-foreground mb-4">{{ t('cart.empty') }}</p>
      <UiButton as="NuxtLink" :to="localePath('/collections/velvet-bags')">{{ t('cart.continueShopping') }}</UiButton>
    </motion.div>

    <div v-else class="grid lg:grid-cols-3 gap-8 lg:gap-10">
      <div class="lg:col-span-2 space-y-8 surface-card p-5 lg:p-7">
        <!-- Steps indicator -->
        <div class="flex gap-4 text-sm border-b border-border pb-4">
          <span :class="step >= 1 ? 'text-primary font-medium' : 'text-muted-foreground'">1. {{ t('checkout.contact') }}</span>
          <span :class="step >= 2 ? 'text-primary font-medium' : 'text-muted-foreground'">2. {{ t('checkout.shipping') }}</span>
          <span :class="step >= 3 ? 'text-primary font-medium' : 'text-muted-foreground'">3. {{ t('checkout.review') }}</span>
        </div>

        <form @submit.prevent="step < 3 ? step++ : submitOrder()">
          <motion.div v-show="step === 1" class="space-y-4">
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <UiLabel>{{ t('checkout.firstName') }}</UiLabel>
                <UiInput v-model="form.first_name" required />
              </div>
              <div>
                <UiLabel>{{ t('checkout.lastName') }}</UiLabel>
                <UiInput v-model="form.last_name" required />
              </div>
            </div>
            <div>
              <UiLabel>{{ t('checkout.email') }}</UiLabel>
              <UiInput v-model="form.email" type="email" required />
            </div>
            <motion.div>
              <UiLabel>{{ t('checkout.company') }}</UiLabel>
              <UiInput v-model="form.company" />
            </motion.div>
            <div>
              <UiLabel>{{ t('checkout.phone') }}</UiLabel>
              <UiInput v-model="form.phone" required />
            </div>
          </motion.div>

          <motion.div v-show="step === 2" class="space-y-4">
            <div>
              <UiLabel>{{ t('checkout.address') }}</UiLabel>
              <UiInput v-model="form.address_line1" required />
            </div>
            <div>
              <UiLabel>{{ t('checkout.address2') }}</UiLabel>
              <UiInput v-model="form.address_line2" />
            </div>
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <UiLabel>{{ t('checkout.city') }}</UiLabel>
                <UiInput v-model="form.city" required />
              </div>
              <div>
                <UiLabel>{{ t('checkout.state') }}</UiLabel>
                <UiInput v-model="form.state" />
              </div>
            </div>
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <UiLabel>{{ t('checkout.postalCode') }}</UiLabel>
                <UiInput v-model="form.postal_code" required />
              </div>
              <div>
                <UiLabel>{{ t('checkout.country') }}</UiLabel>
                <UiSelect v-model="form.country">
                  <UiSelectTrigger class="w-full bg-white">
                    <UiSelectValue />
                  </UiSelectTrigger>
                  <UiSelectContent>
                    <UiSelectItem v-for="c in countries" :key="c.value" :value="c.value">
                      {{ c.label }}
                    </UiSelectItem>
                  </UiSelectContent>
                </UiSelect>
              </div>
            </div>
            <div>
              <UiLabel>{{ t('checkout.notes') }}</UiLabel>
              <UiTextarea v-model="form.notes" />
            </div>
          </motion.div>

          <motion.div v-show="step === 3" class="space-y-4">
            <div>
              <p class="text-sm font-medium mb-3">{{ t('checkout.payment') }}</p>
              <motion.div class="space-y-3">
                <label class="flex items-center gap-3 border border-border rounded-lg p-4 cursor-pointer hover:border-primary/40 transition-colors" :class="paymentMethod === 'card' ? 'border-primary bg-primary/5' : ''">
                  <input v-model="paymentMethod" type="radio" value="card" class="accent-primary">
                  <span class="i-lucide-credit-card text-primary" />
                  <span class="text-sm font-medium">{{ t('checkout.paymentCard') }}</span>
                </label>
                <label class="flex items-center gap-3 border border-border rounded-lg p-4 cursor-pointer hover:border-primary/40 transition-colors" :class="paymentMethod === 'paypal' ? 'border-primary bg-primary/5' : ''">
                  <input v-model="paymentMethod" type="radio" value="paypal" class="accent-primary">
                  <span class="font-semibold text-sm text-[#003087]">PayPal</span>
                </label>
              </motion.div>
            </div>
            <p class="text-muted-foreground text-sm">{{ t('checkout.review') }}</p>
            <div class="bg-muted/50 rounded-lg p-4 text-sm space-y-1">
              <p>{{ form.first_name }} {{ form.last_name }} · {{ form.email }}</p>
              <p>{{ form.address_line1 }}, {{ form.city }}, {{ form.postal_code }}, {{ form.country }}</p>
            </div>
          </motion.div>

          <div class="flex gap-3 mt-6">
            <UiButton v-if="step > 1" type="button" variant="outline" @click="step--">{{ t('common.back') }}</UiButton>
            <UiButton type="submit" :disabled="loading" class="ml-auto">
              {{ step < 3 ? t('checkout.continue') : t('checkout.placeOrder') }}
            </UiButton>
          </div>
        </form>
      </div>

      <aside class="lg:col-span-1">
        <div class="border border-border rounded-[var(--radius)] p-6 bg-white sticky top-24 shadow-soft">
          <h2 class="font-semibold mb-4">{{ t('checkout.orderSummary') }}</h2>
          
          <UiTable class="mb-4">
            <UiTableHeader>
              <UiTableRow>
                <UiTableHead class="pl-0">{{ t('cart.product') }}</UiTableHead>
                <UiTableHead class="text-right pr-0">{{ t('cart.total') }}</UiTableHead>
              </UiTableRow>
            </UiTableHeader>
            <UiTableBody>
              <UiTableRow v-for="item in cart.items" :key="item.variantId">
                <UiTableCell class="pl-0">
                  <div class="flex items-center gap-3">
                    <img :src="item.image || PLACEHOLDER_PRODUCT_THUMB" :alt="item.productTitle" class="w-10 h-10 rounded object-cover bg-muted mix-blend-multiply">
                    <div>
                      <p class="font-medium text-sm line-clamp-1">{{ item.productTitle }}</p>
                      <p class="text-xs text-muted-foreground">{{ item.variantLabel }} × {{ item.qty }}</p>
                    </div>
                  </div>
                </UiTableCell>
                <UiTableCell class="text-right pr-0">{{ formatPrice(item.snapshotPrice * item.qty, config.public.currency) }}</UiTableCell>
              </UiTableRow>
            </UiTableBody>
          </UiTable>

          <motion.div class="flex justify-between font-semibold border-t pt-4">
            <span>{{ t('cart.subtotal') }}</span>
            <span>{{ formatPrice(cart.subtotal, config.public.currency) }}</span>
          </motion.div>
          <CheckoutStripePayButton v-if="step === 3" :form="form" class="mt-4" />
        </div>
      </aside>
    </div>
  </div>
</template>
