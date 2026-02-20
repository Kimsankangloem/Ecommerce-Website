<script setup>
import { ref } from 'vue'

const categories = ref([
  {
    id: 1,
    name: 'Audio',
    description: 'Premium headphones, earbuds, and speakers for audiophiles',
    icon: 'i-lucide-headphones',
    color: 'from-purple-500 to-pink-500',
    productCount: 245,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=80',
    featured: true
  },
  {
    id: 2,
    name: 'Wearables',
    description: 'Smart watches and fitness trackers for your active lifestyle',
    icon: 'i-lucide-watch',
    color: 'from-blue-500 to-cyan-500',
    productCount: 128,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=80',
    featured: true
  },
  {
    id: 3,
    name: 'Accessories',
    description: 'Essential tech accessories to enhance your workspace',
    icon: 'i-lucide-usb',
    color: 'from-orange-500 to-red-500',
    productCount: 387,
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&q=80',
    featured: true
  },
  {
    id: 4,
    name: 'Gaming',
    description: 'High-performance gaming gear for competitive players',
    icon: 'i-lucide-gamepad-2',
    color: 'from-green-500 to-emerald-500',
    productCount: 156,
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=1200&q=80',
    featured: true
  },
  {
    id: 5,
    name: 'Computing',
    description: 'Laptops, tablets, and computing devices',
    icon: 'i-lucide-laptop',
    color: 'from-indigo-500 to-purple-500',
    productCount: 89,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&q=80',
    featured: false
  },
  {
    id: 6,
    name: 'Smart Home',
    description: 'Connected devices for your intelligent home',
    icon: 'i-lucide-home',
    color: 'from-teal-500 to-green-500',
    productCount: 167,
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=1200&q=80',
    featured: false
  },
  {
    id: 7,
    name: 'Photography',
    description: 'Cameras, lenses, and photography equipment',
    icon: 'i-lucide-camera',
    color: 'from-rose-500 to-pink-500',
    productCount: 94,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&q=80',
    featured: false
  },
  {
    id: 8,
    name: 'Mobile',
    description: 'Smartphones and mobile accessories',
    icon: 'i-lucide-smartphone',
    color: 'from-amber-500 to-orange-500',
    productCount: 203,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&q=80',
    featured: false
  }
])

const featuredCategories = computed(() => categories.value.filter(c => c.featured))
const otherCategories = computed(() => categories.value.filter(c => !c.featured))

const categorySearch = ref('')
const filteredCategories = computed(() => {
  if (!categorySearch.value) return categories.value
  return categories.value.filter(c =>
    c.name.toLowerCase().includes(categorySearch.value.toLowerCase()) ||
    c.description.toLowerCase().includes(categorySearch.value.toLowerCase())
  )
})

