import { z } from 'zod'
import type { OrderPayload } from '../../app/types'

const schema = z.object({
  email: z.string().email(),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  company: z.string().optional(),
  phone: z.string().min(1),
  address_line1: z.string().min(1),
  address_line2: z.string().optional(),
  city: z.string().min(1),
  state: z.string().optional(),
  postal_code: z.string().min(1),
  country: z.string().min(1),
  notes: z.string().optional(),
  locale: z.string(),
  items: z.array(z.object({
    productId: z.string(),
    variantId: z.string(),
    qty: z.number().min(1),
    snapshotPrice: z.number(),
    productTitle: z.string(),
    variantLabel: z.string(),
    moq: z.number(),
  })).min(1),
})

export default defineEventHandler(async (event) => {
  const body = await readBody<OrderPayload>(event)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    throw createError({ statusCode: 400, message: parsed.error.message })
  }

  const data = parsed.data
  for (const item of data.items) {
    if (item.qty < item.moq) {
      throw createError({
        statusCode: 400,
        message: `Quantity for ${item.productTitle} must be at least ${item.moq}`,
      })
    }
  }

  const orderNumber = generateOrderNumber()
  const total = data.items.reduce((s, i) => s + i.snapshotPrice * i.qty, 0)
  const config = useRuntimeConfig()

  const order = await directusCreate('orders', {
    order_number: orderNumber,
    status: 'pending',
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    company: data.company,
    phone: data.phone,
    address_line1: data.address_line1,
    address_line2: data.address_line2,
    city: data.city,
    state: data.state,
    postal_code: data.postal_code,
    country: data.country,
    notes: data.notes,
    locale: data.locale,
    total,
    currency: config.public.currency,
  })

  for (const item of data.items) {
    await directusCreate('order_items', {
      order_id: order.id,
      product_id: item.productId,
      variant_id: item.variantId,
      product_title: item.productTitle,
      variant_label: item.variantLabel,
      quantity: item.qty,
      unit_price: item.snapshotPrice,
    })
  }

  const itemsSummary = data.items
    .map(i => `${i.productTitle} (${i.variantLabel}) × ${i.qty}`)
    .join('<br>')

  await sendOrderEmails({
    order_number: orderNumber,
    email: data.email,
    first_name: data.first_name,
    total,
    items_summary: itemsSummary,
  })

  return { order_number: orderNumber, id: order.id }
})
