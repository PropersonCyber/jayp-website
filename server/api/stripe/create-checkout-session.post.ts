import Stripe from 'stripe'
import type { OrderPayload } from '../../app/types'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  if (!config.stripeSecretKey) {
    throw createError({ statusCode: 503, message: 'Stripe not configured' })
  }

  const body = await readBody<OrderPayload & { success_url?: string; cancel_url?: string }>(event)
  if (!body.items?.length) throw createError({ statusCode: 400, message: 'Cart is empty' })

  const stripe = new Stripe(config.stripeSecretKey)
  const orderNumber = generateOrderNumber()
  const total = body.items.reduce((s, i) => s + i.snapshotPrice * i.qty, 0)

  const order = await directusCreate('orders', {
    order_number: orderNumber,
    status: 'pending',
    email: body.email,
    first_name: body.first_name,
    last_name: body.last_name,
    total,
    currency: config.public.currency,
    locale: body.locale,
  })

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_email: body.email,
    line_items: body.items.map(item => ({
      price_data: {
        currency: config.public.currency.toLowerCase(),
        product_data: { name: `${item.productTitle} (${item.variantLabel})` },
        unit_amount: Math.round(item.snapshotPrice * 100),
      },
      quantity: item.qty,
    })),
    metadata: { order_id: order.id, order_number: orderNumber },
    success_url: body.success_url || `${config.public.siteUrl}/account?payment=success`,
    cancel_url: body.cancel_url || `${config.public.siteUrl}/checkout`,
  })

  return { url: session.url, order_number: orderNumber }
})
