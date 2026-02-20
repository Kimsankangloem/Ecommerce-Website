<script setup>
import { ref, computed, watch, inject } from 'vue'

const cart = inject('cart')
const route = useRoute()
const wishlist = inject('wishlist')

// Shared promo state
const pendingPromo = useState('pendingPromo', () => '')
const activePromo = computed(() => (route.query.promo || '').toUpperCase())

// Sync URL promo into shared state
watch(activePromo, (code) => {
  if (code) pendingPromo.value = code
}, { immediate: true })

// View mode
const viewMode = ref('grid') // 'grid' or 'list'

// Filters
const selectedCategory = ref('all')
const selectedPriceRange = ref('all')
const selectedRating = ref(0)
const sortBy = ref('featured')
const searchQuery = ref('')

// Populate search from URL query param (?q=...)
const syncFromRoute = () => {
  if (route.query.q) {
    searchQuery.value = decodeURIComponent(String(route.query.q))
  }
}
syncFromRoute()
watch(() => route.query.q, syncFromRoute)

// Populate category filter from URL query param (?category=...)
const validCategories = ['audio', 'wearables', 'accessories', 'gaming']
const syncCategoryFromRoute = () => {
  const cat = String(route.query.category || '').toLowerCase()
  selectedCategory.value = validCategories.includes(cat) ? cat : 'all'
}
syncCategoryFromRoute()
watch(() => route.query.category, syncCategoryFromRoute)

// Populate sort from URL query param (?sort=...)
const validSorts = ['featured', 'price-low', 'price-high', 'rating', 'newest']
const syncSortFromRoute = () => {
  const s = String(route.query.sort || '')
  if (validSorts.includes(s)) sortBy.value = s
}
syncSortFromRoute()
watch(() => route.query.sort, syncSortFromRoute)
const ratingOptions = [
  { value: 0, label: 'All Ratings' },
  { value: 4.5, label: '4.5+ Stars' },
  { value: 4, label: '4.0+ Stars' },
  { value: 3, label: '3.0+ Stars' }
]

const categories = [
  { value: 'all', label: 'All Products' },
  { value: 'audio', label: 'Audio' },
  { value: 'wearables', label: 'Wearables' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'gaming', label: 'Gaming' }
]

const priceRanges = [
  { value: 'all', label: 'All Prices' },
  { value: '0-100', label: 'Under $100' },
  { value: '100-300', label: '$100 - $300' },
  { value: '300-500', label: '$300 - $500' },
  { value: '500+', label: '$500+' }
]

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' }
]