const totalProducts = computed(() => categories.value.reduce((sum, c) => sum + c.productCount, 0))
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900">
      <div class="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      
      <div class="relative container mx-auto px-4 py-24 md:py-32">
        <div class="max-w-3xl mx-auto text-center text-white space-y-6">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
            <UIcon name="i-lucide-grid-3x3" class="w-4 h-4" />
            <span class="text-sm font-medium">Browse by Category</span>
          </div>
          
          <h1 class="text-5xl md:text-6xl font-bold leading-tight">
            Explore Our
            <span class="block bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
              Product Categories
            </span>
          </h1>
          
          <p class="text-xl text-white/90 max-w-2xl mx-auto">
            Find exactly what you're looking for in our carefully curated product categories
          </p>
        </div>
      </div>
    </section>

    <!-- Stats Strip -->
    <section class="container mx-auto px-4 -mt-8 relative z-10">
      <div class="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 p-6">
        <div class="flex flex-col md:flex-row items-center gap-6">
          <!-- Search -->
          <div class="flex-1 w-full">
            <UInput
              v-model="categorySearch"
              icon="i-lucide-search"
              placeholder="Search categories..."
              size="lg"
              class="w-full"
            />
          </div>
          <!-- Stats -->
          <div class="flex items-center gap-8 flex-shrink-0">
            <div class="text-center">
              <p class="text-2xl font-bold">{{ categories.length }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Categories</p>
            </div>
            <div class="w-px h-10 bg-gray-200 dark:bg-gray-700" />
            <div class="text-center">
              <p class="text-2xl font-bold">{{ totalProducts.toLocaleString() }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Total Products</p>
            </div>
            <div class="w-px h-10 bg-gray-200 dark:bg-gray-700 hidden sm:block" />
            <div class="text-center hidden sm:block">
              <p class="text-2xl font-bold">4.8★</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Avg Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Categories -->
    <section class="container mx-auto px-4 py-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Featured Categories</h2>
        <p class="text-gray-600 dark:text-gray-400 text-lg">Our most popular product collections</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <NuxtLink
          v-for="category in featuredCategories"
          :key="category.id"
          :to="`/shop?category=${category.name.toLowerCase()}`"
          class="group relative overflow-hidden rounded-3xl aspect-[4/3] cursor-pointer"
        >
          <!-- Background Image -->
          <img
            :src="category.image"
            :alt="category.name"
            class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          <!-- Overlay -->
          <div :class="`absolute inset-0 bg-gradient-to-br ${category.color} opacity-60 group-hover:opacity-70 transition-opacity duration-300`" />
          
          <!-- Content -->
          <div class="relative h-full flex flex-col justify-end p-8 md:p-10 text-white">
            <div :class="`w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`">
              <UIcon :name="category.icon" class="w-8 h-8" />
            </div>
            
            <h3 class="text-3xl md:text-4xl font-bold mb-3">{{ category.name }}</h3>
            <p class="text-lg text-white/90 mb-4">{{ category.description }}</p>
            
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium">{{ category.productCount }} Products</span>
              <div class="flex items-center gap-2 group-hover:gap-3 transition-all">
                <span class="text-sm font-medium">Shop Now</span>
                <UIcon name="i-lucide-arrow-right" class="w-5 h-5" />
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- All Categories Grid -->
    <section class="container mx-auto px-4 py-16 bg-gray-50 dark:bg-gray-950">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">All Categories</h2>
        <p class="text-gray-600 dark:text-gray-400 text-lg">Discover our complete range of products</p>
      </div>

      <!-- Empty search state -->
      <div v-if="filteredCategories.length === 0" class="text-center py-16">
        <UIcon name="i-lucide-folder-search" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-xl font-semibold mb-2">No categories found</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">Try a different search term</p>
        <UButton @click="categorySearch = ''" variant="outline">Clear Search</UButton>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <NuxtLink
          v-for="category in filteredCategories"
          :key="category.id"
          :to="`/shop?category=${category.name.toLowerCase()}`"
          class="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
        >
          <!-- Icon Background -->
          <div class="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
            <div :class="`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-20 transition-opacity`" />
            <div class="relative h-full flex items-center justify-center">
              <div :class="`w-24 h-24 rounded-3xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`">
                <UIcon :name="category.icon" class="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
          
          <!-- Content -->
          <div class="p-6 space-y-3">
            <h3 class="font-semibold text-xl">{{ category.name }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {{ category.description }}
            </p>
            
            <div class="flex items-center justify-between pt-2">
              <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
                {{ category.productCount }} items
              </span>
              <div class="flex items-center gap-1 text-purple-600 dark:text-purple-400 group-hover:gap-2 transition-all">
                <span class="text-sm font-medium">Browse</span>
                <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="container mx-auto px-4 py-16">
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-12 md:p-16">
        <div class="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
        <div class="relative z-10 max-w-3xl mx-auto text-center text-white space-y-6">
          <h2 class="text-4xl md:text-5xl font-bold">
            Can't Find What You're Looking For?
          </h2>
          <p class="text-xl text-white/90">
            Browse our complete catalog or contact our team for personalized recommendations
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <UButton
              to="/shop"
              size="xl"
              class="bg-white text-purple-600 hover:bg-gray-100 shadow-xl"
            >
              <template #leading>
                <UIcon name="i-lucide-shopping-bag" class="w-5 h-5" />
              </template>
              Browse All Products
            </UButton>
            
            <UButton
              to="/contact"
              size="xl"
              variant="outline"
              class="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm"
            >
              <template #leading>
                <UIcon name="i-lucide-headset" class="w-5 h-5" />
              </template>
              Contact Support
            </UButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.bg-grid-white\/10 {
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
}
</style>
