import { mockCategories } from '../../data/mock'

export default defineEventHandler(async () => {
  const items = await directusReadItems<typeof mockCategories[0]>('categories', {
    filter: { status: { _eq: 'published' } },
    sort: ['sort'],
  })
  return items.length ? items : mockCategories
})
