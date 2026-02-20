<script setup>
useHead({ title: 'Shipping Info — Store ∈ SAN' })

const methods = [
  { name: 'Standard Shipping', time: '5–7 business days', price: '$4.99', free: 'Free over $50', icon: 'i-lucide-package', color: 'from-blue-500 to-cyan-500' },
  { name: 'Express Shipping', time: '2–3 business days', price: '$9.99', free: 'Free over $100', icon: 'i-lucide-zap', color: 'from-purple-500 to-pink-500' },
  { name: 'Overnight Shipping', time: 'Next business day', price: '$19.99', free: 'Free over $200', icon: 'i-lucide-rocket', color: 'from-orange-500 to-red-500' },
]

const faqs = [
  { q: 'When will my order ship?', a: 'Orders placed before 2pm EST ship the same business day. Orders after 2pm ship the next business day.' },
  { q: 'Do you ship internationally?', a: 'Yes! We ship to over 50 countries. International shipping times vary from 7–21 business days depending on location.' },
  { q: 'How do I track my order?', a: 'Once your order ships you\'ll receive a confirmation email with a tracking number. You can use it on our website or the carrier\'s site.' },
  { q: 'What if my package is lost?', a: 'If your package hasn\'t arrived within the estimated window, contact us and we\'ll open a trace or send a replacement.' },
]
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero -->
    <section class="relative overflow-hidden bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-600">
      <div class="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
      <div class="relative container mx-auto px-4 py-24 text-center text-white space-y-4">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-medium">
          <UIcon name="i-lucide-truck" class="w-4 h-4" /> Shipping Info
        </div>
        <h1 class="text-5xl font-bold">Fast & Reliable Shipping</h1>
        <p class="text-white/80 text-lg max-w-xl mx-auto">Free standard shipping on orders over $50. Get your tech delivered quickly and safely.</p>
      </div>
    </section>

    <section class="container mx-auto px-4 py-16 max-w-4xl space-y-16">
      <!-- Shipping Methods -->
      <div>
        <h2 class="text-3xl font-bold text-center mb-10">Shipping Options</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="method in methods" :key="method.name"
            class="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 space-y-4"
          >
            <div :class="`w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center`">
              <UIcon :name="method.icon" class="w-6 h-6 text-white" />
            </div>
            <h3 class="font-bold text-lg">{{ method.name }}</h3>
            <p class="text-gray-500 dark:text-gray-400 text-sm">{{ method.time }}</p>
            <div class="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <span class="text-2xl font-bold">{{ method.price }}</span>
              <span class="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full font-medium">{{ method.free }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Process Timeline -->
      <div>
        <h2 class="text-3xl font-bold text-center mb-10">How It Works</h2>
        <div class="relative">
          <div class="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800 hidden md:block" />
          <div class="space-y-6">
            <div v-for="(step, i) in [
              { label: 'Place Your Order', desc: 'Complete checkout — we accept all major cards & PayPal.', icon: 'i-lucide-shopping-cart' },
              { label: 'Order Confirmed', desc: 'You\'ll receive a confirmation email within minutes.', icon: 'i-lucide-check-circle' },
              { label: 'Packed & Dispatched', desc: 'Our team carefully packs your items and hands off to carrier.', icon: 'i-lucide-package' },
              { label: 'Out for Delivery', desc: 'Track your package in real-time with the tracking link.', icon: 'i-lucide-truck' },
              { label: 'Delivered!', desc: 'Enjoy your new tech. Rate your experience and leave a review.', icon: 'i-lucide-star' },
            ]" :key="i" class="flex items-start gap-4 relative">
              <div class="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0 z-10">
                <UIcon :name="step.icon" class="w-5 h-5" />
              </div>
              <div class="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-200 dark:border-gray-800 flex-1">
                <h4 class="font-semibold">{{ step.label }}</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ step.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQs -->
      <div>
        <h2 class="text-3xl font-bold text-center mb-10">Common Questions</h2>
        <div class="space-y-4">
          <div v-for="faq in faqs" :key="faq.q" class="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
            <h4 class="font-semibold flex items-center gap-2">
              <UIcon name="i-lucide-help-circle" class="w-4 h-4 text-purple-500 flex-shrink-0" />
              {{ faq.q }}
            </h4>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2 ml-6">{{ faq.a }}</p>
          </div>
        </div>
      </div>

      <div class="text-center">
        <p class="text-gray-500 dark:text-gray-400 mb-4">Still have questions about your shipment?</p>
        <UButton to="/contact" size="lg" class="bg-purple-600 hover:bg-purple-700">
          <template #leading><UIcon name="i-lucide-mail" class="w-4 h-4" /></template>
          Contact Support
        </UButton>
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
