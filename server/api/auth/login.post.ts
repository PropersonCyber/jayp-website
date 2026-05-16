/**
 * Phase 2 auth stub — replace with Directus /auth/login in production.
 * Demo: any email + password "demo123"
 */
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = schema.safeParse(body)
  if (!parsed.success) throw createError({ statusCode: 400, message: parsed.error.message })

  const { email, password } = parsed.data

  // Try Directus auth when configured
  const config = useRuntimeConfig()
  if (config.directusServerToken) {
    try {
      const res = await $fetch<{ data: { access_token: string } }>(`${config.directusUrl}/auth/login`, {
        method: 'POST',
        body: { email, password },
      })
      const me = await $fetch<{ data: { id: string; email: string; first_name?: string } }>(
        `${config.directusUrl}/users/me`,
        { headers: { Authorization: `Bearer ${res.data.access_token}` } },
      )
      return {
        token: res.data.access_token,
        user: { id: me.data.id, email: me.data.email, first_name: me.data.first_name },
      }
    } catch {
      // fall through to demo auth
    }
  }

  if (password !== 'demo123') {
    throw createError({ statusCode: 401, message: 'Invalid credentials' })
  }

  return {
    token: `demo-${Buffer.from(email).toString('base64')}`,
    user: { id: 'demo-user', email, first_name: email.split('@')[0] },
  }
})
