<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { locales, setLocale, type Locale } from "@/i18n";

const { t, locale } = useI18n();
const mobileMenuOpen = ref(false);
const langDropdownOpen = ref(false);

const currentLocaleName = computed(() => {
  return locales.find((l) => l.code === locale.value)?.name || "English";
});

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
};

const toggleLangDropdown = () => {
  langDropdownOpen.value = !langDropdownOpen.value;
};

const selectLocale = (code: Locale) => {
  setLocale(code);
  langDropdownOpen.value = false;
};

const scrollTo = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const headerHeight = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    closeMobileMenu();
  }
};

const navItems = computed(() => [
  { id: "products", label: t("nav.products") },
  { id: "factory", label: t("nav.factory") },
  { id: "services", label: t("nav.services") },
  { id: "process", label: t("nav.process") },
  { id: "about", label: t("nav.about") },
  { id: "contact", label: t("nav.contact") },
]);
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 lg:h-20">
        <!-- Logo -->
        <div
          class="flex items-center space-x-2 cursor-pointer"
          @click="scrollTo('hero')"
        >
          <div
            class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center"
          >
            <span class="text-white font-bold text-xl">P</span>
          </div>
          <span class="text-xl font-semibold tracking-tight">PremiumPack</span>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center space-x-8">
          <a
            v-for="link in navItems"
            :key="link.id"
            :href="`#${link.id}`"
            class="nav-link text-sm font-medium text-secondary hover:text-primary transition cursor-pointer"
            @click.prevent="scrollTo(link.id)"
          >
            {{ link.label }}
          </a>
        </nav>

        <!-- CTA & Language -->
        <div class="hidden lg:flex items-center space-x-4">
          <div class="relative">
            <button
              @click="toggleLangDropdown"
              class="flex items-center space-x-2 text-sm font-medium text-secondary hover:text-primary transition"
            >
              <span i="fas-globe" class="w-5 h-5"></span>
              <span>{{ currentLocaleName }}</span>
              <span i="fas-chevron-down" class="w-4 h-4"></span>
            </button>
            <div
              v-if="langDropdownOpen"
              class="absolute top-full right-0 mt-2 w-32 bg-white rounded-xl shadow-lg border border-gray-100 py-2"
            >
              <button
                v-for="lang in locales"
                :key="lang.code"
                @click="selectLocale(lang.code)"
                class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition"
                :class="{ 'bg-gray-50 font-medium': locale === lang.code }"
              >
                {{ lang.name }}
              </button>
            </div>
          </div>
          <button
            @click="scrollTo('contact')"
            class="btn-primary px-5 py-2.5 rounded-full text-sm font-medium"
          >
            {{ t("header.getQuote") }}
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <button @click="toggleMobileMenu" class="lg:hidden p-2 -mr-2">
          <span i="fas-bars" class="w-6 h-6 text-xl"></span>
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile Menu -->
  <div v-if="mobileMenuOpen" class="fixed inset-0 z-50 lg:hidden">
    <div class="absolute inset-0 bg-black/50" @click="closeMobileMenu"></div>
    <div class="absolute left-0 top-0 bottom-0 w-80 bg-white">
      <div class="flex items-center justify-between p-4 border-b">
        <span class="text-xl font-semibold">Menu</span>
        <button @click="closeMobileMenu" class="p-2">
          <span i="fas-times" class="w-6 h-6 text-xl"></span>
        </button>
      </div>
      <nav class="p-4 space-y-2">
        <a
          v-for="link in navItems"
          :key="link.id"
          href="#"
          class="block py-3 px-4 text-sm font-medium rounded-lg hover:bg-gray-50 transition cursor-pointer"
          @click.prevent="scrollTo(link.id)"
        >
          {{ link.label }}
        </a>
        <div class="pt-4 space-y-2">
          <div class="relative">
            <button
              @click="langDropdownOpen = !langDropdownOpen"
              class="w-full flex items-center justify-between py-3 px-4 text-sm font-medium rounded-lg hover:bg-gray-50 transition"
            >
              <span>Language</span>
              <span class="text-gray-500">{{ currentLocaleName }}</span>
            </button>
            <div v-if="langDropdownOpen" class="pl-4 space-y-1">
              <button
                v-for="lang in locales"
                :key="lang.code"
                @click="selectLocale(lang.code)"
                class="block w-full text-left py-2 px-4 text-sm rounded-lg hover:bg-gray-50 transition"
                :class="{ 'bg-gray-50 font-medium': locale === lang.code }"
              >
                {{ lang.name }}
              </button>
            </div>
          </div>
          <button
            @click="scrollTo('contact')"
            class="btn-primary block w-full text-center py-3 rounded-full text-sm font-medium"
          >
            {{ t("header.getQuote") }}
          </button>
        </div>
      </nav>
    </div>
  </div>
</template>
