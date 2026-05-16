import { mockSiteSettings } from '../../data/mock'

export default defineEventHandler(async () => {
  const items = await directusReadItems<typeof mockSiteSettings>('site_settings', { limit: 1 })
  return items[0] ?? mockSiteSettings
})
