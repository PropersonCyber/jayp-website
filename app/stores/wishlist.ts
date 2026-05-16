import { defineStore } from 'pinia'

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    productIds: [] as string[],
  }),

  getters: {
    count: state => state.productIds.length,
    has: state => (id: string) => state.productIds.includes(id),
  },

  actions: {
    hydrate() {
      if (import.meta.client) {
        const raw = localStorage.getItem('bagluxe_wishlist')
        if (raw) {
          try {
            this.productIds = JSON.parse(raw) as string[]
          } catch { /* ignore */ }
        }
      }
    },

    persist() {
      if (import.meta.client) {
        localStorage.setItem('bagluxe_wishlist', JSON.stringify(this.productIds))
      }
    },

    toggle(id: string) {
      if (this.productIds.includes(id)) {
        this.productIds = this.productIds.filter(p => p !== id)
      } else {
        this.productIds.push(id)
      }
      this.persist()
    },
  },
})
