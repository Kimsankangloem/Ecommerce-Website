<script setup>
import { ref, computed, inject, watch } from 'vue'

const cart = inject('cart')
const wishlist = inject('wishlist')
const route = useRoute()

// Shared promo state (persists across navigation)
const pendingPromo = useState('pendingPromo', () => '')
const activePromo = computed(() => (route.query.promo || '').toUpperCase())

// Sync URL promo into shared state
watch(activePromo, (code) => {
  if (code) pendingPromo.value = code
}, { immediate: true })

// Countdown timer for flash sale
const flashSaleEndTime = ref(new Date(Date.now() + 24 * 60 * 60 * 1000)) // 24 hours from now
const timeRemaining = ref({ hours: 0, minutes: 0, seconds: 0 })

const updateCountdown = () => {
  const now = new Date()
  const diff = flashSaleEndTime.value - now
  
  if (diff > 0) {
    timeRemaining.value = {
      hours: Math.floor(diff / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000)
    }
  }
}

onMounted(() => {
  updateCountdown()
  setInterval(updateCountdown, 1000)
})

const flashDeals = ref([
  {
    id: 1,
    name: 'AirPods Pro Max',
    price: 449.99,
    originalPrice: 649.99,
    discount: 31,
    category: 'Audio',
    rating: 4.8,
    reviews: 2847,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    stock: 12,
    sold: 88
  },
  {
    id: 2,
    name: 'Wireless Earbuds Pro',
    price: 149.99,
    originalPrice: 229.99,
    discount: 35,
    category: 'Audio',
    rating: 4.7,
    reviews: 3241,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80',
    stock: 8,
    sold: 142
  },
  {
    id: 3,
    name: 'Smart Watch Ultra',
    price: 329.99,
    originalPrice: 449.99,
    discount: 27,
    category: 'Wearables',
    rating: 4.9,
    reviews: 1523,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80',
    stock: 15,
    sold: 95
  },
  {
    id: 4,
    name: 'Gaming Headset Elite',
    price: 159.99,
    originalPrice: 249.99,
    discount: 36,
    category: 'Gaming',
    rating: 4.8,
    reviews: 1432,
    image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=800&q=80',
    stock: 20,
    sold: 130
  }
])

