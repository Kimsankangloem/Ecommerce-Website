<script setup>
useHead({ title: 'FAQ — Store ∈ SAN' })

const categories = [
  {
    label: 'Orders & Shipping',
    icon: 'i-lucide-package',
    color: 'from-blue-500 to-cyan-500',
    questions: [
      { q: 'How do I track my order?', a: 'After your order ships, you\'ll receive a tracking number via email. You can use it on our site or the carrier\'s website to see real-time updates.' },
      { q: 'Can I change or cancel my order?', a: 'Orders can be modified or cancelled within 1 hour of placement. After that, contact us immediately and we\'ll do our best to help.' },
      { q: 'Do you offer free shipping?', a: 'Yes! Standard shipping is free on all orders over $50. Express and overnight options are available for an extra fee.' },
      { q: 'Do you ship internationally?', a: 'We ship to over 50 countries. International delivery takes 7–21 business days. Additional customs fees may apply depending on your country.' },
    ]
  },
  {
    label: 'Returns & Refunds',
    icon: 'i-lucide-rotate-ccw',
    color: 'from-orange-500 to-red-500',
    questions: [
      { q: 'What is your return policy?', a: 'We accept returns within 30 days of delivery. Items must be in original, unopened condition. We provide a free prepaid return label.' },
      { q: 'How long does a refund take?', a: 'Once we receive your return, refunds are processed within 3–5 business days to your original payment method.' },
      { q: 'What if my item arrived damaged?', a: 'We\'re so sorry! Take a photo of the damage and contact us within 48 hours. We\'ll send a replacement or issue a full refund immediately.' },
    ]
  },
  {
    label: 'Products',
    icon: 'i-lucide-shopping-bag',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { q: 'Are your products genuine?', a: 'Absolutely. All products are 100% authentic and sourced directly from official manufacturers and authorized distributors.' },
      { q: 'Do products come with warranty?', a: 'Yes, all products include the manufacturer\'s standard warranty. Extended warranty options are available at checkout.' },
      { q: 'Can I see product reviews?', a: 'Every product page features verified buyer reviews with star ratings. We never delete honest reviews.' },
    ]
  },
  {
    label: 'Payments',
    icon: 'i-lucide-credit-card',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { q: 'What payment methods do you accept?', a: 'We accept all major credit/debit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, and Google Pay.' },
      { q: 'Is my payment information secure?', a: 'Yes. All transactions are encrypted with TLS/SSL. We never store your full card details on our servers.' },
      { q: 'Can I use a promo code?', a: 'Yes! Enter your promo code in the cart or checkout page. Only one promo code can be applied per order.' },
    ]
  },
]

const openItem = ref(null)

function toggle(id) {
  openItem.value = openItem.value === id ? null : id
}
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero -->
    <section class="relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600">
      <div class="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
      <div class="relative container mx-auto px-4 py-24 text-center text-white space-y-4">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-medium">
          <UIcon name="i-lucide-help-circle" class="w-4 h-4" /> FAQ
        </div>
        <h1 class="text-5xl font-bold">Frequently Asked Questions</h1>
        <p class="text-white/80 text-lg max-w-xl mx-auto">Find quick answers to the most common questions about orders, shipping, returns, and more.</p>
      </div>
    </section>

    <section class="container mx-auto px-4 py-16 max-w-3xl space-y-12">
      <div v-for="cat in categories" :key="cat.label" class="space-y-4">
        <!-- Category Header -->
        <div class="flex items-center gap-3 mb-6">
          <div :class="`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center`">
            <UIcon :name="cat.icon" class="w-5 h-5 text-white" />
          </div>
          <h2 class="text-xl font-bold">{{ cat.label }}</h2>
        </div>

        <!-- Accordion Items -->
        <div
          v-for="(item, i) in cat.questions"
          :key="`${cat.label}-${i}`"
          class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-200"
        >
          <button
            type="button"
            class="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors"
            @click="toggle(`${cat.label}-${i}`)"
          >
            <span class="font-medium">{{ item.q }}</span>
            <UIcon
              name="i-lucide-chevron-down"
              class="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200"
              :class="openItem === `${cat.label}-${i}` ? 'rotate-180' : ''"
            />
          </button>
          <div
            v-show="openItem === `${cat.label}-${i}`"
            class="px-5 pb-5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-4"
          >
            {{ item.a }}
          </div>
        </div>
      </div>

      <!-- Still need help -->
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 to-blue-600 p-10 text-center text-white space-y-4">
        <div class="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
        <div class="relative z-10 space-y-4">
          <h2 class="text-2xl font-bold">Still Have Questions?</h2>
          <p class="text-white/80">Our support team is available 24/7 and typically replies within 2 hours.</p>
          <UButton to="/contact" size="lg" class="bg-white text-purple-600 hover:bg-gray-100">
            <template #leading><UIcon name="i-lucide-mail" class="w-4 h-4" /></template>
            Contact Support
          </UButton>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.bg-grid-white\/10 {
  background-image: linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
}
</style>
