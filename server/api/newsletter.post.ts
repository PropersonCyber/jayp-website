import { z } from 'zod'

const schema = z.object({ email: z.string().email() })

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = schema.safeParse(body)
  if (!parsed.success) throw createError({ statusCode: 400, message: parsed.error.message })

  await directusCreate('newsletter_subscribers', {
    email: parsed.data.email,
    subscribed_at: new Date().toISOString(),
  })

  return { success: true }
})
