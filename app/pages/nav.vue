<script setup>
const route = useRoute()

const navigationSections = [
  {
    title: 'Shop',
    description: 'Browse all 12 products across 4 categories',
    badge: '12 products',
    icon: 'i-lucide-shopping-bag',
    color: 'from-purple-500 to-blue-500',
    bgLight: 'bg-purple-50',
    bgDark: 'dark:bg-purple-900/20',
    borderActive: 'border-purple-400',
    links: [
      { label: 'All Products', to: '/shop', icon: 'i-lucide-grid-3x3', description: 'All 12 products — headphones, mice, keyboards, wearables & more', badge: 'Popular' },
      { label: 'New Arrivals', to: '/newarrivals', icon: 'i-lucide-sparkles', description: 'Smart Watch Ultra, Webcam 4K Ultra & freshest drops', badge: 'New' },
      { label: 'Deals & Offers', to: '/deals', icon: 'i-lucide-zap', description: 'AirPods Pro Max (was $649.99) & Wireless Earbuds Pro (was $229.99)', badge: 'Hot' },
      { label: 'Categories', to: '/categrories', icon: 'i-lucide-layers', description: 'Audio · Wearables · Accessories · Gaming' }
    ]
  },
  {
    title: 'Categories',
    description: '4 categories · 12 products total',
    badge: '4 categories',
    icon: 'i-lucide-grid-2x2',
    color: 'from-orange-500 to-red-500',
    bgLight: 'bg-orange-50',
    bgDark: 'dark:bg-orange-900/20',
    borderActive: 'border-orange-400',
    links: [
      {
        label: 'Audio',
        to: '/shop?category=audio',
        icon: 'i-lucide-headphones',
        description: 'AirPods Pro Max · Wireless Earbuds Pro · Portable Speaker X (3 products)'
      },
      {
        label: 'Wearables',
        to: '/shop?category=wearables',
        icon: 'i-lucide-watch',
        description: 'Smart Watch Ultra · Fitness Tracker Band (2 products)'
      },
      {
        label: 'Accessories',
        to: '/shop?category=accessories',
        icon: 'i-lucide-mouse-pointer-2',
        description: 'Wireless Mouse Pro · Mechanical Keyboard RGB · Webcam 4K Ultra · USB-C Hub Premium (4 products)'
      },
      {
        label: 'Gaming',
        to: '/shop?category=gaming',
        icon: 'i-lucide-gamepad-2',
        description: 'Gaming Headset Elite · Gaming Mouse RGB · Gaming Controller Pro (3 products)'
      }
    ]
  },
  {
    title: 'Products',
    description: 'Jump directly to any product type',
    badge: '6 types',
    icon: 'i-lucide-package-search',
    color: 'from-violet-500 to-fuchsia-500',
    bgLight: 'bg-violet-50',
    bgDark: 'dark:bg-violet-900/20',
    borderActive: 'border-violet-400',
    links: [
      { label: 'Mouse', to: '/shop?q=mouse', icon: 'i-lucide-mouse-pointer-2', description: 'Wireless Mouse Pro ($79.99) · Gaming Mouse RGB ($89.99)' },
      { label: 'Keyboard', to: '/shop?q=keyboard', icon: 'i-lucide-keyboard', description: 'Mechanical Keyboard RGB — $159.99 · Popular pick' },
      { label: 'Headphones', to: '/shop?q=airpods', icon: 'i-lucide-headphones', description: 'AirPods Pro Max ($549.99) · Wireless Earbuds Pro ($179.99)', badge: 'Popular' },
      { label: 'Speaker', to: '/shop?q=speaker', icon: 'i-lucide-volume-2', description: 'Portable Speaker X — $129.99 · 360° sound' },
      { label: 'Webcam', to: '/shop?q=webcam', icon: 'i-lucide-video', description: 'Webcam 4K Ultra — $199.99 · AI-powered features', badge: 'New' },
      { label: 'USB-C Hub', to: '/shop?q=usb', icon: 'i-lucide-usb', description: 'USB-C Hub Premium — $89.99 · 7-in-1 connectivity' }
    ]
  },
  {
    title: 'Account',
    description: 'Manage your account and orders',
    badge: 'My profile',
    icon: 'i-lucide-user',
    color: 'from-green-500 to-emerald-500',
    bgLight: 'bg-green-50',
    bgDark: 'dark:bg-green-900/20',
    borderActive: 'border-green-400',
    links: [
      { label: 'Shopping Cart', to: '/shoppingcart', icon: 'i-lucide-shopping-cart', description: 'View and manage your cart items' },
      { label: 'Wishlist', to: '/wishlist', icon: 'i-lucide-heart', description: 'Your saved products' },
      { label: 'Orders', to: '/orders', icon: 'i-lucide-package', description: 'Track your current and past orders' },
      { label: 'Profile', to: '/profile', icon: 'i-lucide-user-circle', description: 'Update account settings & preferences' }
    ]
  },
  {
    title: 'Support',
    description: 'Get help and information',
    badge: '24/7 help',
    icon: 'i-lucide-headset',
    color: 'from-blue-500 to-cyan-500',
    bgLight: 'bg-blue-50',
    bgDark: 'dark:bg-blue-900/20',
    borderActive: 'border-blue-400',
    links: [
      { label: 'Contact Us', to: '/contact', icon: 'i-lucide-mail', description: 'Get in touch with our support team' },
      { label: 'FAQ', to: '/faq', icon: 'i-lucide-help-circle', description: 'Frequently asked questions & answers' },
      { label: 'Shipping Info', to: '/shipping', icon: 'i-lucide-truck', description: 'Delivery times, costs & tracking' },
      { label: 'Returns', to: '/returns', icon: 'i-lucide-rotate-ccw', description: 'Return & refund policy' }
    ]
  }
]