// All products
const allProducts = ref([
  {
    id: 1,
    name: 'AirPods Pro Max',
    price: 549.99,
    originalPrice: 649.99,
    category: 'audio',
    rating: 4.8,
    reviews: 2847,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    badge: 'Bestseller',
    description: 'Premium wireless headphones with active noise cancellation and spatial audio',
    inStock: true
  },
  {
    id: 2,
    name: 'Smart Watch Ultra',
    price: 399.99,
    category: 'wearables',
    rating: 4.9,
    reviews: 1523,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80',
    badge: 'New',
    description: 'Advanced fitness tracking with stunning AMOLED display',
    inStock: true
  },
  {
    id: 3,
    name: 'Wireless Earbuds Pro',
    price: 179.99,
    originalPrice: 229.99,
    category: 'audio',
    rating: 4.7,
    reviews: 3241,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80',
    badge: 'Sale',
    description: 'Crystal clear sound with all-day battery life',
    inStock: true
  },
  {
    id: 4,
    name: 'Portable Speaker X',
    price: 129.99,
    category: 'audio',
    rating: 4.6,
    reviews: 892,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80',
    description: 'Powerful 360° sound in a compact design',
    inStock: true
  },
  {
    id: 5,
    name: 'Mechanical Keyboard RGB',
    price: 159.99,
    category: 'accessories',
    rating: 4.9,
    reviews: 1876,
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80',
    badge: 'Popular',
    description: 'Premium mechanical switches with customizable RGB',
    inStock: true
  },
  {
    id: 6,
    name: 'Wireless Mouse Pro',
    price: 79.99,
    category: 'accessories',
    rating: 4.5,
    reviews: 654,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80',
    description: 'Ergonomic design with precision tracking',
    inStock: true
  },
  {
    id: 7,
    name: 'Gaming Headset Elite',
    price: 199.99,
    category: 'gaming',
    rating: 4.8,
    reviews: 1432,
    image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=800&q=80',
    description: '7.1 surround sound with noise-canceling microphone',
    inStock: true
  },
  {
    id: 8,
    name: 'Webcam 4K Ultra',
    price: 199.99,
    category: 'accessories',
    rating: 4.8,
    reviews: 1092,
    image: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=800&q=80',
    badge: 'New',
    description: 'Professional 4K video with AI-powered features',
    inStock: true
  },
  {
    id: 9,
    name: 'Gaming Mouse RGB',
    price: 89.99,
    category: 'gaming',
    rating: 4.7,
    reviews: 2156,
    image: 'https://images.unsplash.com/photo-1563297007-0686b7003af7?w=800&q=80',
    description: 'High-precision sensor with customizable buttons',
    inStock: true
  },
  {
    id: 10,
    name: 'Fitness Tracker Band',
    price: 149.99,
    category: 'wearables',
    rating: 4.6,
    reviews: 987,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&q=80',
    description: 'Track your health and fitness goals 24/7',
    inStock: true
  },
  {
    id: 11,
    name: 'USB-C Hub Premium',
    price: 89.99,
    category: 'accessories',
    rating: 4.7,
    reviews: 432,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
    description: '7-in-1 connectivity solution for your workspace',
    inStock: true
  },
  {
    id: 12,
    name: 'Gaming Controller Pro',
    price: 69.99,
    category: 'gaming',
    rating: 4.5,
    reviews: 1765,
    image: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=800&q=80',
    description: 'Wireless controller with haptic feedback',
    inStock: false
  }
])

