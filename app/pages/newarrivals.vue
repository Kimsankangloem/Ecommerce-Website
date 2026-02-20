<script setup>
import { ref, inject } from 'vue'

const cart = inject('cart')
const wishlist = inject('wishlist')

const filterBy = ref('all') // 'all', 'week', 'month'
const sortBy = ref('newest')

const filterOptions = [
  { value: 'all', label: 'All Time' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' }
]

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' }
]

const newArrivals = ref([
  {
    id: 1,
    name: 'Quantum Earbuds X1',
    price: 249.99,
    category: 'Audio',
    rating: 4.9,
    reviews: 127,
    image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800&q=80',
    badge: 'Just Arrived',
    description: 'Next-gen wireless earbuds with quantum audio technology',
    releaseDate: '2026-01-28',
    isNew: true,
    trending: true
  },
  {
    id: 2,
    name: 'ProVision 4K Webcam',
    price: 229.99,
    category: 'Accessories',
    rating: 4.8,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=800&q=80',
    badge: 'New',
    description: 'Professional streaming webcam with AI tracking',
    releaseDate: '2026-01-27',
    isNew: true,
    trending: false
  },
  {
    id: 3,
    name: 'UltraFit Watch Pro',
    price: 449.99,
    category: 'Wearables',
    rating: 5.0,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80',
    badge: 'Hot',
    description: 'Advanced health monitoring with ECG and blood oxygen',
    releaseDate: '2026-01-26',
    isNew: true,
    trending: true
  },
  {
    id: 4,
    name: 'MechPro Keyboard Elite',
    price: 189.99,
    category: 'Accessories',
    rating: 4.9,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80',
    badge: 'New',
    description: 'Hot-swappable mechanical keyboard with premium switches',
    releaseDate: '2026-01-25',
    isNew: true,
    trending: true
  },
  {
    id: 5,
    name: 'SoundWave Speaker 360',
    price: 179.99,
    category: 'Audio',
    rating: 4.7,
    reviews: 94,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80',
    badge: 'New',
    description: 'Immersive 360° sound with deep bass',
    releaseDate: '2026-01-24',
    isNew: true,
    trending: false
  },
  {
    id: 6,
    name: 'GameMaster Controller',
    price: 89.99,
    category: 'Gaming',
    rating: 4.8,
    reviews: 178,
    image: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=800&q=80',
    badge: 'New',
    description: 'Pro-level gaming controller with adaptive triggers',
    releaseDate: '2026-01-23',
    isNew: true,
    trending: true
  },
  {
    id: 7,
    name: 'HyperDrive USB-C Hub',
    price: 119.99,
    category: 'Accessories',
    rating: 4.6,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
    badge: 'New',
    description: '10-in-1 connectivity hub with 100W power delivery',
    releaseDate: '2026-01-22',
    isNew: true,
    trending: false
  },
  {
    id: 8,
    name: 'AeroMouse Precision',
    price: 99.99,
    category: 'Accessories',
    rating: 4.9,
    reviews: 142,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80',
    badge: 'New',
    description: 'Ultra-lightweight wireless mouse with 32000 DPI',
    releaseDate: '2026-01-21',
    isNew: true,
    trending: true
  },
  {
    id: 9,
    name: 'StudioPods Max',
    price: 599.99,
    category: 'Audio',
    rating: 5.0,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    badge: 'Premium',
    description: 'Studio-grade headphones with spatial audio',
    releaseDate: '2026-01-20',
    isNew: true,
    trending: true
  }
])

const { triggerCartAdded, isCartAdded, triggerHeartPop, isHeartPopping } = useProductAnimations()

const handleAddToCart = (product) => {
  cart.addToCart(product)
  triggerCartAdded(product.id)
}

const handleToggleWishlist = (product) => {
  wishlist.toggle(product)
  triggerHeartPop(product.id)
}

const spotlightProduct = computed(() => newArrivals.value.find(p => p.trending) || newArrivals.value[0])

const getBadgeColor = (badge) => {
  const colors = {
    'Just Arrived': 'green',
    'New': 'blue',
    'Hot': 'red',
    'Premium': 'purple'
  }
  return colors[badge] || 'gray'
}

