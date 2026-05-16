import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: number, currency = 'USD', locale = 'en-US') {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount)
}

export function priceRange(min: number, max: number, currency = 'USD', locale = 'en-US') {
  if (min === max) return formatPrice(min, currency, locale)
  return `${formatPrice(min, currency, locale)} – ${formatPrice(max, currency, locale)}`
}

export function generateOrderNumber() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `BL-${date}-${rand}`
}
