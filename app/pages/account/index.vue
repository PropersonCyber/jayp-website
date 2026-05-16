<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const auth = useAuthStore()
const route = useRoute()

const email = ref('')
const password = ref('')
const loading = ref(false)
const orders = ref<{ order_number: string; status: string; total: number; date_created: string }[]>([])

onMounted(() => {
  auth.hydrate()
  if (auth.isLoggedIn) fetchOrders()
})

async function login() {
  loading.value = true
  try {
    const res = await $fetch<{ user: { id: string; email: string; first_name?: string }; token: string }>('/api/auth/login', {
      method: 'POST',
      body: { email: email.value, password: password.value },
    })
    auth.setUser({ id: res.user.id, email: res.user.email, first_name: res.user.first_name }, res.token)
    await fetchOrders()
  } catch {
    alert(t('common.error'))
  } finally {
    loading.value = false
  }
}

async function fetchOrders() {
  if (!auth.token) return
  try {
    orders.value = await $fetch('/api/account/orders', {
      headers: { Authorization: `Bearer ${auth.token}` },
    })
  } catch { /* ignore */ }
}

function logout() {
  auth.logout()
  orders.value = []
}

useSeoMeta({ title: t('account.title') })
</script>

<template>
  <div class="container-site py-12 max-w-lg mx-auto">
    <h1 class="text-[2rem] mb-8 text-center">{{ t('account.title') }}</h1>

    <motion.div v-if="!auth.isLoggedIn" class="bg-white border border-border rounded-[var(--radius)] p-6 space-y-4 shadow-soft">
      <div>
        <UiLabel>{{ t('account.email') }}</UiLabel>
        <UiInput v-model="email" type="email" />
      </div>
      <div>
        <UiLabel>{{ t('account.password') }}</UiLabel>
        <UiInput v-model="password" type="password" />
      </div>
      <UiButton class="w-full" :disabled="loading" @click="login">{{ t('account.login') }}</UiButton>
      <p class="text-xs text-center text-muted-foreground">
        Phase 2: Full registration with Directus Users
      </p>
    </motion.div>

    <motion.div v-else>
      <div class="flex justify-between items-center mb-6">
        <p class="text-sm">Signed in as <strong>{{ auth.user?.email }}</strong></p>
        <UiButton variant="outline" size="sm" @click="logout">{{ t('account.logout') }}</UiButton>
      </div>

      <h2 class="font-semibold mb-4">{{ t('account.orders') }}</h2>
      <motion.div v-if="orders.length" class="space-y-3">
        <div v-for="o in orders" :key="o.order_number" class="border border-border rounded-lg p-4 text-sm bg-white">
          <motion.div class="flex justify-between">
            <span class="font-medium">{{ o.order_number }}</span>
            <span class="capitalize">{{ o.status }}</span>
          </motion.div>
          <p class="text-muted-foreground mt-1">{{ o.date_created?.slice(0, 10) }}</p>
        </div>
      </motion.div>
      <p v-else class="text-muted-foreground text-sm">{{ t('account.noOrders') }}</p>

      <UiButton
        v-if="route.query.payment === 'success'"
        class="mt-6 w-full"
        as="NuxtLink"
        :to="localePath('/collections/velvet-bags')"
      >
        Continue Shopping
      </UiButton>
    </motion.div>
  </div>
</template>
