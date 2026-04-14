<template>
  <footer class="bg-stone-900 text-white">
    <div class="max-w-6xl mx-auto px-6 py-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

        <!-- Brand -->
        <div class="md:col-span-1">
          <NuxtLink to="/" class="text-sm font-light tracking-[0.25em] uppercase text-white hover:opacity-60 transition-opacity">
            Tähistades Elu
          </NuxtLink>
          <p class="mt-4 text-stone-400 font-light text-sm leading-relaxed italic">
            „Elu väärib tähistamist."
          </p>
        </div>

        <!-- Contact -->
        <div class="md:col-span-1">
          <p class="text-xs tracking-[0.25em] uppercase text-stone-500 mb-5">Kontakt</p>
          <ul class="space-y-3 text-sm font-light">
            <li>
              <a href="tel:+37200000000" class="text-stone-300 hover:text-white transition-colors">
                +372 000 0000 <!-- Asendage -->
              </a>
            </li>
            <li>
              <a href="mailto:info@tahistadeselu.ee" class="text-stone-300 hover:text-white transition-colors">
                info@tahistadeselu.ee <!-- Asendage -->
              </a>
            </li>
            <li>
              <a href="https://tahistadeselu.ee" target="_blank" rel="noopener" class="text-stone-300 hover:text-white transition-colors">
                tahistadeselu.ee
              </a>
            </li>
          </ul>
        </div>

        <!-- Nav -->
        <div class="md:col-span-1">
          <p class="text-xs tracking-[0.25em] uppercase text-stone-500 mb-5">Leheküljed</p>
          <ul class="space-y-3">
            <li v-for="link in links" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="text-sm font-light text-stone-300 hover:text-white transition-colors tracking-wide"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="mt-16 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-stone-500 text-xs tracking-wide">
          &copy; 2025 Tähistades Elu. Kõik õigused kaitstud.
        </p>
        <p class="text-stone-600 text-xs tracking-wide">
          Eesti
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const links = [
  { to: '/meist', label: 'Meist' },
  { to: '/teenused', label: 'Teenused' },
  { to: '/broneeri', label: 'Broneeri' },
  { to: '/kontakt', label: 'Kontakt' },
]
</script>
