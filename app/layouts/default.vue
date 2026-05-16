<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground">
    <LayoutAppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <LayoutAppFooter />
    <CartCartDrawer />
  </div>
</template>
