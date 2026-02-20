<script setup>
import { ref, computed } from 'vue'

const order = useState('checkoutOrder')
const cart = inject('cart')
const router = useRouter()

// If arrived without order data (e.g. direct URL), fall back to live cart
const items = computed(() => order.value?.items || cart.items.value || [])
const subtotal = computed(() => order.value?.subtotal ?? cart.total.value)
const discount = computed(() => order.value?.discount ?? 0)
const shippingCost = computed(() => order.value?.shipping ?? 0)
const shippingLabel = computed(() => order.value?.shippingLabel ?? 'Standard Shipping')
const tax = computed(() => order.value?.tax ?? subtotal.value * 0.08)
const total = computed(() => order.value?.total ?? (subtotal.value + shippingCost.value - discount.value + tax.value))
const promoCode = computed(() => order.value?.promoCode ?? null)

// Steps
const step = ref(1) // 1=contact, 2=payment, 3=confirmed

// Contact form
const contact = ref({ firstName: '', lastName: '', email: '', phone: '' })
const address = ref({ line1: '', line2: '', city: '', state: '', zip: '', country: 'US' })

// Payment
const paymentMethod = ref('card')
const card = ref({ number: '', name: '', expiry: '', cvv: '' })

const formatCard = (e) => {
  let v = e.target.value.replace(/\D/g, '').substring(0, 16)
  card.value.number = v.replace(/(.{4})/g, '$1 ').trim()
}
const formatExpiry = (e) => {
  let v = e.target.value.replace(/\D/g, '').substring(0, 4)
  if (v.length >= 2) v = v.substring(0, 2) + '/' + v.substring(2)
  card.value.expiry = v
}

// Validation
const step1Valid = computed(() =>
  contact.value.firstName && contact.value.lastName &&
  contact.value.email.includes('@') &&
  address.value.line1 && address.value.city && address.value.zip
)

const step2Valid = computed(() => {
  if (paymentMethod.value === 'card') {
    return card.value.number.replace(/\s/g, '').length === 16 &&
      card.value.name && card.value.expiry.length === 5 && card.value.cvv.length >= 3
  }
  return true // paypal / apple pay mock
})

const orderId = ref('')
const isPlacing = ref(false)

