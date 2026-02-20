<script setup>
import { ref, inject, computed } from 'vue'

const route = useRoute()
const cart = inject('cart')
const wishlist = inject('wishlist')

const { triggerCartAdded, isCartAdded, triggerHeartPop, isHeartPopping } = useProductAnimations()

const allProducts = [
  {
    id: 1,
    name: 'AirPods Pro Max',
    price: 549.99,
    originalPrice: 649.99,
    category: 'Audio',
    rating: 4.8,
    reviews: 2847,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    badge: 'Bestseller',
    description: 'Premium wireless headphones with active noise cancellation and spatial audio',
    inStock: true,
    features: ['Active Noise Cancellation', 'Spatial Audio', '30h Battery Life', 'Lightning/USB-C Charging'],
    colors: ['Midnight', 'Starlight', 'Sky Blue', 'Pink']
  },
  {
    id: 2,
    name: 'Smart Watch Ultra',
    price: 399.99,
    category: 'Wearables',
    rating: 4.9,
    reviews: 1523,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80',
    badge: 'New',
    description: 'Advanced fitness tracking with stunning AMOLED display',
    inStock: true,
    features: ['AMOLED Display', 'ECG Monitor', 'GPS Tracking', '7-day Battery'],
    colors: ['Graphite', 'Silver', 'Rose Gold', 'Midnight']
  },
  {
    id: 3,
    name: 'Wireless Earbuds Pro',
    price: 179.99,
    originalPrice: 229.99,
    category: 'Audio',
    rating: 4.7,
    reviews: 3241,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80',
    badge: 'Sale',
    description: 'Crystal clear sound with all-day battery life',
    inStock: true,
    features: ['30h Total Battery', 'IPX4 Water Resistant', 'Wireless Charging Case', 'Touch Controls'],
    colors: ['Midnight Black', 'Pearl White', 'Sage Green']
  },
  {
    id: 4,
    name: 'Portable Speaker X',
    price: 129.99,
    category: 'Audio',
    rating: 4.6,
    reviews: 892,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80',
    description: 'Powerful 360° sound in a compact design',
    inStock: true,
    features: ['360° Sound', 'IPX7 Waterproof', '24h Battery', 'Built-in Mic'],
    colors: ['Midnight Black', 'Forest Green', 'Slate Blue', 'Coral']
  },
  {
    id: 5,
    name: 'Mechanical Keyboard RGB',
    price: 159.99,
    category: 'Accessories',
    rating: 4.9,
    reviews: 1876,
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80',
    badge: 'Popular',
    description: 'Premium mechanical switches with customizable RGB',
    inStock: true,
    features: ['Per-key RGB', 'Hot-swappable Switches', 'Aluminum Frame', 'USB-C Cable'],
    colors: ['Space White', 'Carbon Black']
  },
  {
    id: 6,
    name: 'Wireless Mouse Pro',
    price: 79.99,
    category: 'Accessories',
    rating: 4.5,
    reviews: 654,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80',
    description: 'Ergonomic design with precision tracking',
    inStock: true,
    features: ['16000 DPI Sensor', 'Ergonomic Shape', '70h Battery', 'USB-C Charging'],
    colors: ['Matte Black', 'Pure White']
  },
  {
    id: 7,
    name: 'Gaming Headset Elite',
    price: 199.99,
    category: 'Gaming',
    rating: 4.8,
    reviews: 1432,
    image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=800&q=80',
    description: '7.1 surround sound with noise-canceling microphone',
    inStock: true,
    features: ['7.1 Surround Sound', 'Noise-canceling Mic', 'Memory Foam Ear Cups', 'USB/3.5mm Jack'],
    colors: ['Carbon Black', 'Midnight Blue']
  },
  {
    id: 8,
    name: 'Webcam 4K Ultra',
    price: 199.99,
    category: 'Accessories',
    rating: 4.8,
    reviews: 1092,
    image: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=800&q=80',
    badge: 'New',
    description: 'Professional 4K video with AI-powered features',
    inStock: true,
    features: ['4K 60fps', 'AI Auto-framing', 'Built-in Ring Light', 'Noise-cancelling Mic'],
    colors: ['Space Gray', 'Matte Black']
  },
  {
    id: 9,
    name: 'Gaming Mouse RGB',
    price: 89.99,
    category: 'Gaming',
    rating: 4.7,
    reviews: 2156,
    image: 'https://images.unsplash.com/photo-1563297007-0686b7003af7?w=800&q=80',
    description: 'High-precision sensor with customizable buttons',
    inStock: true,
    features: ['25600 DPI Sensor', '8 Programmable Buttons', 'Per-key RGB', '70h Battery'],
    colors: ['Cosmic Black', 'Nova White']
  },
  {
    id: 10,
    name: 'Fitness Tracker Band',
    price: 149.99,
    category: 'Wearables',
    rating: 4.6,
    reviews: 987,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&q=80',
    description: 'Track your health and fitness goals 24/7',
    inStock: true,
    features: ['Heart Rate Monitor', 'Sleep Tracking', 'GPS', '14-day Battery'],
    colors: ['Midnight Black', 'Blush Pink', 'Arctic Blue']
  },
  {
    id: 11,
    name: 'USB-C Hub Premium',
    price: 89.99,
    category: 'Accessories',
    rating: 4.7,
    reviews: 432,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
    description: '7-in-1 connectivity solution for your workspace',
    inStock: true,
    features: ['7 Ports', '100W Power Delivery', '4K HDMI', 'SD Card Reader'],
    colors: ['Space Gray', 'Silver']
  },
  {
    id: 12,
    name: 'Gaming Controller Pro',
    price: 69.99,
    category: 'Gaming',
    rating: 4.5,
    reviews: 1765,
    image: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=800&q=80',
    description: 'Wireless controller with haptic feedback',
    inStock: false,
    features: ['Haptic Feedback', 'Adaptive Triggers', 'Hall Effect Sticks', '40h Battery'],
    colors: ['Cosmic Black', 'Nova White', 'Volt Yellow']
  }
]