const getDaysAgo = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  return `${diffDays} days ago`
}
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-900 dark:via-teal-900 dark:to-cyan-900">
      <div class="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      
      <div class="relative container mx-auto px-4 py-24 md:py-32">
        <div class="max-w-3xl mx-auto text-center text-white space-y-8">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
            <UIcon name="i-lucide-sparkles" class="w-4 h-4" />
            <span class="text-sm font-medium">Fresh Arrivals</span>
          </div>
          
          <h1 class="text-5xl md:text-7xl font-bold leading-tight">
            New Arrivals
            <span class="block bg-gradient-to-r from-yellow-200 to-green-200 bg-clip-text text-transparent">
              Latest & Greatest
            </span>
          </h1>
          
          <p class="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Be the first to discover our newest products and cutting-edge technology
          </p>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-6 pt-8 max-w-2xl mx-auto">
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div class="text-3xl md:text-4xl font-bold">{{ newArrivals.length }}</div>
              <div class="text-sm text-white/80 mt-1">New Products</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div class="text-3xl md:text-4xl font-bold">{{ newArrivals.filter(p => p.trending).length }}</div>
              <div class="text-sm text-white/80 mt-1">Trending</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div class="text-3xl md:text-4xl font-bold">4.8</div>
              <div class="text-sm text-white/80 mt-1">Avg Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Spotlight Product -->
    <section class="container mx-auto px-4 -mt-8 relative z-10 pb-4">
      <div class="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div class="flex flex-col md:flex-row">
          <div class="relative md:w-2/5 aspect-[4/3] md:aspect-auto overflow-hidden bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20">
            <img
              :src="spotlightProduct.image"
              :alt="spotlightProduct.name"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div class="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold shadow-lg animate-pulse">
              <UIcon name="i-lucide-sparkles" class="w-3.5 h-3.5" />
              Spotlight Pick
            </div>
          </div>
          <div class="flex-1 p-8 md:p-12 flex flex-col justify-center">
            <p class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">{{ spotlightProduct.category }}</p>
            <h2 class="text-3xl md:text-4xl font-bold mb-3">{{ spotlightProduct.name }}</h2>
            <p class="text-gray-600 dark:text-gray-400 mb-6 text-lg leading-relaxed">{{ spotlightProduct.description }}</p>
            <div class="flex items-center gap-4 mb-6">
              <div class="flex items-center gap-1">
                <UIcon name="i-lucide-star" class="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span class="font-semibold">{{ spotlightProduct.rating }}</span>
                <span class="text-gray-500 dark:text-gray-400 text-sm">({{ spotlightProduct.reviews }} reviews)</span>
              </div>
              <UBadge v-if="spotlightProduct.trending" color="amber" label="Trending" />
            </div>
            <div class="flex items-center gap-6">
              <span class="text-4xl font-black">${{ spotlightProduct.price.toFixed(2) }}</span>
              <UButton
                @click.stop="handleAddToCart(spotlightProduct)"
                size="lg"
                class="shadow-lg transition-all duration-300"
                :class="isCartAdded(spotlightProduct.id)
                  ? 'bg-green-500 hover:bg-green-500 scale-105'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700'"
              >
                <template #leading>
                  <UIcon
                    :name="isCartAdded(spotlightProduct.id) ? 'i-lucide-check' : 'i-lucide-shopping-cart'"
                    class="w-5 h-5 transition-all duration-300"
                  />
                </template>
                {{ isCartAdded(spotlightProduct.id) ? 'Added!' : 'Add to Cart' }}
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Filters and Products -->
    <section class="container mx-auto px-4 py-16">
      <!-- Toolbar -->
      <div class="bg-white dark:bg-gray-900 rounded-2xl p-6 mb-8 border border-gray-200 dark:border-gray-800">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 class="text-2xl font-bold mb-1">Latest Products</h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">Showing {{ newArrivals.length }} new arrivals</p>
          </div>

          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <!-- Filter -->
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-600 dark:text-gray-400">Filter:</span>
              <USelect
                v-model="filterBy"
                :options="filterOptions"
                option-attribute="label"
                value-attribute="value"
                size="sm"
              />
            </div>

            <!-- Sort -->
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-600 dark:text-gray-400">Sort:</span>
              <USelect
                v-model="sortBy"
                :options="sortOptions"
                option-attribute="label"
                value-attribute="value"
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="product in newArrivals"
          :key="product.id"
          :to="`/product/${product.id}`"
          class="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 block"
        >
          <!-- Product Image -->
          <div class="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            
            <!-- Badges -->
            <div class="absolute top-4 left-4 flex flex-col gap-2">
              <UBadge
                :label="product.badge"
                :color="getBadgeColor(product.badge)"
                class="shadow-lg"
              />
              <UBadge
                v-if="product.trending"
                label="Trending"
                color="amber"
                class="shadow-lg"
              >
                <template #leading>
                  <UIcon name="i-lucide-trending-up" class="w-3 h-3" />
                </template>
              </UBadge>
            </div>

            <!-- Release Date -->
            <div class="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded-full">
              {{ getDaysAgo(product.releaseDate) }}
            </div>
            
            <!-- Quick Actions -->
            <div @click.stop.prevent class="absolute top-12 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <button
                @click.stop="handleToggleWishlist(product)"
                class="relative w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-200 overflow-hidden"
              >
                <span
                  v-if="isHeartPopping(product.id) && wishlist.isWishlisted(product.id)"
                  class="absolute inset-0 rounded-full bg-red-300 animate-ripple-out pointer-events-none"
                />
                <UIcon
                  name="i-lucide-heart"
                  class="w-4 h-4 relative z-10"
                  :class="[
                    wishlist.isWishlisted(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-500',
                    isHeartPopping(product.id) ? 'animate-heart-pop' : 'transition-colors'
                  ]"
                />
              </button>
            </div>
            
            <!-- Add to Cart Button -->
            <div @click.stop.prevent class="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <UButton
                block
                @click="handleAddToCart(product)"
                class="shadow-xl transition-all duration-300"
                :class="isCartAdded(product.id)
                  ? 'bg-green-500 hover:bg-green-500 text-white scale-105'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white'"
              >
                <template #leading>
                  <UIcon
                    :name="isCartAdded(product.id) ? 'i-lucide-check' : 'i-lucide-shopping-cart'"
                    class="w-4 h-4 transition-all duration-300"
                  />
                </template>
                {{ isCartAdded(product.id) ? 'Added!' : 'Add to Cart' }}
              </UButton>
            </div>
          </div>
          
          <!-- Product Info -->
          <div class="p-6 space-y-3">
            <div>
              <p class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">{{ product.category }}</p>
              <h3 class="font-semibold text-lg mt-1">{{ product.name }}</h3>
            </div>
            
            <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {{ product.description }}
            </p>
            
            <!-- Rating -->
            <div class="flex items-center gap-2">
              <div class="flex items-center">
                <UIcon name="i-lucide-star" class="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span class="text-sm font-medium ml-1">{{ product.rating }}</span>
              </div>
              <span class="text-xs text-gray-500 dark:text-gray-400">({{ product.reviews }} reviews)</span>
            </div>
            
            <!-- Price -->
            <div class="flex items-center justify-between pt-2">
              <span class="text-2xl font-bold">${{ product.price.toFixed(2) }}</span>
              <UButton
                size="xs"
                variant="ghost"
                trailing-icon="i-lucide-arrow-right"
                :to="`/product/${product.id}`"
              >
                Details
              </UButton>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Trending Section -->
    <section class="bg-gray-50 dark:bg-gray-950 py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white mb-4">
            <UIcon name="i-lucide-flame" class="w-4 h-4" />
            <span class="text-sm font-medium">Trending Now</span>
          </div>
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Most Popular New Arrivals</h2>
          <p class="text-gray-600 dark:text-gray-400 text-lg">What everyone's talking about</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(product, index) in newArrivals.filter(p => p.trending).slice(0, 4)"
            :key="product.id"
            class="group relative bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:border-orange-300 dark:hover:border-orange-700 transition-all duration-300 hover:shadow-xl"
          >
            <!-- Rank Badge -->
            <div class="absolute -top-3 -left-3 w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white flex items-center justify-center font-bold text-lg shadow-lg">
              {{ index + 1 }}
            </div>

            <div class="flex flex-col items-center text-center space-y-4">
              <div class="w-32 h-32 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  :src="product.image"
                  :alt="product.name"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div>
                <h3 class="font-semibold text-lg mb-1">{{ product.name }}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">{{ product.category }}</p>
                
                <div class="flex items-center justify-center gap-1 mb-3">
                  <UIcon name="i-lucide-star" class="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span class="text-sm font-medium">{{ product.rating }}</span>
                </div>

                <div class="text-xl font-bold text-orange-600 dark:text-orange-400">
                  ${{ product.price.toFixed(2) }}
                </div>
              </div>

              <div @click.stop.prevent>
              <UButton
                @click="handleAddToCart(product)"
                size="sm"
                block
                class="transition-all duration-300"
                :class="isCartAdded(product.id)
                  ? 'bg-green-500 hover:bg-green-500 scale-105'
                  : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'"
              >
                <template #leading>
                  <UIcon
                    :name="isCartAdded(product.id) ? 'i-lucide-check' : 'i-lucide-shopping-cart'"
                    class="w-4 h-4 transition-all duration-300"
                  />
                </template>
                {{ isCartAdded(product.id) ? 'Added!' : 'Add to Cart' }}
              </UButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter CTA -->
    <section class="container mx-auto px-4 py-16">
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-600 via-emerald-600 to-green-600 p-12 md:p-16">
        <div class="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
        <div class="relative z-10 max-w-3xl mx-auto text-center text-white space-y-6">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
            <UIcon name="i-lucide-bell-ring" class="w-4 h-4" />
            <span class="text-sm font-medium">Stay Updated</span>
          </div>
          
          <h2 class="text-4xl md:text-5xl font-bold">
            Never Miss a New Release
          </h2>
          <p class="text-xl text-white/90">
            Get notified when we launch new products and exclusive early access
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <UInput
              placeholder="Enter your email"
              size="xl"
              class="flex-1"
              :ui="{ base: 'bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder-white/60' }"
            />
            <UButton
              size="xl"
              class="bg-white text-emerald-600 hover:bg-gray-100 shadow-xl"
            >
              <template #leading>
                <UIcon name="i-lucide-bell" class="w-5 h-5" />
              </template>
              Notify Me
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