const quickLinks = [
  { label: 'Home', to: '/', icon: 'i-lucide-home' },
  { label: 'All Products', to: '/shop', icon: 'i-lucide-shopping-bag' },
  { label: 'Mouse', to: '/shop?q=mouse', icon: 'i-lucide-mouse-pointer-2' },
  { label: 'Keyboard', to: '/shop?q=keyboard', icon: 'i-lucide-keyboard' },
  { label: 'Headphones', to: '/shop?category=audio', icon: 'i-lucide-headphones' },
  { label: 'Gaming', to: '/shop?category=gaming', icon: 'i-lucide-gamepad-2' },
  { label: 'Wearables', to: '/shop?category=wearables', icon: 'i-lucide-watch' },
  { label: 'Cart', to: '/shoppingcart', icon: 'i-lucide-shopping-cart' }
]

// Modal state
const selectedSection = ref(null)
const isModalOpen = ref(false)

function openSection(section) {
  selectedSection.value = section
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  isModalOpen.value = false
  document.body.style.overflow = ''
  setTimeout(() => { selectedSection.value = null }, 300)
}

function handleBackdropClick(e) {
  if (e.target === e.currentTarget) closeModal()
}

onUnmounted(() => {
  document.body.style.overflow = ''
})

useEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isModalOpen.value) closeModal()
})