const product = computed(() => allProducts.find(p => p.id === Number(route.params.id)))

const selectedColor = ref(null)
const quantity = ref(1)

watch(product, (p) => {
  if (p?.colors?.length) selectedColor.value = p.colors[0]
}, { immediate: true })

const colorFilter = computed(() => {
  const c = (selectedColor.value || '').toLowerCase()
  if (c.includes('midnight blue')) return 'hue-rotate(220deg) saturate(2) brightness(0.65)'
  if (c.includes('midnight') || c.includes('carbon') || c.includes('cosmic')) return 'brightness(0.65) saturate(0.3)'
  if (c.includes('black')) return 'brightness(0.72) saturate(0.25)'
  if (c.includes('starlight') || c.includes('pearl') || c.includes('silver')) return 'brightness(1.3) saturate(0.35)'
  if (c.includes('white')) return 'brightness(1.35) saturate(0.2)'
  if (c.includes('sky blue') || c.includes('arctic') || c.includes('slate blue')) return 'hue-rotate(195deg) saturate(1.4) brightness(1.05)'
  if (c.includes('blue')) return 'hue-rotate(210deg) saturate(1.5)'
  if (c.includes('rose gold')) return 'hue-rotate(340deg) saturate(1.6) brightness(1.1)'
  if (c.includes('pink') || c.includes('blush')) return 'hue-rotate(305deg) saturate(1.9) brightness(1.08)'
  if (c.includes('forest green') || c.includes('sage')) return 'hue-rotate(95deg) saturate(1.6) brightness(0.9)'
  if (c.includes('green')) return 'hue-rotate(90deg) saturate(1.5)'
  if (c.includes('coral')) return 'hue-rotate(340deg) saturate(2.2) brightness(1.0)'
  if (c.includes('volt') || c.includes('yellow')) return 'hue-rotate(42deg) saturate(2.5) brightness(1.15)'
  if (c.includes('graphite') || c.includes('space gray') || c.includes('gray')) return 'saturate(0.25) brightness(0.88)'
  return 'none'
})

