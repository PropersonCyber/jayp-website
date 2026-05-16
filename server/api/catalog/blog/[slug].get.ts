import { mockBlogPosts } from '../../../data/mock'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const items = await directusReadItems<typeof mockBlogPosts[0]>('blog_posts', {
    filter: { slug: { _eq: slug }, status: { _eq: 'published' } },
    limit: 1,
  })
  const post = items[0] ?? mockBlogPosts.find(p => p.slug === slug)
  if (!post) throw createError({ statusCode: 404 })
  return post
})