// Filtered and sorted products
const filteredProducts = computed(() => {
  let products = [...allProducts.value]

  // Filter by category
  if (selectedCategory.value !== 'all') {
    products = products.filter(p => p.category === selectedCategory.value)
  }

  // Filter by price range
  if (selectedPriceRange.value !== 'all') {
    const [min, max] = selectedPriceRange.value.split('-').map(v => v.replace('+', ''))
    products = products.filter(p => {
      if (max) {
        return p.price >= parseFloat(min) && p.price <= parseFloat(max)
      } else {
        return p.price >= parseFloat(min)
      }
    })
  }

  // Filter by search query
  if (searchQuery.value) {
    products = products.filter(p => 
      p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Filter by rating
  if (selectedRating.value > 0) {
    products = products.filter(p => p.rating >= selectedRating.value)
  }

  // Sort products
  switch (sortBy.value) {
    case 'price-low':
      products.sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      products.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      products.sort((a, b) => b.rating - a.rating)
      break
    case 'newest':
      products.sort((a, b) => b.id - a.id)
      break
  }

  return products
})

const { triggerCartAdded, isCartAdded, triggerHeartPop, isHeartPopping } = useProductAnimations()

const handleAddToCart = (product) => {
  cart.addToCart(product)
  triggerCartAdded(product.id)
}

const handleToggleWishlist = (product) => {
  wishlist.toggle(product)
  triggerHeartPop(product.id)
}

const getBadgeColor = (badge) => {
  const colors = {
    'Bestseller': 'amber',
    'New': 'blue',
    'Sale': 'red',
    'Popular': 'purple'
  }
  return colors[badge] || 'gray'
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <!-- Active Promo Banner -->
    <Transition name="slide-down">
      <div v-if="activePromo" class="sticky top-0 z-50 bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg">
        <div class="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <UIcon name="i-lucide-ticket" class="w-5 h-5 text-white flex-shrink-0" />
            <span class="text-white font-bold text-sm">
              <span class="font-black tracking-widest">{{ activePromo }}</span> activated —
              {{ activePromo === 'SAVE10' ? '10% off sitewide' : activePromo === 'WELCOME25' ? '25% off your first order' : 'discount active' }}.
              Discount will be applied at checkout.
            </span>
          </div>
          <NuxtLink to="/shoppingcart" class="flex-shrink-0 inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-full transition-colors">
            Go to Cart <UIcon name="i-lucide-arrow-right" class="w-3.5 h-3.5" />
          </NuxtLink>
        </div>
      </div>
    </Transition>

    <!-- Page Header -->
    <div class="relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-900 dark:to-blue-900">
      <div class="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div class="absolute bottom-0 left-20 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl translate-y-1/2" />
      <div class="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
      <div class="relative container mx-auto px-4 py-20">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-medium mb-4">
            <UIcon name="i-lucide-shopping-bag" class="w-3.5 h-3.5" />
            Complete Catalog
          </div>
          <h1 class="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">Shop All Products</h1>
          <p class="text-xl text-white/90">Discover our complete collection of premium tech products</p>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar Filters -->
        <aside class="lg:w-64 flex-shrink-0">
          <div class="sticky top-4 space-y-6">
            <!-- Search -->
            <div class="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
              <h3 class="font-semibold mb-4">Search</h3>
              <UInput
                v-model="searchQuery"
                icon="i-lucide-search"
                placeholder="Search products..."
              />
            </div>

            <!-- Category Filter -->
            <div class="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
              <h3 class="font-semibold mb-4">Category</h3>
              <div class="space-y-2">
                <div
                  v-for="category in categories"
                  :key="category.value"
                  @click="selectedCategory = category.value"
                  class="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors"
                  :class="selectedCategory === category.value ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' : 'hover:bg-gray-100 dark:hover:bg-gray-800'"
                >
                  <div
                    class="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                    :class="selectedCategory === category.value ? 'border-purple-600 dark:border-purple-400' : 'border-gray-300 dark:border-gray-700'"
                  >
                    <div
                      v-if="selectedCategory === category.value"
                      class="w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-400"
                    />
                  </div>
                  <span class="text-sm">{{ category.label }}</span>
                </div>
              </div>
            </div>

            <!-- Rating Filter -->
            <div class="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
              <h3 class="font-semibold mb-4">Customer Rating</h3>
              <div class="space-y-2">
                <div
                  v-for="option in ratingOptions"
                  :key="option.value"
                  @click="selectedRating = option.value"
                  class="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors"
                  :class="selectedRating === option.value ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' : 'hover:bg-gray-100 dark:hover:bg-gray-800'"
                >
                  <div
                    class="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                    :class="selectedRating === option.value ? 'border-purple-600 dark:border-purple-400' : 'border-gray-300 dark:border-gray-700'"
                  >
                    <div v-if="selectedRating === option.value" class="w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-400" />
                  </div>
                  <div class="flex items-center gap-1.5">
                    <template v-if="option.value > 0">
                      <UIcon name="i-lucide-star" class="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span class="text-sm">{{ option.label }}</span>
                    </template>
                    <span v-else class="text-sm">{{ option.label }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Price Range Filter -->
            <div class="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
              <h3 class="font-semibold mb-4">Price Range</h3>
              <div class="space-y-2">
                <div
                  v-for="range in priceRanges"
                  :key="range.value"
                  @click="selectedPriceRange = range.value"
                  class="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors"
                  :class="selectedPriceRange === range.value ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' : 'hover:bg-gray-100 dark:hover:bg-gray-800'"
                >
                  <div
                    class="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                    :class="selectedPriceRange === range.value ? 'border-purple-600 dark:border-purple-400' : 'border-gray-300 dark:border-gray-700'"
                  >
                    <div
                      v-if="selectedPriceRange === range.value"
                      class="w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-400"
                    />
                  </div>
                  <span class="text-sm">{{ range.label }}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1">
          <!-- Toolbar -->
          <div class="bg-white dark:bg-gray-900 rounded-2xl p-4 mb-6 border border-gray-200 dark:border-gray-800">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div class="text-sm text-gray-600 dark:text-gray-400">
                Showing <span class="font-semibold text-gray-900 dark:text-white">{{ filteredProducts.length }}</span> products
              </div>

              <div class="flex items-center gap-4">
                <!-- Sort -->
                <USelect
                  v-model="sortBy"
                  :options="sortOptions"
                  option-attribute="label"
                  value-attribute="value"
                  size="sm"
                />

                <!-- View Toggle -->
                <div class="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <button
                    @click="viewMode = 'grid'"
                    class="p-2 rounded transition-colors"
                    :class="viewMode === 'grid' ? 'bg-white dark:bg-gray-700 shadow-sm' : 'hover:bg-gray-200 dark:hover:bg-gray-700'"
                  >
                    <UIcon name="i-lucide-grid-3x3" class="w-4 h-4" />
                  </button>
                  <button
                    @click="viewMode = 'list'"
                    class="p-2 rounded transition-colors"
                    :class="viewMode === 'list' ? 'bg-white dark:bg-gray-700 shadow-sm' : 'hover:bg-gray-200 dark:hover:bg-gray-700'"
                  >
                    <UIcon name="i-lucide-list" class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Products Grid -->
          <div
            v-if="viewMode === 'grid'"
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <NuxtLink
              v-for="product in filteredProducts"
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
                
                <!-- Badge -->
                <UBadge
                  v-if="product.badge"
                  :label="product.badge"
                  :color="getBadgeColor(product.badge)"
                  class="absolute top-4 left-4"
                />

                <!-- Stock Status -->
                <div
                  v-if="!product.inStock"
                  class="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full"
                >
                  Out of Stock
                </div>
                
                <!-- Quick Actions -->
                <div @click.stop.prevent class="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    @click="handleToggleWishlist(product)"
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
                  <UButton
                    icon="i-lucide-eye"
                    size="sm"
                    color="white"
                    class="shadow-lg"
                    :to="`/product/${product.id}`"
                  />
                </div>
                
                <!-- Add to Cart Button -->
                <div @click.stop.prevent class="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <UButton
                    block
                    @click="handleAddToCart(product)"
                    :disabled="!product.inStock"
                    class="shadow-xl transition-all duration-300"
                    :class="isCartAdded(product.id)
                      ? 'bg-green-500 hover:bg-green-500 text-white scale-105'
                      : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'"
                  >
                    <template #leading>
                      <UIcon
                        :name="isCartAdded(product.id) ? 'i-lucide-check' : 'i-lucide-shopping-cart'"
                        class="w-4 h-4 transition-all duration-300"
                      />
                    </template>
                    {{ isCartAdded(product.id) ? 'Added!' : (product.inStock ? 'Add to Cart' : 'Out of Stock') }}
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
                  <span class="text-xs text-gray-500 dark:text-gray-400">({{ product.reviews.toLocaleString() }})</span>
                </div>
                
                <!-- Price -->
                <div class="flex items-center gap-2 pt-2">
                  <span class="text-2xl font-bold">${{ product.price.toFixed(2) }}</span>
                  <span v-if="product.originalPrice" class="text-sm text-gray-500 dark:text-gray-400 line-through">
                    ${{ product.originalPrice.toFixed(2) }}
                  </span>
                </div>
              </div>
            </NuxtLink>
          </div>

          <!-- Products List -->
          <div v-else class="space-y-4">
            <NuxtLink
              v-for="product in filteredProducts"
              :key="product.id"
              :to="`/product/${product.id}`"
              class="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-xl block"
            >
              <div class="flex flex-col sm:flex-row gap-6 p-6">
                <!-- Product Image -->
                <div class="relative w-full sm:w-48 aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-xl flex-shrink-0">
                  <img
                    :src="product.image"
                    :alt="product.name"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  <!-- Badge -->
                  <UBadge
                    v-if="product.badge"
                    :label="product.badge"
                    :color="getBadgeColor(product.badge)"
                    class="absolute top-3 left-3"
                  />
                </div>
                
                <!-- Product Info -->
                <div class="flex-1 flex flex-col justify-between">
                  <div>
                    <p class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">{{ product.category }}</p>
                    <h3 class="font-semibold text-xl mt-1 mb-2">{{ product.name }}</h3>
                    <p class="text-gray-600 dark:text-gray-400 mb-4">{{ product.description }}</p>
                    
                    <!-- Rating -->
                    <div class="flex items-center gap-2">
                      <div class="flex items-center">
                        <UIcon name="i-lucide-star" class="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span class="text-sm font-medium ml-1">{{ product.rating }}</span>
                      </div>
                      <span class="text-xs text-gray-500 dark:text-gray-400">({{ product.reviews.toLocaleString() }} reviews)</span>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between mt-4">
                    <!-- Price -->
                    <div class="flex items-center gap-2">
                      <span class="text-3xl font-bold">${{ product.price.toFixed(2) }}</span>
                      <span v-if="product.originalPrice" class="text-sm text-gray-500 dark:text-gray-400 line-through">
                        ${{ product.originalPrice.toFixed(2) }}
                      </span>
                    </div>
                    
                    <!-- Actions -->
                    <div @click.stop.prevent class="flex items-center gap-2">
                      <button
                        @click="handleToggleWishlist(product)"
                        class="relative w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-200 overflow-hidden"
                        :class="wishlist.isWishlisted(product.id) ? 'border-red-300 bg-red-50 dark:bg-red-900/10' : 'border-gray-200 dark:border-gray-700 hover:border-red-300 hover:bg-red-50 dark:hover:bg-red-900/10'"
                      >
                        <span
                          v-if="isHeartPopping(product.id) && wishlist.isWishlisted(product.id)"
                          class="absolute inset-0 rounded-xl bg-red-300 animate-ripple-out pointer-events-none"
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
                      <UButton
                        @click="handleAddToCart(product)"
                        :disabled="!product.inStock"
                        class="transition-all duration-300"
                        :class="isCartAdded(product.id)
                          ? 'bg-green-500 hover:bg-green-500 scale-105'
                          : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'"
                      >
                        <template #leading>
                          <UIcon
                            :name="isCartAdded(product.id) ? 'i-lucide-check' : 'i-lucide-shopping-cart'"
                            class="w-4 h-4 transition-all duration-300"
                          />
                        </template>
                        {{ isCartAdded(product.id) ? 'Added!' : (product.inStock ? 'Add to Cart' : 'Out of Stock') }}
                      </UButton>
                    </div>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>

          <!-- Empty State -->
          <div v-if="filteredProducts.length === 0" class="text-center py-24">
            <div class="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-6">
              <UIcon name="i-lucide-search-x" class="w-12 h-12 text-gray-400" />
            </div>
            <h3 class="text-2xl font-semibold mb-3">No products found</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-sm mx-auto">Try adjusting your filters or search query to discover more products</p>
            <div class="flex flex-col sm:flex-row gap-3 justify-center">
              <UButton @click="selectedCategory = 'all'; selectedPriceRange = 'all'; selectedRating = 0; searchQuery = ''" variant="solid" class="bg-purple-600 hover:bg-purple-700">
                <template #leading><UIcon name="i-lucide-refresh-cw" class="w-4 h-4" /></template>
                Reset All Filters
              </UButton>
              <UButton to="/" variant="outline">Browse Homepage</UButton>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-grid-white\/10 {
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
}
</style>