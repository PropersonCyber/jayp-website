import { defineStore } from 'pinia'
import type { CartLineItem, Product, ProductVariant } from '~/types'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartLineItem[],
    isOpen: false,
  }),

  getters: {
    itemCount: state => state.items.reduce((sum, i) => sum + i.qty, 0),
    subtotal: state => state.items.reduce((sum, i) => sum + i.snapshotPrice * i.qty, 0),
    isEmpty: state => state.items.length === 0,
  },

  actions: {
    hydrate() {
      if (import.meta.client) {
        const raw = localStorage.getItem('bagluxe_cart')
        if (raw) {
          try {
            this.items = JSON.parse(raw) as CartLineItem[]
          } catch { /* ignore */ }
        }
      }
    },

    persist() {
      if (import.meta.client) {
        localStorage.setItem('bagluxe_cart', JSON.stringify(this.items))
      }
    },

    open() { this.isOpen = true },
    close() { this.isOpen = false },
    toggle() { this.isOpen = !this.isOpen },

    addItem(product: Product, variant: ProductVariant, qty: number) {
      const moq = product.moq ?? 1
      const existing = this.items.find(i => i.variantId === variant.id)

      if (existing) {
        existing.qty = Math.max(moq, existing.qty + qty)
      } else {
        this.items.push({
          productId: product.id,
          variantId: variant.id,
          qty: Math.max(moq, qty),
          snapshotPrice: variant.price,
          productSlug: product.slug,
          productTitle: product.title,
          variantLabel: `${variant.color} / ${variant.size}`,
          image: product.images?.[0],
          moq,
        })
      }
      this.persist()
      this.open()
    },

    updateQty(variantId: string, qty: number) {
      const item = this.items.find(i => i.variantId === variantId)
      if (!item) return
      if (qty < item.moq) {
        this.removeItem(variantId)
        return
      }
      item.qty = qty
      this.persist()
    },

    removeItem(variantId: string) {
      this.items = this.items.filter(i => i.variantId !== variantId)
      this.persist()
    },

    clear() {
      this.items = []
      this.persist()
    },
  },
})
