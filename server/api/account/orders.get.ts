
export default defineEventHandler(async (event) => {
  const auth = getHeader(event, 'authorization')?.replace('Bearer ', '')
  if (!auth) throw createError({ statusCode: 401 })

  // Demo token returns empty — wire to Directus user orders in production
  if (auth.startsWith('demo-')) {
    return []
  }

  const orders = await directusReadItems<{
    order_number: string
    status: string
    total: number
    date_created: string
    email: string
  }>('orders', {
    sort: ['-date_created'],
    limit: 20,
  })

  return orders.map(o => ({
    order_number: o.order_number,
    status: o.status,
    total: o.total,
    date_created: o.date_created,
  }))
})
