import { createDirectus, createItem, readItem, readItems, rest, staticToken } from '@directus/sdk'

export type DirectusSchema = Record<string, Record<string, unknown>>

export function getDirectusClient(token?: string) {
  const config = useRuntimeConfig()
  const url = config.directusUrl || config.public.directusUrl
  let client = createDirectus<DirectusSchema>(url).with(rest())
  if (token) {
    client = client.with(staticToken(token))
  }
  return client
}

export function useDirectusServer() {
  const config = useRuntimeConfig()
  const token = config.directusServerToken
  if (!token) return null
  return getDirectusClient(token)
}

export async function directusCreate<T extends Record<string, unknown>>(
  collection: string,
  data: T,
): Promise<T & { id: string }> {
  const client = useDirectusServer()
  if (!client) {
    return { id: `mock-${Date.now()}`, ...data } as T & { id: string }
  }
  return await client.request(createItem(collection, data)) as T & { id: string }
}

export async function directusReadItems<T>(
  collection: string,
  query?: Record<string, unknown>,
): Promise<T[]> {
  const client = useDirectusServer()
  if (!client) return []
  return await client.request(readItems(collection, query)) as T[]
}

export async function directusReadItem<T>(
  collection: string,
  id: string,
  query?: Record<string, unknown>,
): Promise<T | null> {
  const client = useDirectusServer()
  if (!client) return null
  try {
    return await client.request(readItem(collection, id, query)) as T
  } catch {
    return null
  }
}
