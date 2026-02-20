<script setup>
import { ref, computed, inject, onMounted } from 'vue'

const cart = inject('cart')
const route = useRoute()

// Shared promo state (set by shop/deals pages when user browses with a promo active)
const pendingPromo = useState('pendingPromo', () => '')

// Promo code
const promoCode = ref('')
const appliedPromo = ref(null)
const promoError = ref('')

const validPromoCodes = {
  'SAVE10': { discount: 0.10, type: 'percentage', description: '10% off sitewide' },
  'FLASH20': { discount: 0.20, type: 'percentage', description: '20% off flash deals' },
  'SAVE20': { discount: 0.20, type: 'percentage', description: '20% off' },
  'FREESHIP': { discount: 15, type: 'fixed', description: 'Free shipping' },
  'WELCOME25': { discount: 0.25, type: 'percentage', description: '25% off first order' }
}

onMounted(() => {
  // Priority 1: URL ?promo= param (direct link)
  const queryPromo = (route.query.promo || '').toUpperCase()
  // Priority 2: shared state set while browsing a promo-linked product page
  const statePromo = (pendingPromo.value || '').toUpperCase()
  const code = queryPromo || statePromo
  if (code && validPromoCodes[code]) {
    promoCode.value = code
    appliedPromo.value = code
  }
})

// Shipping options
const selectedShipping = ref('standard')
const shippingOptions = [
  { value: 'standard', label: 'Standard Shipping', price: 0, days: '5-7 business days', icon: 'i-lucide-truck' },
  { value: 'express', label: 'Express Shipping', price: 15, days: '2-3 business days', icon: 'i-lucide-zap' },
  { value: 'overnight', label: 'Overnight Shipping', price: 35, days: 'Next business day', icon: 'i-lucide-plane' }
]

// Calculations
const subtotal = computed(() => cart.total.value)

const shippingCost = computed(() => {
  const option = shippingOptions.find(opt => opt.value === selectedShipping.value)
  return option ? option.price : 0
})

const discount = computed(() => {
  if (!appliedPromo.value) return 0
  
  const promo = validPromoCodes[appliedPromo.value]
  if (promo.type === 'percentage') {
    return subtotal.value * promo.discount
  } else {
    return promo.discount
  }
})

const tax = computed(() => {
  return (subtotal.value - discount.value) * 0.08 // 8% tax
})

const total = computed(() => {
  return subtotal.value + shippingCost.value - discount.value + tax.value
})

const applyPromoCode = () => {
  const code = promoCode.value.toUpperCase()
  if (validPromoCodes[code]) {
    appliedPromo.value = code
    promoError.value = ''
  } else {
    promoError.value = 'Invalid promo code'
    appliedPromo.value = null
  }
}

const removePromoCode = () => {
  appliedPromo.value = null
  promoCode.value = ''
  promoError.value = ''
}

