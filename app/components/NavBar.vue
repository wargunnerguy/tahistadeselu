<template>
  <nav
    :class="[
      'fixed top-0 left-0 w-full z-50 transition-all duration-500',
      scrolled ? 'bg-white shadow-sm' : 'bg-transparent',
    ]"
  >
    <div class="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink
        to="/"
        :class="[
          'text-sm font-light tracking-[0.25em] uppercase transition-colors duration-300',
          scrolled ? 'text-stone-800' : 'text-white',
        ]"
      >
        Tähistades Elu
      </NuxtLink>

      <!-- Desktop links -->
      <ul class="hidden md:flex items-center gap-8">
        <li v-for="link in links" :key="link.to">
          <NuxtLink
            :to="link.to"
            :class="[
              'text-xs tracking-[0.2em] uppercase transition-colors duration-300 hover:opacity-60',
              scrolled ? 'text-stone-700' : 'text-white',
            ]"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>

      <!-- Mobile toggle -->
      <button
        :class="['md:hidden transition-colors duration-300', scrolled ? 'text-stone-800' : 'text-white']"
        :aria-label="menuOpen ? 'Sulge menüü' : 'Ava menüü'"
        @click="menuOpen = !menuOpen"
      >
        <svg v-if="!menuOpen" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <Transition name="slide">
      <div v-if="menuOpen" class="md:hidden bg-white border-t border-stone-100">
        <ul class="flex flex-col px-6 py-4 gap-5">
          <li v-for="link in links" :key="link.to">
            <NuxtLink
              :to="link.to"
              class="text-xs tracking-[0.2em] uppercase text-stone-700 hover:text-stone-400 transition-colors"
              @click="menuOpen = false"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
const scrolled = ref(false)
const menuOpen = ref(false)

const links = [
  { to: '/', label: 'Avaleht' },
  { to: '/meist', label: 'Meist' },
  { to: '/teenused', label: 'Teenused' },
  { to: '/broneeri', label: 'Broneeri' },
  { to: '/kontakt', label: 'Kontakt' },
]

onMounted(() => {
  const onScroll = () => { scrolled.value = window.scrollY > 60 }
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
