import { z } from 'zod'

const schema = z.object({
  company: z.string().min(1),
  contact_name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  product_type: z.string().min(1),
  quantity: z.number().min(1),
  requirements: z.string().min(1),
  locale: z.string(),
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = schema.safeParse(body)
  if (!parsed.success) throw createError({ statusCode: 400, message: parsed.error.message })

  const data = parsed.data
  await directusCreate('quote_requests', { ...data, status: 'new' })

  const config = useRuntimeConfig()
  await sendSimpleEmail(
    config.salesEmail,
    `Quote request from ${data.company}`,
    `<p>${data.contact_name} · ${data.email} · ${data.phone}</p><p>${data.product_type} × ${data.quantity}</p><p>${data.requirements}</p>`,
  )

  return { success: true }
})
