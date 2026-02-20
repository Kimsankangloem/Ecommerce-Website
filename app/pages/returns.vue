<script setup>
useHead({ title: 'Returns & Refunds — Store ∈ SAN' })

const steps = [
  { icon: 'i-lucide-package-open', title: 'Initiate Return', desc: 'Contact us within 30 days of delivery with your order number.' },
  { icon: 'i-lucide-printer', title: 'Print Label', desc: 'We\'ll email you a prepaid return shipping label for free.' },
  { icon: 'i-lucide-send', title: 'Ship It Back', desc: 'Drop the package at any carrier location using the prepaid label.' },
  { icon: 'i-lucide-banknote', title: 'Get Refunded', desc: 'Refund processed within 3–5 business days of receiving your return.' },
]

const policies = [
  { title: 'Return Window', value: '30 days', icon: 'i-lucide-calendar', desc: 'Items can be returned within 30 days of the delivery date.' },
  { title: 'Condition', value: 'Unopened', icon: 'i-lucide-package', desc: 'Items must be in original, unused condition with all packaging intact.' },
  { title: 'Refund Method', value: 'Original Payment', icon: 'i-lucide-credit-card', desc: 'Refunds are issued to the original payment method used at checkout.' },
  { title: 'Processing Time', value: '3–5 Days', icon: 'i-lucide-clock', desc: 'Once we receive your return, refunds are processed within 3–5 business days.' },
]
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero -->
    <section class="relative overflow-hidden bg-gradient-to-br from-orange-500 via-red-500 to-pink-600">
      <div class="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
      <div class="relative container mx-auto px-4 py-24 text-center text-white space-y-4">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-medium">
          <UIcon name="i-lucide-rotate-ccw" class="w-4 h-4" /> Returns & Refunds
        </div>
        <h1 class="text-5xl font-bold">Hassle-Free Returns</h1>
        <p class="text-white/80 text-lg max-w-xl mx-auto">Not satisfied? Return within 30 days for a full refund — no questions asked.</p>
      </div>
    </section>

    <section class="container mx-auto px-4 py-16 max-w-4xl space-y-16">
      <!-- Policy Cards -->
      <div>
        <h2 class="text-3xl font-bold text-center mb-10">Return Policy</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="p in policies" :key="p.title" class="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800 text-center space-y-2">
            <div class="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mx-auto">
              <UIcon :name="p.icon" class="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400">{{ p.title }}</p>
            <p class="font-bold text-lg">{{ p.value }}</p>
            <p class="text-xs text-gray-400 dark:text-gray-500">{{ p.desc }}</p>
          </div>
        </div>
      </div>

      <!-- How to Return -->
      <div>
        <h2 class="text-3xl font-bold text-center mb-10">How to Return</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="(step, i) in steps" :key="i" class="relative bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 text-center space-y-3">
            <div class="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center">{{ i + 1 }}</div>
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mx-auto">
              <UIcon :name="step.icon" class="w-6 h-6 text-white" />
            </div>
            <h4 class="font-semibold">{{ step.title }}</h4>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ step.desc }}</p>
          </div>
        </div>
      </div>

      <!-- Non-Returnable -->
      <div class="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6 border border-red-200 dark:border-red-800">
        <h3 class="font-bold text-lg flex items-center gap-2 mb-4 text-red-700 dark:text-red-400">
          <UIcon name="i-lucide-alert-circle" class="w-5 h-5" /> Non-Returnable Items
        </h3>
        <ul class="space-y-2 text-sm text-red-600 dark:text-red-400">
          <li class="flex items-center gap-2"><UIcon name="i-lucide-x" class="w-4 h-4 flex-shrink-0" /> Opened software or digital downloads</li>
          <li class="flex items-center gap-2"><UIcon name="i-lucide-x" class="w-4 h-4 flex-shrink-0" /> Items damaged due to misuse</li>
          <li class="flex items-center gap-2"><UIcon name="i-lucide-x" class="w-4 h-4 flex-shrink-0" /> Items returned after 30 days</li>
          <li class="flex items-center gap-2"><UIcon name="i-lucide-x" class="w-4 h-4 flex-shrink-0" /> Gift cards</li>
        </ul>
      </div>

      <div class="text-center">
        <p class="text-gray-500 dark:text-gray-400 mb-4">Ready to start a return?</p>
        <UButton to="/contact" size="lg" class="bg-orange-500 hover:bg-orange-600">
          <template #leading><UIcon name="i-lucide-rotate-ccw" class="w-4 h-4" /></template>
          Start a Return
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
