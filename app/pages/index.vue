<script setup>
import { ref, inject, onMounted } from 'vue'

const cart = inject('cart')
const wishlist = inject('wishlist')

const testimonials = ref([
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Verified Buyer',
    avatar: 'https://i.pravatar.cc/64?img=1',
    rating: 5,
    text: 'Absolutely love my AirPods Pro Max! The sound quality is unmatched and delivery was super fast. Store ∈ SAN never disappoints.',
    product: 'AirPods Pro Max'
  },
  {
    id: 2,
    name: 'Marcus Chen',
    role: 'Verified Buyer',
    avatar: 'https://i.pravatar.cc/64?img=8',
    rating: 5,
    text: 'The Smart Watch Ultra exceeded all my expectations. Sleek design, accurate health tracking, and the AMOLED display is stunning.',
    product: 'Smart Watch Ultra'
  },
  {
    id: 3,
    name: 'Amelia Torres',
    role: 'Verified Buyer',
    avatar: 'https://i.pravatar.cc/64?img=5',
    rating: 5,
    text: 'Best online tech store I\'ve shopped at. Seamless experience, premium packaging, and the quality is consistently top-notch.',
    product: 'Mechanical Keyboard RGB'
  }
])

// Featured products data
const featuredProducts = ref([
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
    description: 'Premium wireless headphones with active noise cancellation'
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
    description: 'Advanced fitness tracking with stunning AMOLED display'
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
    description: 'Crystal clear sound with all-day battery life'
  },
  {
    id: 4,
    name: 'Portable Speaker X',
    price: 129.99,
    category: 'Audio',
    rating: 4.6,
    reviews: 892,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80',
    description: 'Powerful 360° sound in a compact design'
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
    description: 'Premium mechanical switches with customizable RGB'
  },
  {
    id: 6,
    name: 'Wireless Mouse Pro',
    price: 79.99,
    category: 'Accessories',
    rating: 4.5,
    reviews: 654,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80',
    description: 'Ergonomic design with precision tracking'
  },
  {
    id: 7,
    name: 'USB-C Hub Premium',
    price: 89.99,
    category: 'Accessories',
    rating: 4.7,
    reviews: 432,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
    description: '7-in-1 connectivity solution for your workspace'
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
    description: 'Professional 4K video with AI-powered features'
  }
])

