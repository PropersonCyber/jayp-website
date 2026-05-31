export interface Locale {
  code: 'en' | 'zh' | 'de' | 'fr'
  name: string
}

export interface NavItem {
  id: string
  label: string
}

export interface Product {
  id: string
  name: string
  description: string
  image: string
  badge?: string
  badgeColor?: string
  large?: boolean
}

export interface ContactForm {
  fullName: string
  company: string
  email: string
  phone: string
  country: string
  product: string
  message: string
  privacy: boolean
}