const handleAddToCart = () => {
  if (!product.value) return
  cart.addToCart({ ...product.value, selectedColor: selectedColor.value, quantity: quantity.value })
  triggerCartAdded(product.value.id)
}

const handleToggleWishlist = () => {
  if (!product.value) return
  wishlist.toggle(product.value)
  triggerHeartPop(product.value.id)
}

const getBadgeColor = (badge) => {
  const colors = { 'Just Arrived': 'green', 'New': 'blue', 'Hot': 'red', 'Premium': 'purple' }
  return colors[badge] || 'gray'
}

const relatedProducts = computed(() =>
  allProducts.filter(p => p.id !== product.value?.id && p.category === product.value?.category).slice(0, 3)
)

useHead({
  title: computed(() => product.value ? `${product.value.name} — Store ∈ SAN` : 'Product — Store ∈ SAN')
})
</script>

<template>
  <div class="min-h-screen">
    <!-- Not Found -->
    <div v-if="!product" class="container mx-auto px-4 py-32 text-center">
      <UIcon name="i-lucide-package-x" class="w-20 h-20 mx-auto text-gray-300 mb-6" />
      <h1 class="text-3xl font-bold mb-3">Product Not Found</h1>
      <p class="text-gray-500 mb-8">The product you're looking for doesn't exist.</p>
      <UButton to="/newarrivals" size="lg" color="primary">Back to New Arrivals</UButton>
    </div>

    <template v-else>
      <!-- Breadcrumb -->
      <div class="border-b border-gray-200 dark:border-gray-800">
        <div class="container mx-auto px-4 py-4">
          <nav class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <NuxtLink to="/" class="hover:text-gray-900 dark:hover:text-white transition-colors">Home</NuxtLink>
            <UIcon name="i-lucide-chevron-right" class="w-4 h-4" />
            <NuxtLink to="/newarrivals" class="hover:text-gray-900 dark:hover:text-white transition-colors">New Arrivals</NuxtLink>
            <UIcon name="i-lucide-chevron-right" class="w-4 h-4" />
            <span class="text-gray-900 dark:text-white font-medium truncate">{{ product.name }}</span>
          </nav>
        </div>
      </div>

      <!-- Main Product Section -->
      <section class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          <!-- Product Image -->
          <div class="relative">
            <div class="aspect-square rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-900 shadow-2xl">
              <img
                :src="product.image"
                :alt="product.name"
                class="w-full h-full object-cover transition-all duration-500"
                :style="{ filter: colorFilter }"
              />
            </div>
            <!-- Badge -->
            <div class="absolute top-4 left-4">
              <UBadge :color="getBadgeColor(product.badge)" size="lg" class="shadow-lg px-3 py-1 text-sm font-semibold">
                {{ product.badge }}
              </UBadge>
            </div>
            <!-- Wishlist -->
            <button
              @click="handleToggleWishlist"
              class="absolute top-4 right-4 w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-200"
            >
              <UIcon
                name="i-lucide-heart"
                class="w-6 h-6"
                :class="wishlist.isWishlisted(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-500'"
              />
            </button>
          </div>

          <!-- Product Info -->
          <div class="space-y-6">
            <!-- Category & Name -->
            <div>
              <p class="text-sm text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-semibold mb-2">
                {{ product.category }}
              </p>
              <h1 class="text-4xl font-bold leading-tight">{{ product.name }}</h1>
            </div>

            <!-- Rating -->
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-1">
                <UIcon
                  v-for="i in 5"
                  :key="i"
                  name="i-lucide-star"
                  class="w-5 h-5"
                  :class="i <= Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'"
                />
              </div>
              <span class="font-semibold">{{ product.rating }}</span>
              <span class="text-gray-500 dark:text-gray-400">({{ product.reviews }} reviews)</span>
            </div>

            <!-- Price -->
            <div class="flex items-baseline gap-3">
              <span class="text-4xl font-black">${{ product.price.toFixed(2) }}</span>
              <UBadge color="green" variant="soft">Free Shipping</UBadge>
            </div>

            <!-- Description -->
            <p class="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              {{ product.description }}
            </p>

            <!-- Colors -->
            <div v-if="product.colors?.length">
              <p class="text-sm font-semibold mb-3 uppercase tracking-wide">
                Color: <span class="font-normal text-gray-600 dark:text-gray-400">{{ selectedColor }}</span>
              </p>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="color in product.colors"
                  :key="color"
                  @click="selectedColor = color"
                  class="px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all duration-200"
                  :class="selectedColor === color
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500'"
                >
                  {{ color }}
                </button>
              </div>
            </div>

            <!-- Quantity -->
            <div>
              <p class="text-sm font-semibold mb-3 uppercase tracking-wide">Quantity</p>
              <div class="flex items-center gap-3">
                <button
                  @click="quantity = Math.max(1, quantity - 1)"
                  class="w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <UIcon name="i-lucide-minus" class="w-4 h-4" />
                </button>
                <span class="text-xl font-bold w-8 text-center">{{ quantity }}</span>
                <button
                  @click="quantity++"
                  class="w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <UIcon name="i-lucide-plus" class="w-4 h-4" />
                </button>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-4 pt-2">
              <UButton
                block
                size="xl"
                @click.stop="handleAddToCart"
                :class="isCartAdded(product.id)
                  ? 'bg-green-500 hover:bg-green-500 text-white'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white'"
                class="flex-1 shadow-lg transition-all duration-300"
              >
                <template #leading>
                  <UIcon
                    :name="isCartAdded(product.id) ? 'i-lucide-check' : 'i-lucide-shopping-cart'"
                    class="w-5 h-5"
                  />
                </template>
                {{ isCartAdded(product.id) ? 'Added to Cart!' : 'Add to Cart' }}
              </UButton>

              <UButton
                size="xl"
                variant="outline"
                to="/shoppingcart"
                class="border-2"
              >
                <UIcon name="i-lucide-shopping-bag" class="w-5 h-5" />
              </UButton>
            </div>

            <!-- Features -->
            <div class="pt-4 border-t border-gray-200 dark:border-gray-800">
              <p class="text-sm font-semibold mb-4 uppercase tracking-wide">Key Features</p>
              <ul class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <li
                  v-for="feature in product.features"
                  :key="feature"
                  class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  <UIcon name="i-lucide-check-circle" class="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  {{ feature }}
                </li>
              </ul>
            </div>

            <!-- Stock -->
            <div class="flex items-center gap-2 text-sm">
              <UIcon
                :name="product.inStock ? 'i-lucide-check-circle' : 'i-lucide-x-circle'"
                class="w-4 h-4"
                :class="product.inStock ? 'text-green-500' : 'text-red-500'"
              />
              <span :class="product.inStock ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- Related Products -->
      <section v-if="relatedProducts.length" class="bg-gray-50 dark:bg-gray-950 py-16">
        <div class="container mx-auto px-4">
          <h2 class="text-2xl font-bold mb-8">More in {{ product.category }}</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <NuxtLink
              v-for="related in relatedProducts"
              :key="related.id"
              :to="`/product/${related.id}`"
              class="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 hover:shadow-xl"
            >
              <div class="aspect-video overflow-hidden">
                <img
                  :src="related.image"
                  :alt="related.name"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div class="p-5">
                <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">{{ related.category }}</p>
                <h3 class="font-semibold text-lg mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{{ related.name }}</h3>
                <div class="flex items-center justify-between">
                  <span class="text-xl font-bold">${{ related.price.toFixed(2) }}</span>
                  <div class="flex items-center gap-1 text-sm text-gray-500">
                    <UIcon name="i-lucide-star" class="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {{ related.rating }}
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped>
.bg-grid-white\/10 {
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
}
</style>
