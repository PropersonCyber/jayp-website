<script setup lang="ts">
import { PLACEHOLDER_PRODUCT_THUMB } from '~/lib/constants'

const { t } = useI18n()
const localePath = useLocalePath()
const cart = useCartStore()
const config = useRuntimeConfig()
</script>

<template>
  <UiSheet v-model:open="cart.isOpen">
    <div class="flex flex-col h-full">
      <motion.div class="flex items-center justify-between p-4 border-b border-border">
        <h2 class="text-lg font-semibold">{{ t('cart.title') }}</h2>
        <button type="button" class="p-2 rounded-full hover:bg-muted" @click="cart.close()">
          <span class="i-lucide-x" />
        </button>
      </motion.div>

      <motion.div v-if="cart.isEmpty" class="flex-1 flex flex-col items-center justify-center p-8 text-muted-foreground">
        <span class="i-lucide-shopping-bag text-4xl mb-4 opacity-40" />
        <p>{{ t('cart.empty') }}</p>
        <UiButton class="mt-4" variant="outline" @click="cart.close(); navigateTo(localePath('/collections/velvet-bags'))">
          {{ t('cart.continueShopping') }}
        </UiButton>
      </motion.div>

      <motion.ul v-else class="flex-1 overflow-y-auto p-4 space-y-4">
        <motion.li
          v-for="item in cart.items"
          :key="item.variantId"
          class="flex gap-3"
          :initial="{ opacity: 0, x: 20 }"
          :enter="{ opacity: 1, x: 0 }"
        >
          <img
            :src="item.image || PLACEHOLDER_PRODUCT_THUMB"
            :alt="item.productTitle"
            class="w-20 h-20 object-cover rounded-lg bg-muted border border-border mix-blend-multiply"
          >
          <div class="flex-1 min-w-0">
            <NuxtLink
              :to="localePath(`/products/${item.productSlug}`)"
              class="font-medium text-sm hover:text-primary line-clamp-1"
              @click="cart.close()"
            >
              {{ item.productTitle }}
            </NuxtLink>
            <p class="text-xs text-muted-foreground">{{ item.variantLabel }}</p>
            <div class="flex items-center gap-2 mt-2">
              <button type="button" class="w-7 h-7 border border-border rounded-md" @click="cart.updateQty(item.variantId, item.qty - 1)">−</button>
              <span class="text-sm w-6 text-center">{{ item.qty }}</span>
              <button type="button" class="w-7 h-7 border border-border rounded-md" @click="cart.updateQty(item.variantId, item.qty + 1)">+</button>
              <button type="button" class="ml-auto text-xs text-destructive" @click="cart.removeItem(item.variantId)">
                {{ t('cart.remove') }}
              </button>
            </div>
            <p class="text-sm font-medium mt-1">
              {{ formatPrice(item.snapshotPrice * item.qty, config.public.currency) }}
            </p>
          </div>
        </motion.li>
      </motion.ul>

      <motion.div v-if="!cart.isEmpty" class="border-t border-border p-4 space-y-3">
        <div class="flex justify-between text-sm">
          <span class="text-muted-foreground">{{ t('cart.subtotal') }}</span>
          <span>{{ formatPrice(cart.subtotal, config.public.currency) }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-muted-foreground">{{ t('cart.shipping') }}</span>
          <span class="text-muted-foreground">{{ t('cart.shippingCalculated') }}</span>
        </div>
        <motion.div class="flex justify-between font-semibold border-t border-border pt-3">
          <span>{{ t('cart.total') }}</span>
          <span>{{ formatPrice(cart.subtotal, config.public.currency) }}</span>
        </motion.div>
        <UiButton class="w-full" @click="cart.close(); navigateTo(localePath('/checkout'))">
          {{ t('cart.checkout') }}
        </UiButton>
      </motion.div>
    </div>
  </UiSheet>
</template>
