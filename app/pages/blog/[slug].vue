<script setup lang="ts">
const route = useRoute()
const localePath = useLocalePath()
const { getBlogPost, getBlogPosts } = useCatalog()
const slug = route.params.slug as string
const post = await getBlogPost(slug)

if (!post) throw createError({ statusCode: 404 })

const allPosts = await getBlogPosts()
const related = allPosts.filter(p => p.slug !== slug).slice(0, 2)

useSeoMeta({ title: post.title, description: post.excerpt })
</script>

<template>
  <article class="container-site py-12 max-w-3xl mx-auto">
    <time class="text-sm text-muted-foreground">{{ post.published_at }}</time>
    <h1 class="mt-2 mb-8">{{ post.title }}</h1>
    <img v-if="post.cover" :src="post.cover" :alt="post.title" class="w-full rounded-[var(--radius)] mb-8 aspect-video object-cover border border-border">
    <motion.div class="prose prose-sm max-w-none surface-card p-6" v-html="post.body" />

    <div v-if="related.length" class="mt-16 pt-8 border-t">
      <h2 class="font-serif text-xl mb-6">Related Articles</h2>
      <div class="grid sm:grid-cols-2 gap-6">
        <NuxtLink
          v-for="r in related"
          :key="r.id"
          :to="localePath(`/blog/${r.slug}`)"
          class="group"
        >
          <img :src="r.cover" :alt="r.title" class="rounded-lg aspect-video object-cover mb-2 group-hover:opacity-90">
          <p class="font-medium text-sm group-hover:text-primary">{{ r.title }}</p>
        </NuxtLink>
      </div>
    </div>
  </article>
</template>
