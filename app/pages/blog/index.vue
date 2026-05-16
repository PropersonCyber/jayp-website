<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { getBlogPosts } = useCatalog()
const posts = await getBlogPosts()

useSeoMeta({ title: t('blog.title') })
</script>

<template>
  <div class="container-site py-12">
    <h1 class="text-center mb-10">{{ t('blog.title') }}</h1>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <motion.article
        v-for="(post, i) in posts"
        :key="post.id"
        :initial="{ opacity: 0, y: 16 }"
        :enter="{ opacity: 1, y: 0 }"
        :delay="i * 80"
      >
        <UiCard class="overflow-hidden h-full flex flex-col border border-border">
          <NuxtLink :to="localePath(`/blog/${post.slug}`)" class="block aspect-video overflow-hidden">
            <img :src="post.cover" :alt="post.title" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500">
          </NuxtLink>
          <div class="p-5 flex-1 flex flex-col">
            <time class="text-xs text-muted-foreground">{{ post.published_at }}</time>
            <h2 class="font-medium mt-2 mb-2 line-clamp-2">
              <NuxtLink :to="localePath(`/blog/${post.slug}`)" class="hover:text-primary">{{ post.title }}</NuxtLink>
            </h2>
            <p class="text-sm text-muted-foreground line-clamp-2 flex-1">{{ post.excerpt }}</p>
            <NuxtLink :to="localePath(`/blog/${post.slug}`)" class="text-sm text-primary mt-4 hover:underline">
              {{ t('blog.readMore') }} →
            </NuxtLink>
          </div>
        </UiCard>
      </motion.article>
    </div>
  </div>
</template>