const categories = ref([
  {
    name: 'Audio',
    icon: 'i-lucide-headphones',
    count: 3,
    color: 'from-purple-500 to-pink-500'
  },
  {
    name: 'Wearables',
    icon: 'i-lucide-watch',
    count: 2,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Accessories',
    icon: 'i-lucide-usb',
    count: 4,
    color: 'from-orange-500 to-red-500'
  },
  {
    name: 'Gaming',
    icon: 'i-lucide-gamepad-2',
    count: 3,
    color: 'from-green-500 to-emerald-500'
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
  <div class="space-y-16 pb-16">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 dark:from-purple-900 dark:via-blue-900 dark:to-cyan-900">
      <!-- Animated floating blobs -->
      <div class="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
      <div class="absolute bottom-10 right-10 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl animate-pulse" style="animation-delay:1.5s" />
      <div class="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      
      <div class="relative container mx-auto px-4 py-24 md:py-32">
        <div class="max-w-3xl mx-auto text-center text-white space-y-8">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
            <UIcon name="i-lucide-sparkles" class="w-4 h-4" />
            <span class="text-sm font-medium">New Collection Available</span>
          </div>
          
          <h1 class="text-5xl md:text-7xl font-bold leading-tight">
            Premium Tech
            <span class="block bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
              Elevated Lifestyle
            </span>
          </h1>
          
          <p class="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Discover curated collections of premium tech products designed for those who appreciate quality and innovation.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <UButton
              to="/shop"
              size="xl"
              class="bg-white text-purple-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <template #leading>
                <UIcon name="i-lucide-shopping-bag" class="w-5 h-5" />
              </template>
              Shop Now
              <template #trailing>
                <UIcon name="i-lucide-arrow-right" class="w-5 h-5" />
              </template>
            </UButton>
            
            <UButton
              to="/categrories"
              size="xl"
              variant="outline"
              class="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm"
            >
              Explore Collections
            </UButton>
          </div>
          
          <!-- Stats -->
          <div class="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-bold">500+</div>
              <div class="text-sm text-white/80 mt-1">Products</div>
            </div>
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-bold">50k+</div>
              <div class="text-sm text-white/80 mt-1">Happy Customers</div>
            </div>
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-bold">4.9</div>
              <div class="text-sm text-white/80 mt-1">Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
        <p class="text-gray-600 dark:text-gray-400 text-lg">Find exactly what you're looking for</p>
      </div>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <NuxtLink
          v-for="category in categories"
          :key="category.name"
          :to="`/shop?category=${category.name.toLowerCase()}`"
          class="group relative overflow-hidden rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
        >
          <div :class="`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-25 transition-opacity duration-300`" />
          <div class="relative z-10 text-center space-y-4">
            <div :class="`mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`">
              <UIcon :name="category.icon" class="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 class="font-semibold text-lg">{{ category.name }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ category.count }} items</p>
            </div>
            <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span class="inline-flex items-center gap-1 text-xs font-semibold text-purple-600 dark:text-purple-400">
                Shop now <UIcon name="i-lucide-arrow-right" class="w-3 h-3" />
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="container mx-auto px-4">
      <div class="flex items-center justify-between mb-12">
        <div>
          <h2 class="text-3xl md:text-4xl font-bold mb-2">Featured Products</h2>
          <p class="text-gray-600 dark:text-gray-400 text-lg">Handpicked favorites just for you</p>
        </div>
        <UButton variant="ghost" trailing-icon="i-lucide-arrow-right">
          View All
        </UButton>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <NuxtLink
          v-for="product in featuredProducts"
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
            <div class="flex items-start justify-between gap-2">
              <div class="flex-1 min-w-0">
                <p class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">{{ product.category }}</p>
                <h3 class="font-semibold text-lg truncate mt-1">{{ product.name }}</h3>
              </div>
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
    </section>

    <!-- Promotional Banner -->
    <section class="container mx-auto px-4">
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-12 md:p-16">
        <div class="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
        <div class="relative z-10 max-w-2xl">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white mb-6">
            <UIcon name="i-lucide-zap" class="w-4 h-4" />
            <span class="text-sm font-medium">Limited Time Offer</span>
          </div>
          
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
            Get 25% Off Your First Order
          </h2>
          <p class="text-xl text-white/90 mb-8">
            Join our community and enjoy exclusive discounts on premium tech products.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4">
            <UInput
              placeholder="Enter your email"
              size="xl"
              class="flex-1"
              :ui="{ base: 'bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder-white/60' }"
            />
            <UButton
              size="xl"
              class="bg-white text-purple-600 hover:bg-gray-100 shadow-xl"
            >
              Subscribe Now
            </UButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="bg-gray-50 dark:bg-gray-950 py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 mb-4">
            <UIcon name="i-lucide-star" class="w-4 h-4 fill-yellow-500 text-yellow-500" />
            <span class="text-sm font-semibold">Trusted by 50,000+ customers</span>
          </div>
          <h2 class="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p class="text-gray-600 dark:text-gray-400 text-lg">Real reviews from real people</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="testimonial in testimonials"
            :key="testimonial.id"
            class="group relative bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            <!-- Quote icon -->
            <UIcon name="i-lucide-quote" class="w-8 h-8 text-purple-200 dark:text-purple-800 mb-4" />

            <!-- Stars -->
            <div class="flex items-center gap-1 mb-4">
              <UIcon
                v-for="i in 5"
                :key="i"
                name="i-lucide-star"
                class="w-4 h-4 fill-yellow-400 text-yellow-400"
              />
            </div>

            <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              "{{ testimonial.text }}"
            </p>

            <div class="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
              <img :src="testimonial.avatar" :alt="testimonial.name" class="w-10 h-10 rounded-full object-cover ring-2 ring-purple-200 dark:ring-purple-800" />
              <div>
                <p class="font-semibold text-sm">{{ testimonial.name }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ testimonial.role }} · {{ testimonial.product }}</p>
              </div>
              <div class="ml-auto">
                <UBadge label="✓ Verified" color="green" variant="subtle" size="xs" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="group flex gap-4 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-green-300 dark:hover:border-green-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
          <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
            <UIcon name="i-lucide-truck" class="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 class="font-semibold text-lg mb-1">Free Shipping</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">On orders over $50</p>
          </div>
        </div>
        
        <div class="group flex gap-4 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
          <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
            <UIcon name="i-lucide-shield-check" class="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 class="font-semibold text-lg mb-1">Secure Payment</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">100% secure transactions</p>
          </div>
        </div>
        
        <div class="group flex gap-4 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
          <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
            <UIcon name="i-lucide-headset" class="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 class="font-semibold text-lg mb-1">24/7 Support</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Always here to help</p>
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