const handleCheckout = () => {
  // Pass order snapshot to checkout page via shared state
  useState('checkoutOrder').value = {
    items: cart.items.value.map(i => ({ ...i })),
    subtotal: subtotal.value,
    discount: discount.value,
    shipping: shippingCost.value,
    shippingLabel: shippingOptions.find(o => o.value === selectedShipping.value)?.label,
    tax: tax.value,
    total: total.value,
    promoCode: appliedPromo.value
  }
  navigateTo('/checkout')
}
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-[#030712] relative overflow-hidden">
    <!-- Sophisticated Abstract Background -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] bg-purple-500/5 blur-[120px] rounded-full animate-pulse" />
      <div class="absolute -bottom-[20%] -left-[10%] w-[70%] h-[70%] bg-blue-500/5 blur-[120px] rounded-full animate-pulse" style="animation-delay: 2s" />
      <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] contrast-150" />
    </div>

    <div class="relative container mx-auto px-4 py-16 md:py-24 max-w-7xl">
      <div v-if="cart.items.value.length > 0">
        <!-- Header Section -->
        <header class="mb-16 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div class="flex items-center gap-3 text-purple-600 dark:text-purple-400 font-bold uppercase tracking-[0.2em] text-[10px]">
            <span class="w-8 h-[1px] bg-purple-600 dark:bg-purple-400" />
            Selection Summary
          </div>
          <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h1 class="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter leading-none">
              Checkout <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Basket</span>
            </h1>
            <p class="text-lg text-gray-500 dark:text-gray-400 font-medium">
              You have <span class="text-gray-900 dark:text-white font-bold">{{ cart.itemCount.value }} curate items</span> ready for shipping.
            </p>
          </div>
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <!-- Items List Column -->
          <div class="lg:col-span-7 xl:col-span-8 space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
            <div class="space-y-6">
              <div 
                v-for="(item, index) in cart.items.value" 
                :key="item.cartKey"
                class="group relative flex flex-col sm:flex-row gap-10 p-8 rounded-[40px] bg-white dark:bg-gray-900/40 border border-gray-100 dark:border-white/5 hover:border-purple-500/30 dark:hover:border-purple-500/30 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)]"
              >
                <!-- Image Wrapper -->
                <div class="relative w-full sm:w-48 aspect-square rounded-[32px] overflow-hidden bg-gray-50 dark:bg-black/40 flex-shrink-0 group-hover:scale-[1.02] transition-transform duration-500">
                  <img 
                    :src="item.image" 
                    :alt="item.name" 
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <!-- Product Content -->
                <div class="flex-1 flex flex-col justify-between py-2">
                  <div class="space-y-4">
                    <div class="flex items-start justify-between">
                      <div class="space-y-1">
                        <span class="text-[10px] font-black uppercase tracking-widest text-purple-600 dark:text-purple-400 opacity-60">{{ item.category }}</span>
                        <h3 class="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">
                          {{ item.name }}
                        </h3>
                        <span v-if="item.selectedColor" class="inline-flex items-center gap-1.5 mt-1 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-semibold">
                          <UIcon name="i-lucide-palette" class="w-3 h-3" />{{ item.selectedColor }}
                        </span>
                      </div>
                      <UButton
                        icon="i-lucide-trash-2"
                        variant="ghost"
                        color="red"
                        class="rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                        @click="cart.removeFromCart(item.cartKey)"
                      />
                    </div>
                    <p class="text-sm text-gray-500 dark:text-gray-400/70 leading-relaxed line-clamp-2 pr-10">
                      {{ item.description || 'Our signature premium craftsmanship meets cutting-edge design in this exclusive piece.' }}
                    </p>
                  </div>

                  <div class="mt-8 flex items-end justify-between">
                    <!-- Modern Quantity UI -->
                    <div class="inline-flex items-center bg-gray-50 dark:bg-black/30 rounded-[20px] p-1.5 border border-gray-100 dark:border-white/5">
                      <UButton
                        icon="i-lucide-minus"
                        size="xs"
                        variant="ghost"
                        class="w-10 h-10 rounded-2xl hover:bg-white dark:hover:bg-white/10"
                        @click="cart.updateQuantity(item.cartKey, item.quantity - 1)"
                        :disabled="item.quantity <= 1"
                      />
                      <span class="w-12 text-center font-black text-gray-900 dark:text-white text-lg">{{ item.quantity }}</span>
                      <UButton
                        icon="i-lucide-plus"
                        size="xs"
                        variant="ghost"
                        class="w-10 h-10 rounded-2xl hover:bg-white dark:hover:bg-white/10"
                        @click="cart.updateQuantity(item.cartKey, item.quantity + 1)"
                      />
                    </div>

                    <!-- Price Info -->
                    <div class="text-right space-y-1">
                      <p class="text-[10px] font-black tracking-widest text-gray-400 uppercase">Total Value</p>
                      <p class="text-3xl font-black text-gray-900 dark:text-white tabular-nums">
                        $ {{ (item.price * item.quantity).toFixed(2) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <UButton
              to="/shop"
              variant="link"
              class="group px-0 text-gray-400 hover:text-purple-600 transition-colors py-4"
            >
              <template #leading>
                <UIcon name="i-lucide-arrow-left" class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </template>
              Back to Collection
            </UButton>
          </div>

          <!-- Summary Column -->
          <div class="lg:col-span-5 xl:col-span-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <div class="sticky top-12 space-y-8">
              <!-- Glass Order Summary Card -->
              <div class="relative rounded-[48px] bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] dark:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] overflow-hidden">
                <div class="p-10 space-y-10">
                  <h3 class="text-2xl font-black text-gray-900 dark:text-white tracking-tight italic">Order Details</h3>
                  
                  <!-- Shipping Radio Selector -->
                  <div class="space-y-4">
                    <p class="text-[10px] font-black uppercase tracking-widest text-gray-400">Delivery Velocity</p>
                    <div class="space-y-3">
                      <div 
                        v-for="option in shippingOptions" 
                        :key="option.value"
                        @click="selectedShipping = option.value"
                        class="relative flex items-center justify-between p-5 rounded-[24px] border-2 cursor-pointer transition-all duration-500 overflow-hidden"
                        :class="selectedShipping === option.value 
                          ? 'border-purple-600 bg-purple-600/5' 
                          : 'border-transparent bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10'"
                      >
                        <div class="flex items-center gap-4 z-10">
                          <div class="w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500"
                            :class="selectedShipping === option.value ? 'bg-purple-600 text-white shadow-lg' : 'bg-white dark:bg-gray-800 text-gray-400 shadow-sm'"
                          >
                            <UIcon :name="option.icon" class="w-5 h-5" />
                          </div>
                          <div>
                            <p class="text-sm font-bold text-gray-900 dark:text-white leading-none mb-1">{{ option.label }}</p>
                            <p class="text-[10px] text-gray-400 font-medium">{{ option.days }}</p>
                          </div>
                        </div>
                        <span class="text-sm font-black text-gray-900 dark:text-white z-10">
                          {{ option.price === 0 ? 'COMPLIMENTARY' : '$'+option.price }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- Promo Input -->
                  <div class="space-y-4">
                    <p class="text-[10px] font-black uppercase tracking-widest text-gray-400">Offer Token</p>
                    <div v-if="!appliedPromo" class="relative group">
                      <UInput
                        v-model="promoCode"
                        placeholder="ENTER CODE"
                        variant="none"
                        class="w-full"
                        :ui="{ 
                          base: 'h-16 px-6 bg-gray-50 dark:bg-white/5 rounded-[24px] font-black text-sm tracking-widest transition-all focus:ring-2 focus:ring-purple-600'
                        }"
                        @keyup.enter="applyPromoCode"
                      />
                      <UButton 
                        icon="i-lucide-arrow-right"
                        class="absolute right-2 top-2 rounded-2xl bg-gray-900 dark:bg-white dark:text-gray-900 p-3 h-12 w-12 hover:scale-105 transition-transform"
                        @click="applyPromoCode"
                      />
                    </div>
                    <div v-else class="flex items-center justify-between p-5 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-[24px] border border-green-500/20">
                      <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-2xl bg-green-500 text-white flex items-center justify-center shadow-lg shadow-green-500/20">
                          <UIcon name="i-lucide-check" class="w-5 h-5" />
                        </div>
                        <div>
                          <p class="text-sm font-black text-green-600 dark:text-green-400">{{ appliedPromo }}</p>
                          <p class="text-[10px] text-green-500/70">{{ validPromoCodes[appliedPromo].description }}</p>
                        </div>
                      </div>
                      <UButton icon="i-lucide-x" variant="ghost" color="red" size="sm" class="rounded-xl" @click="removePromoCode" />
                    </div>
                    <p v-if="promoError" class="text-[10px] text-red-500 font-bold tracking-widest px-2">{{ promoError.toUpperCase() }}</p>
                  </div>

                  <!-- Checkout Final Action -->
                  <div class="pt-10 border-t border-gray-100 dark:border-white/5 space-y-6">
                    <div class="flex items-center justify-between px-2">
                       <span class="text-lg font-bold text-gray-400 italic">Est. Total</span>
                       <span class="text-4xl font-black text-gray-900 dark:text-white leading-none tabular-nums tracking-tighter">$ {{ total.toFixed(2) }}</span>
                    </div>

                    <UButton
                      block
                      size="xl"
                      class="h-20 rounded-[32px] bg-gray-900 dark:bg-white dark:text-gray-900 font-black text-xl hover:scale-[1.03] transition-all duration-500 shadow-2xl dark:shadow-white/5"
                      @click="handleCheckout"
                    >
                      <template #leading>
                        <UIcon name="i-lucide-shield-check" class="w-6 h-6" />
                      </template>
                      FINALIZE ORDER
                      <template #trailing>
                        <UIcon name="i-lucide-chevron-right" class="w-6 h-6" />
                      </template>
                    </UButton>
                  </div>
                </div>
              </div>

              <!-- Extra Footer Badges -->
              <div class="flex items-center justify-center gap-10 opacity-30 group">
                <div class="flex flex-col items-center gap-2 hover:opacity-100 transition-opacity">
                  <UIcon name="i-lucide-lock" class="w-5 h-5" />
                  <span class="text-[8px] font-black uppercase tracking-[0.3em]">SSL SECURE</span>
                </div>
                <div class="flex flex-col items-center gap-2 hover:opacity-100 transition-opacity">
                  <UIcon name="i-lucide-medal" class="w-5 h-5" />
                  <span class="text-[8px] font-black uppercase tracking-[0.3em]">Luxe Grade</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty Cart State -->
      <div v-else class="py-24 text-center max-w-lg mx-auto">
        <div class="w-32 h-32 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 flex items-center justify-center mx-auto mb-8 shadow-xl">
          <UIcon name="i-lucide-shopping-cart" class="w-16 h-16 text-purple-400 dark:text-purple-500" />
        </div>
        <h2 class="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Your Cart is Empty</h2>
        <p class="text-gray-500 dark:text-gray-400 text-lg mb-10 leading-relaxed">
          Looks like you haven't added anything yet. Explore our store and find something you'll love.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <UButton
            to="/shop"
            size="xl"
            class="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-xl text-white"
          >
            <template #leading><UIcon name="i-lucide-shopping-bag" class="w-5 h-5" /></template>
            Browse All Products
          </UButton>
          <UButton to="/deals" size="xl" variant="outline">
            <template #leading><UIcon name="i-lucide-zap" class="w-5 h-5" /></template>
            View Deals
          </UButton>
        </div>
        <!-- Trust Badges -->
        <div class="grid grid-cols-3 gap-4 pt-8 border-t border-gray-100 dark:border-gray-800">
          <div class="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400">
            <div class="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <UIcon name="i-lucide-truck" class="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <span class="text-xs font-semibold">Free Shipping</span>
            <span class="text-[10px]">Orders over $50</span>
          </div>
          <div class="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400">
            <div class="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <UIcon name="i-lucide-shield-check" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span class="text-xs font-semibold">Secure Checkout</span>
            <span class="text-[10px]">SSL encrypted</span>
          </div>
          <div class="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400">
            <div class="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <UIcon name="i-lucide-rotate-ccw" class="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <span class="text-xs font-semibold">Easy Returns</span>
            <span class="text-[10px]">30-day policy</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-in {
  animation-fill-mode: both;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-in-from-bottom-8 {
  from { transform: translateY(2rem); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.fade-in { animation-name: fade-in; }
.slide-in-from-bottom-8 { animation-name: slide-in-from-bottom-8; }

.delay-150 { animation-delay: 150ms; }
.delay-300 { animation-delay: 300ms; }

/* Custom Scrollbar for dark mode */
.dark ::-webkit-scrollbar {
  width: 8px;
}
.dark ::-webkit-scrollbar-track {
  background: transparent;
}
.dark ::-webkit-scrollbar-thumb {
  background: #1e293b;
  border-radius: 10px;
}
</style>