const weeklyDeals = ref([
  {
    id: 5,
    name: 'Mechanical Keyboard RGB',
    price: 129.99,
    originalPrice: 179.99,
    discount: 28,
    category: 'Accessories',
    rating: 4.9,
    reviews: 1876,
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80'
  },
  {
    id: 6,
    name: 'Webcam 4K Ultra',
    price: 159.99,
    originalPrice: 219.99,
    discount: 27,
    category: 'Accessories',
    rating: 4.8,
    reviews: 1092,
    image: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=800&q=80'
  },
  {
    id: 7,
    name: 'Portable Speaker X',
    price: 99.99,
    originalPrice: 149.99,
    discount: 33,
    category: 'Audio',
    rating: 4.6,
    reviews: 892,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80'
  },
  {
    id: 8,
    name: 'Gaming Mouse RGB',
    price: 69.99,
    originalPrice: 99.99,
    discount: 30,
    category: 'Gaming',
    rating: 4.7,
    reviews: 2156,
    image: 'https://images.unsplash.com/photo-1563297007-0686b7003af7?w=800&q=80'
  },
  {
    id: 9,
    name: 'USB-C Hub Premium',
    price: 69.99,
    originalPrice: 99.99,
    discount: 30,
    category: 'Accessories',
    rating: 4.7,
    reviews: 432,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80'
  },
  {
    id: 10,
    name: 'Fitness Tracker Band',
    price: 119.99,
    originalPrice: 169.99,
    discount: 29,
    category: 'Wearables',
    rating: 4.6,
    reviews: 987,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&q=80'
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

const totalSavings = computed(() => {
  const allDeals = [...flashDeals.value, ...weeklyDeals.value]
  return allDeals.reduce((sum, p) => sum + (p.originalPrice - p.price), 0).toFixed(0)
})

const promoCodes = [
  { code: 'SAVE10', desc: '10% off sitewide', color: 'from-purple-500 to-blue-500', to: '/shop?promo=SAVE10', badge: 'All Products' },
  { code: 'FLASH20', desc: '20% off flash deals', color: 'from-red-500 to-orange-500', to: '/deals?promo=FLASH20#flash-deals', badge: 'Flash Deals Only' },
  { code: 'WELCOME25', desc: '25% off first order', color: 'from-green-500 to-emerald-500', to: '/shop?promo=WELCOME25', badge: 'All Products' }
]

const getStockPercentage = (stock, sold) => {
  const total = stock + sold
  return ((sold / total) * 100).toFixed(0)
}
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section with Countdown -->
    <section class="relative overflow-hidden bg-gradient-to-br from-red-600 via-orange-600 to-yellow-500 dark:from-red-900 dark:via-orange-900 dark:to-yellow-800">
      <div class="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      
      <div class="relative container mx-auto px-4 py-24 md:py-32">
        <div class="max-w-4xl mx-auto text-center text-white space-y-8">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 animate-pulse">
            <UIcon name="i-lucide-zap" class="w-4 h-4" />
            <span class="text-sm font-medium">Limited Time Offers</span>
          </div>
          
          <h1 class="text-5xl md:text-7xl font-bold leading-tight">
            Amazing Deals
            <span class="block bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent">
              Up to 50% Off
            </span>
          </h1>
          
          <p class="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Don't miss out on our exclusive deals and limited-time offers
          </p>

          <!-- Countdown Timer -->
          <div class="flex justify-center gap-4 pt-8">
            <div class="bg-white/20 backdrop-blur-sm rounded-2xl p-6 min-w-[100px] border border-white/30">
              <div class="text-4xl md:text-5xl font-bold">{{ String(timeRemaining.hours).padStart(2, '0') }}</div>
              <div class="text-sm text-white/80 mt-2">Hours</div>
            </div>
            <div class="bg-white/20 backdrop-blur-sm rounded-2xl p-6 min-w-[100px] border border-white/30">
              <div class="text-4xl md:text-5xl font-bold">{{ String(timeRemaining.minutes).padStart(2, '0') }}</div>
              <div class="text-sm text-white/80 mt-2">Minutes</div>
            </div>
            <div class="bg-white/20 backdrop-blur-sm rounded-2xl p-6 min-w-[100px] border border-white/30">
              <div class="text-4xl md:text-5xl font-bold">{{ String(timeRemaining.seconds).padStart(2, '0') }}</div>
              <div class="text-sm text-white/80 mt-2">Seconds</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Savings Strip -->
    <section class="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 py-4">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap items-center justify-center gap-8 text-gray-900 font-bold">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-piggy-bank" class="w-5 h-5" />
            <span>Total savings available: <span class="text-2xl">${{ totalSavings }}+</span></span>
          </div>
          <div class="hidden sm:flex items-center gap-2">
            <UIcon name="i-lucide-clock" class="w-5 h-5" />
            <span>Limited time — don't miss out!</span>
          </div>
          <NuxtLink to="/shop" class="inline-flex items-center gap-1 underline underline-offset-2 hover:opacity-80 transition-opacity">
            Browse All Deals <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Active Promo Banner -->
    <Transition name="slide-down">
      <div v-if="activePromo" class="sticky top-0 z-50 bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg">
        <div class="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <UIcon name="i-lucide-ticket" class="w-5 h-5 text-white flex-shrink-0" />
            <span class="text-white font-bold text-sm">
              <span class="font-black tracking-widest">{{ activePromo }}</span> activated —
              {{ promoCodes.find(p => p.code === activePromo)?.desc || 'discount applied' }}.
              Discount will be applied at checkout.
            </span>
          </div>
          <NuxtLink to="/shoppingcart" class="flex-shrink-0 inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-full transition-colors">
            Go to Cart <UIcon name="i-lucide-arrow-right" class="w-3.5 h-3.5" />
          </NuxtLink>
        </div>
      </div>
    </Transition>

    <!-- Promo Code Cards -->
    <section class="container mx-auto px-4 py-10">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <NuxtLink
          v-for="promo in promoCodes"
          :key="promo.code"
          :to="promo.to"
          class="group relative overflow-hidden rounded-2xl p-6 cursor-pointer hover:scale-105 transition-transform duration-300 block"
        >
          <div :class="`absolute inset-0 bg-gradient-to-br ${promo.color} opacity-10 group-hover:opacity-20 transition-opacity`" />
          <div class="relative flex items-center gap-4">
            <div :class="`w-12 h-12 rounded-xl bg-gradient-to-br ${promo.color} flex items-center justify-center shadow-md flex-shrink-0`">
              <UIcon name="i-lucide-ticket" class="w-6 h-6 text-white" />
            </div>
            <div class="flex-1">
              <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Promo Code</p>
              <p class="font-black tracking-widest text-lg">{{ promo.code }}</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ promo.desc }}</p>
              <span :class="`inline-flex items-center gap-1 mt-1.5 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-gradient-to-r ${promo.color} text-white`">
                {{ promo.badge }}
              </span>
            </div>
            <UIcon name="i-lucide-arrow-right" class="w-5 h-5 text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 group-hover:translate-x-1 transition-all flex-shrink-0" />
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Flash Deals -->
    <section id="flash-deals" class="container mx-auto px-4 py-16">
      <div class="flex items-center justify-between mb-12">
        <div>
          <div class="flex items-center gap-3 mb-2">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
              <UIcon name="i-lucide-zap" class="w-6 h-6 text-white" />
            </div>
            <h2 class="text-3xl md:text-4xl font-bold">Flash Deals</h2>
          </div>
          <p class="text-gray-600 dark:text-gray-400 text-lg">Hurry! Limited stock available</p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <NuxtLink
          v-for="product in flashDeals"
          :key="product.id"
          :to="`/product/${product.id}`"
          class="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border-2 border-red-200 dark:border-red-900 hover:border-red-300 dark:hover:border-red-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 block"
        >
          <!-- Discount Badge -->
          <div class="absolute top-4 left-4 z-10 px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full shadow-lg">
            -{{ product.discount }}%
          </div>

          <!-- Product Image -->
          <div class="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            
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
                class="shadow-xl transition-all duration-300"
                :class="isCartAdded(product.id)
                  ? 'bg-green-500 hover:bg-green-500 text-white scale-105'
                  : 'bg-red-500 hover:bg-red-600 text-white'"
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
            
            <!-- Rating -->
            <div class="flex items-center gap-2">
              <div class="flex items-center">
                <UIcon name="i-lucide-star" class="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span class="text-sm font-medium ml-1">{{ product.rating }}</span>
              </div>
              <span class="text-xs text-gray-500 dark:text-gray-400">({{ product.reviews.toLocaleString() }})</span>
            </div>

            <!-- Stock Progress -->
            <div>
              <div class="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-2">
                <span>Sold: {{ product.sold }}</span>
                <span>Available: {{ product.stock }}</span>
              </div>
              <div class="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  class="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-500"
                  :style="{ width: `${getStockPercentage(product.stock, product.sold)}%` }"
                />
              </div>
            </div>
            
            <!-- Price -->
            <div class="flex items-center gap-2 pt-2">
              <span class="text-2xl font-bold text-red-600 dark:text-red-400">${{ product.price.toFixed(2) }}</span>
              <span class="text-sm text-gray-500 dark:text-gray-400 line-through">
                ${{ product.originalPrice.toFixed(2) }}
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Weekly Deals -->
    <section class="bg-gray-50 dark:bg-gray-950 py-16">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between mb-12">
          <div>
            <div class="flex items-center gap-3 mb-2">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <UIcon name="i-lucide-calendar" class="w-6 h-6 text-white" />
              </div>
              <h2 class="text-3xl md:text-4xl font-bold">Weekly Deals</h2>
            </div>
            <p class="text-gray-600 dark:text-gray-400 text-lg">Special offers that last all week</p>
          </div>
          <UButton variant="ghost" trailing-icon="i-lucide-arrow-right">
            View All
          </UButton>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
            v-for="product in weeklyDeals"
            :key="product.id"
            :to="`/product/${product.id}`"
            class="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 block"
          >
            <!-- Discount Badge -->
            <div class="absolute top-4 left-4 z-10 px-3 py-1 bg-purple-500 text-white text-sm font-bold rounded-full shadow-lg">
              -{{ product.discount }}%
            </div>

            <!-- Product Image -->
            <div class="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img
                :src="product.image"
                :alt="product.name"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
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
                <span class="text-2xl font-bold text-purple-600 dark:text-purple-400">${{ product.price.toFixed(2) }}</span>
                <span class="text-sm text-gray-500 dark:text-gray-400 line-through">
                  ${{ product.originalPrice.toFixed(2) }}
                </span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Newsletter CTA -->
    <section class="container mx-auto px-4 py-16">
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 p-12 md:p-16">
        <div class="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
        <div class="relative z-10 max-w-3xl mx-auto text-center text-white space-y-6">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
            <UIcon name="i-lucide-bell" class="w-4 h-4" />
            <span class="text-sm font-medium">Never Miss a Deal</span>
          </div>
          
          <h2 class="text-4xl md:text-5xl font-bold">
            Get Exclusive Deals in Your Inbox
          </h2>
          <p class="text-xl text-white/90">
            Subscribe to our newsletter and be the first to know about flash sales and special offers
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
              class="bg-white text-red-600 hover:bg-gray-100 shadow-xl"
            >
              <template #leading>
                <UIcon name="i-lucide-mail" class="w-5 h-5" />
              </template>
              Subscribe
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
