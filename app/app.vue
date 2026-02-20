<script setup>
import { ref, computed } from 'vue'

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = 'Store ∈ SAN - Premium Tech & Lifestyle'
const description = 'Discover the finest collection of premium tech products and lifestyle accessories. Curated for those who appreciate quality and design.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image'
})

// Cart state management
const cart = ref([])
const isCartOpen = ref(false)
const isSearchOpen = ref(false)
const isMobileMenuOpen = ref(false)
const localSearch = ref('')
const searchQuery = ref('')

const submitSearch = (term) => {
  const query = (term ?? localSearch.value).trim()
  if (!query) return
  isSearchOpen.value = false
  localSearch.value = ''
  navigateTo(`/shop?q=${encodeURIComponent(query)}`)
}

const cartItemCount = computed(() => {
  return cart.value.reduce((total, item) => total + item.quantity, 0)
})

const cartTotal = computed(() => {
  return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0)
})

const addToCart = (product) => {
  const qty = product.quantity || 1
  const cartKey = `${product.id}__${product.selectedColor || ''}`
  const existingItem = cart.value.find(item => item.cartKey === cartKey)
  if (existingItem) {
    existingItem.quantity += qty
  } else {
    cart.value.push({ ...product, quantity: qty, cartKey })
  }
}

const removeFromCart = (cartKey) => {
  const index = cart.value.findIndex(item => item.cartKey === cartKey)
  if (index > -1) {
    cart.value.splice(index, 1)
  }
}

const updateQuantity = (cartKey, quantity) => {
  const item = cart.value.find(item => item.cartKey === cartKey)
  if (item) {
    item.quantity = Math.max(0, quantity)
    if (item.quantity === 0) {
      removeFromCart(cartKey)
    }
  }
}

// Provide cart functions to child components
provide('cart', {
  items: cart,
  addToCart,
  removeFromCart,
  updateQuantity,
  itemCount: cartItemCount,
  total: cartTotal
})

// Wishlist state
const wishlist = ref([])
const isWishlistOpen = ref(false)
const wishlistCount = computed(() => wishlist.value.length)

const toggleWishlist = (product) => {
  const index = wishlist.value.findIndex(item => item.id === product.id)
  if (index > -1) {
    wishlist.value.splice(index, 1)
  } else {
    wishlist.value.push({ ...product })
  }
}

const removeFromWishlist = (productId) => {
  const index = wishlist.value.findIndex(item => item.id === productId)
  if (index > -1) wishlist.value.splice(index, 1)
}

const isWishlisted = (productId) => wishlist.value.some(item => item.id === productId)

provide('wishlist', {
  items: wishlist,
  toggle: toggleWishlist,
  remove: removeFromWishlist,
  isWishlisted,
  count: wishlistCount
})

const navLinks = [
  { label: 'Home', to: '/', icon: 'i-lucide-home' },
  { label: 'Shop', to: '/shop', icon: 'i-lucide-shopping-bag' },
  { label: 'New Arrivals', to: '/newarrivals', icon: 'i-lucide-sparkles' },
  { label: 'Categories', to: '/categrories', icon: 'i-lucide-grid-2x2' },
  { label: 'Deals', to: '/deals', icon: 'i-lucide-zap' },
  { label: 'Cart', to: '/shoppingcart', icon: 'i-lucide-shopping-cart' },
]
</script>

