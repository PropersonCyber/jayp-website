import { mockProducts } from '../../data/mock'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const items = await directusReadItems<typeof mockProducts[0]>('products', {
    filter: { status: { _eq: 'published' } },
    fields: ['*', 'categories.*', 'variants.*', 'images.*'],
  })

  let list = items.length ? items : [...mockProducts]

  if (query.category) {
    list = list.filter(p =>
      p.categories?.some((c: { slug: string }) => c.slug === query.category),
    )
  }

  if (query.search) {
    const q = String(query.search).toLowerCase()
    list = list.filter(p =>
      p.title.toLowerCase().includes(q)
      || p.short_description?.toLowerCase().includes(q),
    )
  }

  if (query.colors) {
    const colors = String(query.colors).split(',')
    list = list.filter(p =>
      p.variants?.some((v: { color: string }) => colors.includes(v.color)),
    )
  }

  if (query.sizes) {
    const sizes = String(query.sizes).split(',')
    list = list.filter(p =>
      p.variants?.some((v: { size: string }) => sizes.includes(v.size)),
    )
  }

  if (query.materials) {
    const materials = String(query.materials).split(',')
    list = list.filter(p => p.material && materials.includes(p.material))
  }

  const sort = String(query.sort || '')
  if (sort === 'best_selling') {
    list.sort((a, b) => (b.review_count ?? 0) - (a.review_count ?? 0))
  } else if (sort === 'price_asc' || sort === 'price_desc') {
    const dir = sort === 'price_asc' ? 1 : -1
    list.sort((a, b) => {
      const minA = Math.min(...(a.variants?.map((v: { price: number }) => v.price) ?? [0]))
      const minB = Math.min(...(b.variants?.map((v: { price: number }) => v.price) ?? [0]))
      return (minA - minB) * dir
    })
  } else if (sort === 'name') {
    list.sort((a, b) => a.title.localeCompare(b.title))
  }

  return list
})
