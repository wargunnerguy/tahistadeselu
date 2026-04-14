<template>
  <!-- Bar -->
  <nav
    :class="[
      'fixed top-0 left-0 w-full z-50 transition-all duration-500',
      scrolled ? 'bg-stone-900' : 'bg-transparent',
    ]"
  >
    <div class="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink
        to="/"
        class="text-sm font-light tracking-[0.25em] uppercase text-white transition-opacity duration-300 hover:opacity-60"
        @click="menuOpen = false"
      >
        Tähistades Elu
      </NuxtLink>

      <!-- Desktop links -->
      <ul class="hidden md:flex items-center gap-10">
        <li v-for="link in links" :key="link.to">
          <NuxtLink
            :to="link.to"
            class="text-xs tracking-[0.2em] uppercase text-white/80 hover:text-white transition-colors duration-200"
            active-class="text-white"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>

      <!-- Mobile hamburger -->
      <button
        class="md:hidden text-white z-50 relative"
        :aria-label="menuOpen ? 'Sulge menüü' : 'Ava menüü'"
        @click="menuOpen = !menuOpen"
      >
        <Transition name="icon-swap" mode="out-in">
          <!-- Hamburger -->
          <svg v-if="!menuOpen" key="open" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <!-- Close -->
          <svg v-else key="close" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Transition>
      </button>
    </div>
  </nav>

  <!-- Fullscreen mobile overlay -->
  <Transition name="fullscreen">
    <div
      v-if="menuOpen"
      class="fixed inset-0 z-40 bg-stone-900 flex flex-col items-center justify-center md:hidden"
    >
      <ul class="flex flex-col items-center gap-10">
        <li v-for="link in links" :key="link.to">
          <NuxtLink
            :to="link.to"
            class="text-2xl font-extralight tracking-[0.25em] uppercase text-white/70 hover:text-white transition-colors duration-200"
            active-class="text-white"
            @click="menuOpen = false"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>
      <p class="absolute bottom-10 text-xs tracking-[0.3em] uppercase text-white/20">
        Tähistades Elu
      </p>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const scrolled = ref(false)
const menuOpen = ref(false)

const links = [
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

// Lock body scroll when mobile menu open
watch(menuOpen, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})
</script>

<style scoped>
/* Icon swap */
.icon-swap-enter-active,
.icon-swap-leave-active {
  transition: opacity 0.15s ease;
}
.icon-swap-enter-from,
.icon-swap-leave-to {
  opacity: 0;
}

/* Fullscreen overlay */
.fullscreen-enter-active,
.fullscreen-leave-active {
  transition: opacity 0.3s ease;
}
.fullscreen-enter-from,
.fullscreen-leave-to {
  opacity: 0;
}
</style>