<template>
  <UApp>
    <!-- Custom Header -->
    <header class="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl">
      <div class="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <!-- Left: Logo + Nav -->
        <div class="flex items-center gap-0">
          <NuxtLink to="/" class="flex items-center gap-2 group flex-shrink-0">
            <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg group-hover:shadow-xl transition-shadow duration-300 p-1.5">
              <svg viewBox="-4 -4 48 108" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full">
                <polyline points="0,20 20,0 40,20"/>
                <line x1="0" y1="20" x2="0" y2="40"/><line x1="20" y1="20" x2="20" y2="40"/><line x1="40" y1="20" x2="40" y2="40"/>
                <line x1="0" y1="40" x2="20" y2="60"/><line x1="20" y1="40" x2="40" y2="60"/>
                <line x1="0" y1="60" x2="10" y2="50"/><line x1="40" y1="40" x2="30" y2="50"/>
                <line x1="0" y1="60" x2="0" y2="80"/><line x1="20" y1="60" x2="20" y2="80"/><line x1="40" y1="60" x2="40" y2="80"/>
                <polyline points="0,80 20,100 40,80"/>
              </svg>
            </div>
            <span class="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent hidden sm:block">
              Store ∈ SAN
            </span>
          </NuxtLink>

          <!-- Desktop Nav Links -->
          <nav class="hidden lg:flex items-center gap-1 ml-8">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              class="px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-purple-400"
              :class="$route.path === link.to ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20' : 'text-gray-600 dark:text-gray-300'"
            >
              {{ link.label }}
            </NuxtLink>
          </nav>
        </div>

        <!-- Right: Actions -->
        <div class="flex items-center gap-1">
          <!-- Search -->
          <button
            class="flex items-center justify-center w-9 h-9 rounded-lg transition-colors"
            :class="isSearchOpen ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20' : 'hover:bg-gray-100 dark:hover:bg-gray-800'"
            aria-label="Search"
            @click="isSearchOpen = !isSearchOpen"
          >
            <UIcon :name="isSearchOpen ? 'i-lucide-x' : 'i-lucide-search'" class="w-5 h-5" />
          </button>

          <!-- Wishlist -->
          <button
            class="relative hidden lg:flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
            aria-label="Wishlist"
            @click="isWishlistOpen = true"
          >
            <UIcon
              name="i-lucide-heart"
              class="w-5 h-5 transition-colors"
              :class="wishlistCount > 0 ? 'text-red-500 fill-red-500' : 'group-hover:text-red-500'"
            />
            <span
              v-if="wishlistCount > 0"
              class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center pointer-events-none shadow"
            >
              {{ wishlistCount }}
            </span>
          </button>

          <!-- Shopping Cart -->
          <button
            class="relative flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Shopping Cart"
            @click="isCartOpen = !isCartOpen"
          >
            <UIcon name="i-lucide-shopping-bag" class="w-5 h-5" />
            <span
              v-if="cartItemCount > 0"
              class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center pointer-events-none shadow"
            >
              {{ cartItemCount }}
            </span>
          </button>

          <!-- Color Mode -->
          <UColorModeButton />

          <!-- Mobile Hamburger (< lg only) -->
          <button
            class="flex lg:hidden items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Menu"
            @click="isMobileMenuOpen = true"
          >
            <UIcon name="i-lucide-menu" class="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>

    <!-- Search Bar Overlay -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isSearchOpen"
        class="sticky top-16 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg"
      >
        <div class="container mx-auto px-4 py-4 max-w-3xl">
          <div class="relative">
            <UIcon name="i-lucide-search" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <input
              v-model="localSearch"
              autofocus
              placeholder="Search for products, categories…"
              class="w-full h-14 pl-12 pr-12 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-base outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              @keyup.escape="isSearchOpen = false"
              @keyup.enter="submitSearch()"
            />
            <button
              v-if="localSearch"
              class="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              @click="localSearch = ''"
            >
              <UIcon name="i-lucide-x" class="w-4 h-4 text-gray-400" />
            </button>
          </div>
          <div class="flex items-center gap-2 mt-3 flex-wrap">
            <span class="text-xs text-gray-500 dark:text-gray-400 font-medium">Popular:</span>
            <button
              v-for="tag in ['AirPods', 'Keyboards', 'Smart Watch', 'Speakers', 'Gaming Gear']"
              :key="tag"
              @click="submitSearch(tag)"
              class="text-xs px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
            >
              {{ tag }}
            </button>
            <button
              @click="submitSearch()"
              class="ml-auto flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold transition-colors shadow-sm"
            >
              <UIcon name="i-lucide-search" class="w-3.5 h-3.5" />
              Search
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Shopping Cart Slideover -->
    <USlideover v-model:open="isCartOpen" side="right">
      <template #content>
      <UCard 
        class="flex flex-col flex-1 h-full rounded-none" 
        :ui="{ 
          body: { base: 'flex-1 overflow-y-auto p-0' }, 
          header: { base: 'p-6 border-b border-gray-200 dark:border-gray-800' },
          footer: { base: 'p-6 border-t border-gray-200 dark:border-gray-800' },
          ring: '', 
          divide: '' 
        }"
      >
        <template #header v-if="cart.length > 0">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-xl font-bold">Shopping Cart</h3>
              <p v-if="cartItemCount > 0" class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {{ cartItemCount }} {{ cartItemCount === 1 ? 'item' : 'items' }}
              </p>
            </div>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-lucide-x"
              size="lg"
              @click="isCartOpen = false"
              aria-label="Close cart"
            />
          </div>
        </template>



        <!-- Cart Items -->
        <div v-if="cart.length > 0" class="p-6 space-y-4">
          <div
            v-for="item in cart"
            :key="item.cartKey"
            class="group relative flex gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-900"
          >
            <!-- Product Image -->
            <div class="relative w-24 h-24 rounded-lg bg-gray-100 dark:bg-gray-800 flex-shrink-0 overflow-hidden">
              <img 
                v-if="item.image" 
                :src="item.image" 
                :alt="item.name" 
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
              />
              <div v-else class="w-full h-full flex items-center justify-center">
                <UIcon name="i-lucide-image" class="w-8 h-8 text-gray-400" />
              </div>
            </div>

            <!-- Product Details -->
            <div class="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <h4 class="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {{ item.name }}
                </h4>
                <p v-if="item.category" class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                  {{ item.category }}
                </p>
                <span v-if="item.selectedColor" class="inline-flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400 font-medium">
                  <UIcon name="i-lucide-palette" class="w-3 h-3" />{{ item.selectedColor }}
                </span>
              </div>

              <!-- Quantity Controls -->
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                  <UButton
                    icon="i-lucide-minus"
                    size="xs"
                    color="gray"
                    variant="ghost"
                    @click="updateQuantity(item.cartKey, item.quantity - 1)"
                    :disabled="item.quantity <= 1"
                  />
                  <span class="text-sm font-medium w-8 text-center">{{ item.quantity }}</span>
                  <UButton
                    icon="i-lucide-plus"
                    size="xs"
                    color="gray"
                    variant="ghost"
                    @click="updateQuantity(item.cartKey, item.quantity + 1)"
                  />
                </div>

                <!-- Price -->
                <div class="text-right">
                  <div class="font-bold text-base">${{ (item.price * item.quantity).toFixed(2) }}</div>
                  <div v-if="item.quantity > 1" class="text-xs text-gray-500 dark:text-gray-400">
                    ${{ item.price.toFixed(2) }} each
                  </div>
                </div>
              </div>
            </div>

            <!-- Remove Button -->
            <UButton
              icon="i-lucide-trash-2"
              size="xs"
              color="red"
              variant="ghost"
              @click="removeFromCart(item.cartKey)"
              class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Remove item"
            />
          </div>

          <!-- Recommended Actions -->
          <div class="pt-4 border-t border-gray-200 dark:border-gray-800">
            <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
              <UIcon name="i-lucide-truck" class="w-4 h-4" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <UIcon name="i-lucide-shield-check" class="w-4 h-4" />
              <span>Secure checkout guaranteed</span>
            </div>
          </div>
        </div>

        <template #footer v-if="cart.length > 0">
          <div class="space-y-4">
            <!-- Total -->
            <div class="flex items-center justify-between mb-4">
              <span class="text-lg font-semibold">Total</span>
              <span class="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                ${{ cartTotal.toFixed(2) }}
              </span>
            </div>

            <!-- Action Buttons -->
            <div class="space-y-2">
              <UButton
                to="/checkout"
                block
                size="xl"
                :disabled="cart.length === 0"
                class="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
                @click="isCartOpen = false"
              >
                <template #leading>
                  <UIcon name="i-lucide-lock" class="w-5 h-5" />
                </template>
                Checkout
                <template #trailing>
                  <UIcon name="i-lucide-arrow-right" class="w-5 h-5" />
                </template>
              </UButton>
              
              <UButton
                to="/shoppingcart"
                block
                size="lg"
                variant="outline"
                :disabled="cart.length === 0"
                @click="isCartOpen = false"
              >
                <template #leading>
                  <UIcon name="i-lucide-shopping-cart" class="w-4 h-4" />
                </template>
                View Full Cart
              </UButton>
            </div>

            <!-- Continue Shopping Link -->
            <div class="text-center pt-2">
              <UButton
                to="/shop"
                variant="link"
                size="sm"
                @click="isCartOpen = false"
                class="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
              >
                <template #leading>
                  <UIcon name="i-lucide-arrow-left" class="w-4 h-4" />
                </template>
                Continue Shopping
              </UButton>
            </div>
          </div>
        </template>
      </UCard>
      </template>
    </USlideover>

    <!-- Wishlist Slideover -->
    <USlideover v-model:open="isWishlistOpen" side="right">
      <template #content>
        <div class="flex flex-col h-full bg-white dark:bg-gray-900">
          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800">
            <div>
              <h3 class="text-xl font-bold">Wishlist</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{{ wishlistCount }} saved item{{ wishlistCount !== 1 ? 's' : '' }}</p>
            </div>
            <button
              class="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              @click="isWishlistOpen = false"
            >
              <UIcon name="i-lucide-x" class="w-5 h-5" />
            </button>
          </div>

          <!-- Items -->
          <div v-if="wishlist.length > 0" class="flex-1 overflow-y-auto p-4 space-y-3">
            <div
              v-for="item in wishlist"
              :key="item.id"
              class="group flex gap-4 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-red-200 dark:hover:border-red-900 bg-white dark:bg-gray-900 transition-all duration-300"
            >
              <div class="relative w-20 h-20 rounded-xl bg-gray-100 dark:bg-gray-800 flex-shrink-0 overflow-hidden">
                <img v-if="item.image" :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">{{ item.category }}</p>
                <h4 class="font-semibold text-sm mt-0.5 line-clamp-2">{{ item.name }}</h4>
                <p class="text-base font-bold mt-1">${{ item.price.toFixed(2) }}</p>
                <div class="flex items-center gap-2 mt-2">
                  <UButton
                    size="xs"
                    class="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                    @click="addToCart(item); removeFromWishlist(item.id)"
                  >
                    <template #leading><UIcon name="i-lucide-shopping-cart" class="w-3 h-3" /></template>
                    Move to Cart
                  </UButton>
                  <button
                    class="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 transition-colors"
                    @click="removeFromWishlist(item.id)"
                  >
                    <UIcon name="i-lucide-trash-2" class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div class="w-20 h-20 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-4">
              <UIcon name="i-lucide-heart" class="w-10 h-10 text-red-300 dark:text-red-700" />
            </div>
            <h4 class="font-semibold text-lg mb-2">Your wishlist is empty</h4>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">Tap the heart on any product to save it here</p>
            <UButton to="/shop" size="sm" variant="outline" @click="isWishlistOpen = false">Browse Products</UButton>
          </div>
        </div>
      </template>
    </USlideover>

    <!-- Mobile Menu Slideover -->
    <USlideover v-model:open="isMobileMenuOpen" side="right">
      <template #content>
        <div class="flex flex-col h-full bg-white dark:bg-gray-900">
          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800">
            <NuxtLink to="/" class="flex items-center gap-2" @click="isMobileMenuOpen = false">
              <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-md p-1.5">
                <svg viewBox="-4 -4 48 108" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full">
                  <polyline points="0,20 20,0 40,20"/>
                  <line x1="0" y1="20" x2="0" y2="40"/><line x1="20" y1="20" x2="20" y2="40"/><line x1="40" y1="20" x2="40" y2="40"/>
                  <line x1="0" y1="40" x2="20" y2="60"/><line x1="20" y1="40" x2="40" y2="60"/>
                  <line x1="0" y1="60" x2="10" y2="50"/><line x1="40" y1="40" x2="30" y2="50"/>
                  <line x1="0" y1="60" x2="0" y2="80"/><line x1="20" y1="60" x2="20" y2="80"/><line x1="40" y1="60" x2="40" y2="80"/>
                  <polyline points="0,80 20,100 40,80"/>
                </svg>
              </div>
              <span class="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Store ∈ SAN</span>
            </NuxtLink>
            <button
              class="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              @click="isMobileMenuOpen = false"
            >
              <UIcon name="i-lucide-x" class="w-5 h-5" />
            </button>
          </div>

          <!-- Nav Links -->
          <nav class="flex-1 overflow-y-auto p-4 space-y-1">
            <p class="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 px-4 pb-2 pt-2">Navigation</p>
            <NuxtLink
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              @click="isMobileMenuOpen = false"
              class="flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 group"
              :class="$route.path === link.to
                ? 'bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800'
                : 'hover:bg-gray-50 dark:hover:bg-gray-800'"
            >
              <div
                class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-200"
                :class="$route.path === link.to
                  ? 'bg-gradient-to-br from-purple-600 to-blue-600 shadow-md'
                  : 'bg-gradient-to-br from-purple-500 to-blue-500 group-hover:shadow-md group-hover:scale-105'"
              >
                <UIcon :name="link.icon" class="w-5 h-5 text-white" />
              </div>
              <span
                class="font-medium transition-colors"
                :class="$route.path === link.to ? 'text-purple-600 dark:text-purple-400' : 'group-hover:text-purple-600 dark:group-hover:text-purple-400'"
              >
                {{ link.label }}
              </span>
              <UIcon
                name="i-lucide-chevron-right"
                class="w-4 h-4 ml-auto transition-all"
                :class="$route.path === link.to ? 'text-purple-400' : 'text-gray-300 dark:text-gray-600 group-hover:text-purple-400 group-hover:translate-x-0.5'"
              />
            </NuxtLink>
          </nav>

          <!-- Footer -->
          <div class="p-5 border-t border-gray-100 dark:border-gray-800 space-y-3">
            <button
              class="w-full flex items-center justify-between px-5 py-4 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-all group"
              @click="isCartOpen = true; isMobileMenuOpen = false"
            >
              <div class="flex items-center gap-3">
                <UIcon name="i-lucide-shopping-bag" class="w-5 h-5 text-gray-500 group-hover:text-purple-600 transition-colors" />
                <span class="font-medium text-sm group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Shopping Cart</span>
              </div>
              <span v-if="cartItemCount > 0" class="px-2.5 py-1 rounded-full bg-purple-600 text-white text-xs font-bold shadow">
                {{ cartItemCount }}
              </span>
              <span v-else class="text-xs text-gray-400">Empty</span>
            </button>

            <div class="flex items-center justify-between px-2">
              <span class="text-sm text-gray-500 dark:text-gray-400">Toggle theme</span>
              <UColorModeButton />
            </div>
          </div>
        </div>
      </template>    </USlideover>

    <!-- Main Content -->
    <UMain>
      <NuxtPage />
    </UMain>

    <!-- Footer -->
    <UFooter class="border-t border-gray-200 dark:border-gray-800">
      <template #top>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
          <!-- Brand Column -->
          <div class="space-y-4">
            <div class="flex items-center gap-2">
              <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 p-1.5">
                <svg viewBox="-4 -4 48 108" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full">
                  <polyline points="0,20 20,0 40,20"/>
                  <line x1="0" y1="20" x2="0" y2="40"/><line x1="20" y1="20" x2="20" y2="40"/><line x1="40" y1="20" x2="40" y2="40"/>
                  <line x1="0" y1="40" x2="20" y2="60"/><line x1="20" y1="40" x2="40" y2="60"/>
                  <line x1="0" y1="60" x2="10" y2="50"/><line x1="40" y1="40" x2="30" y2="50"/>
                  <line x1="0" y1="60" x2="0" y2="80"/><line x1="20" y1="60" x2="20" y2="80"/><line x1="40" y1="60" x2="40" y2="80"/>
                  <polyline points="0,80 20,100 40,80"/>
                </svg>
              </div>
              <span class="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Store ∈ SAN
              </span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Premium tech and lifestyle products for those who appreciate quality and design.
            </p>
          </div>

          <!-- Shop Column -->
          <div>
            <h4 class="font-semibold mb-4">Shop</h4>
            <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><NuxtLink to="/newarrivals" class="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">New Arrivals</NuxtLink></li>
              <li><NuxtLink to="/categrories" class="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">Categories</NuxtLink></li>
              <li><NuxtLink to="/deals" class="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">Deals</NuxtLink></li>
              <li><NuxtLink to="/shop?sort=rating" class="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">Best Sellers</NuxtLink></li>
            </ul>
          </div>

          <!-- Support Column -->
          <div>
            <h4 class="font-semibold mb-4">Support</h4>
            <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><NuxtLink to="/contact" class="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">Contact Us</NuxtLink></li>
              <li><NuxtLink to="/shipping" class="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">Shipping Info</NuxtLink></li>
              <li><NuxtLink to="/returns" class="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">Returns</NuxtLink></li>
              <li><NuxtLink to="/faq" class="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">FAQ</NuxtLink></li>
            </ul>
          </div>

          <!-- Newsletter Column -->
          <div>
            <h4 class="font-semibold mb-4">Stay Updated</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Subscribe to get special offers and updates.
            </p>
            <div class="flex gap-2">
              <UInput placeholder="Enter your email" class="flex-1" />
              <UButton icon="i-lucide-arrow-right" color="primary" />
            </div>
          </div>
        </div>
      </template>

      <template #left>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          © {{ new Date().getFullYear() }} Store ∈ SAN. All rights reserved.
        </p>
      </template>

      <template #right>
        <div class="flex items-center gap-4">
          <UButton
            to="https://twitter.com"
            target="_blank"
            icon="i-simple-icons-twitter"
            aria-label="Twitter"
            color="neutral"
            variant="ghost"
            size="sm"
          />
          <UButton
            to="https://instagram.com"
            target="_blank"
            icon="i-simple-icons-instagram"
            aria-label="Instagram"
            color="neutral"
            variant="ghost"
            size="sm"
          />
          <UButton
            to="https://facebook.com"
            target="_blank"
            icon="i-simple-icons-facebook"
            aria-label="Facebook"
            color="neutral"
            variant="ghost"
            size="sm"
          />
        </div>
      </template>
    </UFooter>
  </UApp>
</template>

<style>
* {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
</style>
