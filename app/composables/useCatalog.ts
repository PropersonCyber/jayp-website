import type { BlogPost, Category, Product, SiteSettings } from '~/types'

export function useCatalog() {
  const getCategories = async (): Promise<Category[]> => {
    return await $fetch<Category[]>('/api/catalog/categories')
  }

  const getProducts = async (filters?: {
    category?: string
    colors?: string[]
    sizes?: string[]
    materials?: string[]
    sort?: string
    search?: string
  }): Promise<Product[]> => {
    return await $fetch<Product[]>('/api/catalog/products', { query: filters })
  }

  const getProduct = async (slug: string): Promise<Product | null> => {
    try {
      return await $fetch<Product>(`/api/catalog/products/${slug}`)
    } catch {
      return null
    }
  }

  const getBlogPosts = async (): Promise<BlogPost[]> => {
    return await $fetch<BlogPost[]>('/api/catalog/blog')
  }

  const getBlogPost = async (slug: string): Promise<BlogPost | null> => {
    try {
      return await $fetch<BlogPost>(`/api/catalog/blog/${slug}`)
    } catch {
      return null
    }
  }

  const getSiteSettings = async (): Promise<SiteSettings> => {
    return await $fetch<SiteSettings>('/api/catalog/settings')
  }

  const getHomeSection = async () => {
    return await $fetch('/api/catalog/home')
  }

  return {
    getCategories,
    getProducts,
    getProduct,
    getBlogPosts,
    getBlogPost,
    getSiteSettings,
    getHomeSection,
  }
}

export function getProductPriceRange(product: Product) {
  const prices = product.variants?.map(v => v.price) ?? []
  if (!prices.length) return { min: 0, max: 0 }
  return { min: Math.min(...prices), max: Math.max(...prices) }
}

export function getUniqueColors(products: Product[]) {
  const map = new Map<string, string>()
  for (const p of products) {
    for (const v of p.variants ?? []) {
      map.set(v.color, v.color_hex)
    }
  }
  return [...map.entries()].map(([color, hex]) => ({ color, hex }))
}

export function getUniqueSizes(products: Product[]) {
  const sizes = new Set<string>()
  for (const p of products) {
    for (const v of p.variants ?? []) sizes.add(v.size)
  }
  const order = ['XS', 'S', 'M', 'L', 'XL']
  return [...sizes].sort((a, b) => order.indexOf(a) - order.indexOf(b))
}

export function getUniqueMaterials(products: Product[]) {
  const materials = new Set<string>()
  for (const p of products) {
    if (p.material) materials.add(p.material)
  }
  return [...materials].sort()
}
