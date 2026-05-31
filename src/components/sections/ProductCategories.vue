<script setup lang="ts">
const scrollTo = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const headerHeight = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  }
};

// Using reliable picsum images with descriptive seeds
const products = [
  {
    id: "velvet",
    name: "Velvet Bags",
    description: "Luxurious soft-touch packaging for jewelry and gifts",
    image: "https://picsum.photos/seed/velvet/400/300",
    badge: "Hot",
    badgeColor: "bg-accent",
  },
  {
    id: "cotton",
    name: "Cotton Bags",
    description: "Eco-friendly natural fiber sustainable packaging",
    image: "https://picsum.photos/seed/cotton/400/300",
    badge: null,
    badgeColor: "",
  },
  {
    id: "canvas",
    name: "Canvas Bags",
    description: "Durable heavy-duty bags for retail and promotions",
    image: "https://picsum.photos/seed/canvas/400/300",
    badge: "New",
    badgeColor: "bg-primary",
  },
  {
    id: "drawstring",
    name: "Drawstring Bags",
    description: "Classic closure bags for favors and accessories",
    image: "https://picsum.photos/seed/drawstring/400/300",
    badge: null,
    badgeColor: "",
  },
  {
    id: "jewelry",
    name: "Jewelry Pouches",
    description: "Premium pouches for precious jewelry protection",
    image: "https://picsum.photos/seed/jewelry/400/300",
    badge: "Best Seller",
    badgeColor: "bg-accent",
  },
  {
    id: "gift",
    name: "Gift Bags",
    description: "Elegant presentation for all gift occasions",
    image: "https://picsum.photos/seed/giftbag/400/300",
    badge: null,
    badgeColor: "",
  },
  {
    id: "leather",
    name: "PU Leather Bags",
    description:
      "Sophisticated vegan leather bags combining luxury aesthetics with sustainable materials.",
    image: "https://picsum.photos/seed/leather/400/300",
    badge: "Premium Line",
    badgeColor: "bg-accent",
    large: true,
  },
];

const features = [
  {
    icon: "fas-palette",
    title: "Custom Colors & Branding",
    description:
      "Match your brand identity with Pantone color matching and custom printing.",
  },
  {
    icon: "fas-ruler",
    title: "Custom Sizes & Shapes",
    description:
      "Tailored dimensions to fit your products perfectly, any shape or size.",
  },
  {
    icon: "fas-gem",
    title: "Premium Materials",
    description:
      "Choose from velvet, satin, cotton, canvas, PU leather, and more.",
  },
  {
    icon: "fas-vector-square",
    title: "Logo & Embroidery",
    description:
      "Professional logo printing, embossing, and embroidery services.",
  },
];
</script>

<template>
  <section id="products" class="py-20 lg:py-32">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <span class="text-sm font-semibold text-accent tracking-wider uppercase"
          >Our Products</span
        >
        <h2 class="text-3xl lg:text-4xl font-bold mt-4 mb-6">
          Premium Bag Collection
        </h2>
        <p class="text-lg text-secondary max-w-2xl mx-auto">
          Discover our extensive range of fabric bags designed to elevate your
          brand packaging.
        </p>
      </div>

      <!-- Product Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div
          v-for="product in products"
          :key="product.id"
          :class="[
            'group relative bg-white rounded-2xl overflow-hidden border border-gray-100 card-hover',
            product.large ? 'lg:col-span-2' : '',
          ]"
        >
          <div class="relative overflow-hidden">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              v-if="product.badge"
              :class="[
                'absolute top-4 left-4 px-3 py-1 text-xs font-semibold text-white rounded-full',
                product.badgeColor,
              ]"
            >
              {{ product.badge }}
            </div>
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
            ></div>
          </div>
          <div class="p-6">
            <h3 class="text-lg font-semibold mb-2">{{ product.name }}</h3>
            <p class="text-sm text-secondary">{{ product.description }}</p>
          </div>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="bg-surface rounded-3xl p-8 lg:p-12">
        <div class="text-center mb-12">
          <h3 class="text-2xl lg:text-3xl font-bold mb-4">
            Customization Options
          </h3>
          <p class="text-secondary max-w-xl mx-auto">
            Tailor every detail to match your brand requirements
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="text-center"
          >
            <div
              class="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <span :class="feature.icon + ' text-accent text-2xl'"></span>
            </div>
            <h4 class="font-semibold mb-2">{{ feature.title }}</h4>
            <p class="text-sm text-secondary">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
