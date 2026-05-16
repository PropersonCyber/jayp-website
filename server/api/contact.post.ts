import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
  locale: z.string(),
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = schema.safeParse(body)
  if (!parsed.success) throw createError({ statusCode: 400, message: parsed.error.message })

  const data = parsed.data
  await directusCreate('contact_messages', data)

  const config = useRuntimeConfig()
  await sendSimpleEmail(
    config.salesEmail,
    `Contact: ${data.subject}`,
    `<p>From ${data.name} &lt;${data.email}&gt;</p><p>${data.message}</p>`,
  )

  return { success: true }
})
