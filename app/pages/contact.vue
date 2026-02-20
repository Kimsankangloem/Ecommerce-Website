<script setup>
useHead({ title: 'Contact Us — Store ∈ SAN' })

const form = reactive({ name: '', email: '', subject: '', message: '' })
const submitted = ref(false)

function submit() {
  if (form.name && form.email && form.message) submitted.value = true
}
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero -->
    <section class="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
      <div class="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
      <div class="relative container mx-auto px-4 py-24 text-center text-white space-y-4">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-medium">
          <UIcon name="i-lucide-mail" class="w-4 h-4" /> Contact Us
        </div>
        <h1 class="text-5xl font-bold">Get in Touch</h1>
        <p class="text-white/80 text-lg max-w-xl mx-auto">Have a question or need help? We're here 24/7 and typically respond within 2 hours.</p>
      </div>
    </section>

    <section class="container mx-auto px-4 py-16 max-w-5xl">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div class="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 text-center space-y-3">
          <div class="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto">
            <UIcon name="i-lucide-mail" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 class="font-semibold">Email</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">support@storesan.com</p>
          <p class="text-xs text-gray-400">Response within 2 hours</p>
        </div>
        <div class="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 text-center space-y-3">
          <div class="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto">
            <UIcon name="i-lucide-phone" class="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 class="font-semibold">Phone</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">+1 (800) 123-4567</p>
          <p class="text-xs text-gray-400">Mon–Fri, 9am–6pm EST</p>
        </div>
        <div class="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 text-center space-y-3">
          <div class="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
            <UIcon name="i-lucide-message-circle" class="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 class="font-semibold">Live Chat</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">Chat with us instantly</p>
          <p class="text-xs text-gray-400">Available 24/7</p>
        </div>
      </div>

      <!-- Form -->
      <div class="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-8 md:p-12 max-w-2xl mx-auto">
        <div v-if="submitted" class="text-center py-12 space-y-4">
          <div class="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
            <UIcon name="i-lucide-check" class="w-8 h-8 text-green-600" />
          </div>
          <h2 class="text-2xl font-bold">Message Sent!</h2>
          <p class="text-gray-500 dark:text-gray-400">We'll get back to you within 2 hours.</p>
          <UButton @click="submitted = false; form.name = ''; form.email = ''; form.subject = ''; form.message = ''" variant="outline">Send Another</UButton>
        </div>
        <div v-else class="space-y-6">
          <h2 class="text-2xl font-bold">Send a Message</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UFormField label="Your Name">
              <UInput v-model="form.name" placeholder="John Doe" class="w-full" />
            </UFormField>
            <UFormField label="Email Address">
              <UInput v-model="form.email" type="email" placeholder="john@example.com" class="w-full" />
            </UFormField>
          </div>
          <UFormField label="Subject">
            <UInput v-model="form.subject" placeholder="How can we help?" class="w-full" />
          </UFormField>
          <UFormField label="Message">
            <UTextarea v-model="form.message" placeholder="Tell us more about your question..." :rows="5" class="w-full" />
          </UFormField>
          <UButton @click="submit" size="lg" class="w-full bg-purple-600 hover:bg-purple-700" :disabled="!form.name || !form.email || !form.message">
            <template #leading><UIcon name="i-lucide-send" class="w-4 h-4" /></template>
            Send Message
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
