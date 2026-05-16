import { defineStore } from 'pinia'
import type { UserAccount } from '~/types'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as UserAccount | null,
    token: null as string | null,
  }),

  getters: {
    isLoggedIn: state => !!state.user,
  },

  actions: {
    hydrate() {
      if (import.meta.client) {
        const raw = localStorage.getItem('bagluxe_auth')
        if (raw) {
          try {
            const data = JSON.parse(raw) as { user: UserAccount; token: string }
            this.user = data.user
            this.token = data.token
          } catch { /* ignore */ }
        }
      }
    },

    persist() {
      if (import.meta.client && this.user && this.token) {
        localStorage.setItem('bagluxe_auth', JSON.stringify({ user: this.user, token: this.token }))
      }
    },

    logout() {
      this.user = null
      this.token = null
      if (import.meta.client) localStorage.removeItem('bagluxe_auth')
    },

    setUser(user: UserAccount, token: string) {
      this.user = user
      this.token = token
      this.persist()
    },
  },
})
