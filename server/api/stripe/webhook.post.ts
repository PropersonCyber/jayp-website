import Stripe from 'stripe'
import { updateItem } from '@directus/sdk'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  if (!config.stripeSecretKey || !config.stripeWebhookSecret) {
    throw createError({ statusCode: 503 })
  }

  const stripe = new Stripe(config.stripeSecretKey)
  const rawBody = await readRawBody(event)
  const sig = getHeader(event, 'stripe-signature')
  if (!rawBody || !sig) throw createError({ statusCode: 400 })

  let stripeEvent: Stripe.Event
  try {
    stripeEvent = stripe.webhooks.constructEvent(rawBody, sig, config.stripeWebhookSecret)
  } catch {
    throw createError({ statusCode: 400, message: 'Invalid signature' })
  }

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object as Stripe.Checkout.Session
    const orderId = session.metadata?.order_id
    if (orderId && config.directusServerToken) {
      const client = getDirectusClient(config.directusServerToken)
      await client.request(updateItem('orders', orderId, { status: 'paid' }))
    }
  }

  return { received: true }
})
