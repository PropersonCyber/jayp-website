import { mockBlogPosts } from '../../data/mock'

export default defineEventHandler(async () => {
  const items = await directusReadItems<typeof mockBlogPosts[0]>('blog_posts', {
    filter: { status: { _eq: 'published' } },
    sort: ['-published_at'],
  })
  return items.length ? items : mockBlogPosts
})