const badgeColors = {
  Popular: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  New: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  Hot: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
}
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 dark:from-purple-900 dark:via-blue-900 dark:to-cyan-900">
      <div class="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
      <div class="absolute bottom-10 right-10 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl animate-pulse" style="animation-delay:1.5s" />
      <div class="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      
      <div class="relative container mx-auto px-4 py-24 md:py-32">
        <div class="max-w-3xl mx-auto text-center text-white space-y-6">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
            <UIcon name="i-lucide-compass" class="w-4 h-4" />
            <span class="text-sm font-medium">Site Navigation</span>
          </div>
          
          <h1 class="text-5xl md:text-6xl font-bold leading-tight">
            Explore
            <span class="block bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
              Store ∈ SAN
            </span>
          </h1>
          
          <p class="text-xl text-white/90 max-w-2xl mx-auto">
            Find everything you need with our easy-to-navigate site structure
          </p>
        </div>
      </div>
    </section>

    <!-- Quick Links -->
    <section class="container mx-auto px-4 -mt-8 relative z-10">
      <div class="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 p-8">
        <h2 class="text-xl font-bold mb-6 flex items-center gap-2">
          <UIcon name="i-lucide-zap" class="w-5 h-5 text-purple-600 dark:text-purple-400" />
          Quick Links
        </h2>
        <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
          <NuxtLink
            v-for="link in quickLinks"
            :key="link.to"
            :to="link.to"
            class="group flex flex-col items-center gap-3 p-4 rounded-xl border transition-all duration-300"
            :class="route.path === link.to
              ? 'border-purple-400 bg-purple-50 dark:bg-purple-900/30 dark:border-purple-600'
              : 'border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20'"
          >
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <UIcon :name="link.icon" class="w-6 h-6 text-white" />
            </div>
            <span class="text-sm font-medium text-center">{{ link.label }}</span>
            <div v-if="route.path === link.to" class="w-1.5 h-1.5 rounded-full bg-purple-500" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Navigation Sections (Click to open detail modal) -->
    <section class="container mx-auto px-4 py-16">
      <div class="text-center mb-10">
        <p class="text-gray-500 dark:text-gray-400 text-sm flex items-center justify-center gap-2">
          <UIcon name="i-lucide-mouse-pointer-click" class="w-4 h-4" />
          Click any section to explore its links
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <button
          v-for="section in navigationSections"
          :key="section.title"
          type="button"
          class="group text-left bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 hover:border-transparent transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer relative overflow-hidden"
          @click="openSection(section)"
        >
          <!-- Gradient hover overlay -->
          <div :class="`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl`" />

          <!-- Section Header -->
          <div class="flex items-start gap-4 mb-6">
            <div :class="`w-16 h-16 rounded-2xl bg-gradient-to-br ${section.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`">
              <UIcon :name="section.icon" class="w-8 h-8 text-white" />
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <h2 class="text-2xl font-bold">{{ section.title }}</h2>
                <span class="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-medium">{{ section.badge }}</span>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ section.description }}</p>
            </div>
            <div class="flex-shrink-0 w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
              <UIcon name="i-lucide-chevron-right" class="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>

          <!-- Preview of links -->
          <div class="grid grid-cols-2 gap-2">
            <div
              v-for="link in section.links"
              :key="link.to"
              class="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60"
            >
              <UIcon :name="link.icon" class="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
              <span class="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">{{ link.label }}</span>
            </div>
          </div>

          <!-- Click hint -->
          <div class="mt-5 flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors">
            <UIcon name="i-lucide-mouse-pointer-click" class="w-3.5 h-3.5" />
            <span>Click to explore</span>
          </div>
        </button>
      </div>
    </section>

    <!-- Section Detail Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="isModalOpen"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
          @click="handleBackdropClick"
        >
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <!-- Modal Panel -->
          <Transition name="modal-panel">
            <div
              v-if="selectedSection"
              class="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden"
            >
              <!-- Modal Header with gradient -->
              <div :class="`bg-gradient-to-br ${selectedSection.color} p-8 text-white`">
                <div class="flex items-start justify-between gap-4">
                  <div class="flex items-center gap-4">
                    <div class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                      <UIcon :name="selectedSection.icon" class="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div class="flex items-center gap-2 mb-1">
                        <h2 class="text-2xl font-bold">{{ selectedSection.title }}</h2>
                        <span class="text-xs px-2 py-0.5 rounded-full bg-white/25 text-white/90 font-medium">{{ selectedSection.badge }}</span>
                      </div>
                      <p class="text-white/80 text-sm">{{ selectedSection.description }}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    class="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors flex-shrink-0"
                    @click="closeModal"
                  >
                    <UIcon name="i-lucide-x" class="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              <!-- Modal Links -->
              <div class="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
                <p class="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
                  {{ selectedSection.links.length }} links available
                </p>
                <NuxtLink
                  v-for="link in selectedSection.links"
                  :key="link.to"
                  :to="link.to"
                  class="group flex items-center gap-4 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-transparent hover:shadow-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                  @click="closeModal"
                >
                  <div :class="`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedSection.color} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform flex-shrink-0`">
                    <UIcon :name="link.icon" class="w-6 h-6 text-white" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-0.5">
                      <h3 class="font-semibold text-gray-900 dark:text-white">{{ link.label }}</h3>
                      <span
                        v-if="link.badge"
                        :class="['text-xs px-2 py-0.5 rounded-full font-semibold', badgeColors[link.badge] || 'bg-gray-100 text-gray-600']"
                      >{{ link.badge }}</span>
                    </div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ link.description }}</p>
                    <p class="text-xs text-gray-300 dark:text-gray-600 mt-0.5 font-mono truncate">{{ link.to }}</p>
                  </div>
                  <UIcon name="i-lucide-arrow-right" class="w-4 h-4 text-gray-300 group-hover:text-gray-600 dark:group-hover:text-gray-300 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </NuxtLink>
              </div>

              <!-- Modal Footer -->
              <div class="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <span class="text-xs text-gray-400 dark:text-gray-500">Press <kbd class="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-mono text-xs">Esc</kbd> to close</span>
                <button
                  type="button"
                  class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                  @click="closeModal"
                >
                  Close
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>

    <!-- Popular Pages -->
    <section class="bg-gray-50 dark:bg-gray-950 py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Popular Pages</h2>
          <p class="text-gray-600 dark:text-gray-400 text-lg">Most visited sections of our store</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <NuxtLink
            to="/shop"
            class="group relative overflow-hidden rounded-2xl aspect-square bg-gradient-to-br from-purple-500 to-blue-500 p-8 hover:scale-105 transition-transform duration-300"
          >
            <div class="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
            <div class="relative h-full flex flex-col justify-between text-white">
              <UIcon name="i-lucide-shopping-bag" class="w-12 h-12" />
              <div>
                <h3 class="text-2xl font-bold mb-2">Shop All</h3>
                <p class="text-white/80 text-sm">Browse complete catalog</p>
              </div>
            </div>
          </NuxtLink>

          <NuxtLink
            to="/newarrivals"
            class="group relative overflow-hidden rounded-2xl aspect-square bg-gradient-to-br from-emerald-500 to-teal-500 p-8 hover:scale-105 transition-transform duration-300"
          >
            <div class="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
            <div class="relative h-full flex flex-col justify-between text-white">
              <UIcon name="i-lucide-sparkles" class="w-12 h-12" />
              <div>
                <h3 class="text-2xl font-bold mb-2">New Arrivals</h3>
                <p class="text-white/80 text-sm">Latest products</p>
              </div>
            </div>
          </NuxtLink>

          <NuxtLink
            to="/deals"
            class="group relative overflow-hidden rounded-2xl aspect-square bg-gradient-to-br from-orange-500 to-red-500 p-8 hover:scale-105 transition-transform duration-300"
          >
            <div class="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
            <div class="relative h-full flex flex-col justify-between text-white">
              <UIcon name="i-lucide-zap" class="w-12 h-12" />
              <div>
                <h3 class="text-2xl font-bold mb-2">Deals</h3>
                <p class="text-white/80 text-sm">Special offers</p>
              </div>
            </div>
          </NuxtLink>

          <NuxtLink
            to="/categrories"
            class="group relative overflow-hidden rounded-2xl aspect-square bg-gradient-to-br from-pink-500 to-purple-500 p-8 hover:scale-105 transition-transform duration-300"
          >
            <div class="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
            <div class="relative h-full flex flex-col justify-between text-white">
              <UIcon name="i-lucide-grid-2x2" class="w-12 h-12" />
              <div>
                <h3 class="text-2xl font-bold mb-2">Categories</h3>
                <p class="text-white/80 text-sm">Browse by type</p>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Help Section -->
    <section class="container mx-auto px-4 py-16">
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-12 md:p-16">
        <div class="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
        <div class="relative z-10 max-w-3xl mx-auto text-center text-white space-y-6">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
            <UIcon name="i-lucide-help-circle" class="w-4 h-4" />
            <span class="text-sm font-medium">Need Help?</span>
          </div>
          
          <h2 class="text-4xl md:text-5xl font-bold">
            Can't Find What You're Looking For?
          </h2>
          <p class="text-xl text-white/90">
            Our support team is here to help you navigate and find exactly what you need
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <UButton
              to="/contact"
              size="xl"
              class="bg-white text-purple-600 hover:bg-gray-100 shadow-xl"
            >
              <template #leading>
                <UIcon name="i-lucide-mail" class="w-5 h-5" />
              </template>
              Contact Support
            </UButton>
            
            <UButton
              to="/faq"
              size="xl"
              variant="outline"
              class="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm"
            >
              <template #leading>
                <UIcon name="i-lucide-help-circle" class="w-5 h-5" />
              </template>
              View FAQ
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

/* Backdrop transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Panel slide-up + scale transition */
.modal-panel-enter-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.modal-panel-leave-active {
  transition: all 0.2s ease-in;
}
.modal-panel-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}
.modal-panel-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}
</style>