const placeOrder = async () => {
  if (!step2Valid.value) return
  isPlacing.value = true
  await new Promise(r => setTimeout(r, 1800))
  orderId.value = 'LX-' + Math.random().toString(36).substring(2, 8).toUpperCase()
  cart.items.value.splice(0) // clear cart
  useState('checkoutOrder').value = null
  isPlacing.value = false
  step.value = 3
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-[#030712]">

    <!-- ── Order Confirmed ─────────────────────────────────── -->
    <div v-if="step === 3" class="flex flex-col items-center justify-center min-h-screen px-4 py-24 text-center">
      <div class="relative mb-8">
        <div class="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-2xl shadow-emerald-500/30 mx-auto">
          <UIcon name="i-lucide-check" class="w-16 h-16 text-white" />
        </div>
        <div class="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
          <UIcon name="i-lucide-star" class="w-4 h-4 text-yellow-900" />
        </div>
      </div>
      <h1 class="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Order Placed!</h1>
      <p class="text-xl text-gray-500 dark:text-gray-400 mb-2 max-w-md">
        Thank you for your purchase. Your order is being prepared.
      </p>
      <div class="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg mb-10 mt-2">
        <UIcon name="i-lucide-package" class="w-5 h-5 text-purple-500" />
        <span class="text-sm text-gray-500 dark:text-gray-400">Order ID:</span>
        <span class="font-black tracking-widest text-gray-900 dark:text-white">{{ orderId }}</span>
      </div>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <UButton to="/shop" size="xl" class="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-xl hover:shadow-purple-500/30 transition-all">
          <template #leading><UIcon name="i-lucide-shopping-bag" class="w-5 h-5" /></template>
          Continue Shopping
        </UButton>
        <UButton to="/" size="xl" variant="outline">
          <template #leading><UIcon name="i-lucide-home" class="w-5 h-5" /></template>
          Back to Home
        </UButton>
      </div>
    </div>

    <!-- ── Checkout Flow ───────────────────────────────────── -->
    <template v-else>
      <!-- Header -->
      <div class="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-0 z-40 shadow-sm">
        <div class="container mx-auto px-4 h-16 flex items-center justify-between">
          <NuxtLink to="/" class="flex items-center gap-2 font-black text-xl tracking-tight">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-1">
              <svg viewBox="-4 -4 48 108" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full">
                <polyline points="0,20 20,0 40,20"/>
                <line x1="0" y1="20" x2="0" y2="40"/><line x1="20" y1="20" x2="20" y2="40"/><line x1="40" y1="20" x2="40" y2="40"/>
                <line x1="0" y1="40" x2="20" y2="60"/><line x1="20" y1="40" x2="40" y2="60"/>
                <line x1="0" y1="60" x2="10" y2="50"/><line x1="40" y1="40" x2="30" y2="50"/>
                <line x1="0" y1="60" x2="0" y2="80"/><line x1="20" y1="60" x2="20" y2="80"/><line x1="40" y1="60" x2="40" y2="80"/>
                <polyline points="0,80 20,100 40,80"/>
              </svg>
            </div>
            Store ∈ SAN
          </NuxtLink>

          <!-- Step indicator -->
          <div class="flex items-center gap-2">
            <div v-for="s in [1,2]" :key="s" class="flex items-center gap-2">
              <div :class="[
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                step >= s ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
              ]">{{ s }}</div>
              <span :class="['hidden sm:block text-xs font-semibold', step >= s ? 'text-gray-900 dark:text-white' : 'text-gray-400']">
                {{ s === 1 ? 'Delivery' : 'Payment' }}
              </span>
              <div v-if="s < 2" class="w-8 h-px bg-gray-200 dark:bg-gray-700 mx-1" />
            </div>
          </div>

          <NuxtLink to="/shoppingcart" class="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            <UIcon name="i-lucide-arrow-left" class="w-4 h-4" />
            Back to Cart
          </NuxtLink>
        </div>
      </div>

      <div class="container mx-auto px-4 py-10 max-w-6xl">
        <div class="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">

          <!-- ── LEFT: Form ─────────────────────────────── -->
          <div class="space-y-8">

            <!-- Step 1: Contact + Shipping Address -->
            <div v-if="step === 1" class="space-y-8">
              <!-- Contact -->
              <div class="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
                <h2 class="text-xl font-black mb-6 flex items-center gap-3">
                  <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                    <UIcon name="i-lucide-user" class="w-4 h-4 text-white" />
                  </div>
                  Contact Information
                </h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">First Name *</label>
                    <input v-model="contact.firstName" type="text" placeholder="John"
                      class="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" />
                  </div>
                  <div>
                    <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Last Name *</label>
                    <input v-model="contact.lastName" type="text" placeholder="Doe"
                      class="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" />
                  </div>
                  <div>
                    <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Email *</label>
                    <input v-model="contact.email" type="email" placeholder="john@example.com"
                      class="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" />
                  </div>
                  <div>
                    <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Phone</label>
                    <input v-model="contact.phone" type="tel" placeholder="+1 (555) 000-0000"
                      class="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" />
                  </div>
                </div>
              </div>

              <!-- Shipping Address -->
              <div class="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
                <h2 class="text-xl font-black mb-6 flex items-center gap-3">
                  <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                    <UIcon name="i-lucide-map-pin" class="w-4 h-4 text-white" />
                  </div>
                  Shipping Address
                </h2>
                <div class="space-y-4">
                  <div>
                    <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Address Line 1 *</label>
                    <input v-model="address.line1" type="text" placeholder="123 Main Street"
                      class="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" />
                  </div>
                  <div>
                    <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Address Line 2</label>
                    <input v-model="address.line2" type="text" placeholder="Apt, Suite, Unit (optional)"
                      class="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" />
                  </div>
                  <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div class="col-span-2 sm:col-span-1">
                      <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">City *</label>
                      <input v-model="address.city" type="text" placeholder="New York"
                        class="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" />
                    </div>
                    <div>
                      <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">State</label>
                      <input v-model="address.state" type="text" placeholder="NY"
                        class="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" />
                    </div>
                    <div>
                      <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">ZIP *</label>
                      <input v-model="address.zip" type="text" placeholder="10001"
                        class="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" />
                    </div>
                  </div>
                  <div>
                    <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Country</label>
                    <select v-model="address.country"
                      class="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all">
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                    </select>
                  </div>
                </div>
              </div>

              <UButton
                block size="xl"
                :disabled="!step1Valid"
                class="h-16 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-black text-lg hover:shadow-xl hover:shadow-purple-500/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                @click="step = 2"
              >
                Continue to Payment
                <template #trailing><UIcon name="i-lucide-arrow-right" class="w-5 h-5" /></template>
              </UButton>
            </div>

            <!-- Step 2: Payment -->
            <div v-if="step === 2" class="space-y-8">
              <!-- Back -->
              <button @click="step = 1" class="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors font-semibold">
                <UIcon name="i-lucide-arrow-left" class="w-4 h-4" />
                Edit delivery details
              </button>

              <!-- Delivery summary pill -->
              <div class="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
                <div class="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                  <UIcon name="i-lucide-map-pin" class="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs text-gray-500 dark:text-gray-400 font-semibold">Delivering to</p>
                  <p class="text-sm font-bold text-gray-900 dark:text-white truncate">
                    {{ contact.firstName }} {{ contact.lastName }} — {{ address.line1 }}, {{ address.city }} {{ address.zip }}
                  </p>
                </div>
                <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-emerald-500 flex-shrink-0" />
              </div>

              <!-- Payment method tabs -->
              <div class="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
                <h2 class="text-xl font-black mb-6 flex items-center gap-3">
                  <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                    <UIcon name="i-lucide-credit-card" class="w-4 h-4 text-white" />
                  </div>
                  Payment Method
                </h2>

                <div class="grid grid-cols-3 gap-3 mb-8">
                  <button v-for="m in [
                    { id: 'card', label: 'Credit Card', icon: 'i-lucide-credit-card' },
                    { id: 'paypal', label: 'PayPal', icon: 'i-lucide-wallet' },
                    { id: 'apple', label: 'Apple Pay', icon: 'i-lucide-smartphone' }
                  ]" :key="m.id"
                    @click="paymentMethod = m.id"
                    :class="[
                      'flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all text-sm font-bold',
                      paymentMethod === m.id
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                        : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:border-gray-300 dark:hover:border-gray-600'
                    ]"
                  >
                    <UIcon :name="m.icon" class="w-6 h-6" />
                    {{ m.label }}
                  </button>
                </div>

                <!-- Card form -->
                <div v-if="paymentMethod === 'card'" class="space-y-4">
                  <div>
                    <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Card Number *</label>
                    <input :value="card.number" @input="formatCard" type="text" placeholder="1234 5678 9012 3456" maxlength="19"
                      class="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-medium tracking-widest focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" />
                  </div>
                  <div>
                    <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Name on Card *</label>
                    <input v-model="card.name" type="text" placeholder="John Doe"
                      class="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" />
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Expiry *</label>
                      <input :value="card.expiry" @input="formatExpiry" type="text" placeholder="MM/YY" maxlength="5"
                        class="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-medium tracking-widest focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" />
                    </div>
                    <div>
                      <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">CVV *</label>
                      <input v-model="card.cvv" type="password" placeholder="•••" maxlength="4"
                        class="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" />
                    </div>
                  </div>
                </div>

                <!-- PayPal mock -->
                <div v-else-if="paymentMethod === 'paypal'" class="flex flex-col items-center gap-4 py-8">
                  <div class="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg">
                    <UIcon name="i-lucide-wallet" class="w-8 h-8 text-white" />
                  </div>
                  <p class="text-sm text-gray-500 dark:text-gray-400 text-center max-w-xs">
                    You'll be redirected to PayPal to complete your payment securely.
                  </p>
                </div>

                <!-- Apple Pay mock -->
                <div v-else class="flex flex-col items-center gap-4 py-8">
                  <div class="w-16 h-16 rounded-2xl bg-gray-900 dark:bg-white flex items-center justify-center shadow-lg">
                    <UIcon name="i-lucide-smartphone" class="w-8 h-8 text-white dark:text-gray-900" />
                  </div>
                  <p class="text-sm text-gray-500 dark:text-gray-400 text-center max-w-xs">
                    Use Face ID or Touch ID to pay with Apple Pay.
                  </p>
                </div>
              </div>

              <!-- Place Order -->
              <UButton
                block size="xl"
                :disabled="!step2Valid || isPlacing"
                :loading="isPlacing"
                class="h-20 rounded-[32px] bg-gray-900 dark:bg-white dark:text-gray-900 font-black text-xl hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 transition-all duration-300 shadow-2xl"
                @click="placeOrder"
              >
                <template #leading>
                  <UIcon v-if="!isPlacing" name="i-lucide-shield-check" class="w-6 h-6" />
                </template>
                {{ isPlacing ? 'Placing Order…' : 'Place Order — $' + total.toFixed(2) }}
              </UButton>

              <p class="text-center text-xs text-gray-400 dark:text-gray-500">
                <UIcon name="i-lucide-lock" class="w-3.5 h-3.5 inline mr-1" />
                Your payment is encrypted and secure. We never store card details.
              </p>
            </div>
          </div>

          <!-- ── RIGHT: Order Summary ─────────────────────── -->
          <div class="order-first lg:order-last">
            <div class="sticky top-24 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
              <div class="p-6 border-b border-gray-100 dark:border-gray-800">
                <h3 class="font-black text-lg">Order Summary</h3>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{{ items.length }} item{{ items.length !== 1 ? 's' : '' }}</p>
              </div>

              <!-- Items -->
              <div class="divide-y divide-gray-100 dark:divide-gray-800 max-h-72 overflow-y-auto">
                <div v-for="item in items" :key="item.cartKey" class="flex gap-3 p-4">
                  <div class="w-14 h-14 rounded-xl bg-gray-100 dark:bg-gray-800 flex-shrink-0 overflow-hidden">
                    <img v-if="item.image" :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-bold text-gray-900 dark:text-white leading-tight line-clamp-1">{{ item.name }}</p>
                    <p v-if="item.selectedColor" class="text-xs text-purple-500 font-semibold mt-0.5">{{ item.selectedColor }}</p>
                    <p class="text-xs text-gray-400 mt-0.5">Qty: {{ item.quantity }}</p>
                  </div>
                  <p class="text-sm font-black text-gray-900 dark:text-white flex-shrink-0">
                    ${{ (item.price * item.quantity).toFixed(2) }}
                  </p>
                </div>
              </div>

              <!-- Totals -->
              <div class="p-6 space-y-3 border-t border-gray-100 dark:border-gray-800">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-500 dark:text-gray-400">Subtotal</span>
                  <span class="font-semibold">${{ subtotal.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-500 dark:text-gray-400">Shipping ({{ shippingLabel }})</span>
                  <span class="font-semibold">{{ shippingCost === 0 ? 'Free' : '$' + shippingCost.toFixed(2) }}</span>
                </div>
                <div v-if="discount > 0" class="flex justify-between text-sm">
                  <span class="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                    <UIcon name="i-lucide-ticket" class="w-3.5 h-3.5" />{{ promoCode }}
                  </span>
                  <span class="font-bold text-emerald-600 dark:text-emerald-400">-${{ discount.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-500 dark:text-gray-400">Tax (8%)</span>
                  <span class="font-semibold">${{ tax.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                  <span class="font-black text-lg">Total</span>
                  <span class="font-black text-2xl text-gray-900 dark:text-white">${{ total.toFixed(2) }}</span>
                </div>
              </div>

              <!-- Trust -->
              <div class="px-6 pb-6 flex items-center justify-center gap-6">
                <div class="flex flex-col items-center gap-1 text-gray-400">
                  <UIcon name="i-lucide-lock" class="w-4 h-4" />
                  <span class="text-[9px] font-black uppercase tracking-widest">SSL</span>
                </div>
                <div class="flex flex-col items-center gap-1 text-gray-400">
                  <UIcon name="i-lucide-shield-check" class="w-4 h-4" />
                  <span class="text-[9px] font-black uppercase tracking-widest">Secure</span>
                </div>
                <div class="flex flex-col items-center gap-1 text-gray-400">
                  <UIcon name="i-lucide-rotate-ccw" class="w-4 h-4" />
                  <span class="text-[9px] font-black uppercase tracking-widest">Returns</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
input:focus, select:focus { outline: none; }
</style>
