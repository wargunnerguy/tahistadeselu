<template>
  <footer class="bg-stone-900 text-white">
    <div class="max-w-6xl mx-auto px-6 py-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

        <!-- Brand -->
        <div class="md:col-span-1">
          <NuxtLink :to="localePath('/')" class="text-sm font-light tracking-[0.25em] uppercase text-white hover:opacity-60 transition-opacity">
            Tähistades Elu
          </NuxtLink>
          <p class="mt-4 text-stone-400 font-light text-sm leading-relaxed italic">
            {{ $t('footer.tagline') }}
          </p>
        </div>

        <!-- Contact -->
        <div class="md:col-span-1">
          <p class="text-xs tracking-[0.25em] uppercase text-stone-500 mb-5">{{ $t('footer.contactLabel') }}</p>
          <ul class="space-y-3 text-sm font-light">
            <li>
              <a href="tel:+37256875675" class="text-stone-300 hover:text-white transition-colors">
                +372 5687 5675
              </a>
            </li>
            <li>
              <a href="mailto:tahistadeselu@gmail.com" class="text-stone-300 hover:text-white transition-colors">
                tahistadeselu@gmail.com
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
          <p class="text-xs tracking-[0.25em] uppercase text-stone-500 mb-5">{{ $t('footer.pagesLabel') }}</p>
          <ul class="space-y-3">
            <li v-for="link in links" :key="link.key">
              <NuxtLink
                :to="localePath(link.to)"
                class="text-sm font-light text-stone-300 hover:text-white transition-colors tracking-wide"
              >
                {{ $t(link.key) }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="mt-16 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="text-center sm:text-left">
          <p class="text-stone-500 text-xs tracking-wide">
            {{ $t('footer.copyright', { year: new Date().getFullYear() }) }}
          </p>
          <p v-if="$t('footer.legal')" class="text-stone-600 text-xs tracking-wide mt-1">
            {{ $t('footer.legal') }}
          </p>
        </div>
        <div class="flex items-center gap-6">
          <NuxtLink
            :to="localePath('/privaatsus')"
            class="text-stone-600 text-xs tracking-wide hover:text-stone-400 transition-colors"
          >
            {{ $t('privacy.footerLink') }}
          </NuxtLink>
          <p class="text-stone-600 text-xs tracking-wide">
            {{ $t('footer.country') }}
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const localePath = useLocalePath()

const links = [
  { to: '/meist', key: 'nav.meist' },
  { to: '/teenused', key: 'nav.teenused' },
  // Store hidden until the workbook launches — restore this link then
  // { to: '/pood', key: 'nav.pood' },
  { to: '/broneeri', key: 'nav.broneeri' },
  { to: '/kontakt', key: 'nav.kontakt' },
]
</script>
