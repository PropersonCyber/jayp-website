import { mockProducts } from '../../../data/mock'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const items = await directusReadItems<typeof mockProducts[0]>('products', {
    filter: { slug: { _eq: slug }, status: { _eq: 'published' } },
    fields: ['*', 'categories.*', 'variants.*', 'images.*'],
    limit: 1,
  })

  const product = items[0] ?? mockProducts.find(p => p.slug === slug)
  if (!product) {
    throw createError({ statusCode: 404, message: 'Product not found' })
  }
  return product
})
