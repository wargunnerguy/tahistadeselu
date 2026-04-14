<template>
  <div>

    <!-- ░░ 1. HERO ░░ -->
    <section class="relative h-screen overflow-hidden">
      <!-- Placeholder: 240p, loads instantly, blurred while HD loads -->
      <video
        ref="placeholderRef"
        class="absolute inset-0 w-full h-full object-cover"
        :class="hdReady ? 'opacity-0' : 'opacity-100'"
        style="filter: blur(8px); transform: scale(1.05);"
        autoplay
        loop
        muted
        playsinline
        preload="auto"
      >
        <source :src="v('placeholder-final.mp4')" type="video/mp4" />
      </video>

      <!-- HD video: preloads hidden, swaps in when ready -->
      <video
        ref="hdRef"
        class="absolute inset-0 w-full h-full object-cover"
        :class="hdReady ? 'opacity-100' : 'opacity-0'"
        autoplay
        loop
        muted
        playsinline
        preload="auto"
        @canplaythrough="onHdReady"
      >
        <source :src="v('hero.webm')" type="video/webm" />
        <source :src="v('hero-web.mp4')" type="video/mp4" />
      </video>

      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/45" />

      <!-- Centered text -->
      <div class="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <p class="text-xs tracking-[0.35em] uppercase text-white/60 mb-6">
          {{ $t('home.eyebrow') }}
        </p>
        <h1 class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight text-white tracking-[0.12em] uppercase leading-tight">
          {{ titleLine1 }}<br />{{ titleLine2 }}
        </h1>
        <p class="mt-8 text-base md:text-lg text-white/75 max-w-md font-light leading-relaxed tracking-wide">
          {{ $t('home.subtitle') }}
        </p>
        <NuxtLink
          :to="localePath('/broneeri')"
          class="mt-10 inline-block border border-white/60 text-white text-xs tracking-[0.25em] uppercase px-8 py-3 hover:bg-white hover:text-stone-800 transition-all duration-300"
        >
          {{ $t('home.cta') }}
        </NuxtLink>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span class="text-xs tracking-[0.2em] uppercase">{{ $t('home.scroll') }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>

    <!-- ░░ 2. THE SHIFT ░░ -->
    <section class="py-32 px-6 bg-stone-900">
      <div class="max-w-3xl mx-auto text-center">
        <p data-reveal class="text-xs tracking-[0.35em] uppercase text-stone-500 mb-8">
          {{ $t('home.shift.eyebrow') }}
        </p>
        <h2 data-reveal data-delay="150" class="text-3xl md:text-5xl font-extralight text-white tracking-[0.04em] leading-snug mb-10">
          {{ $t('home.shift.question') }}
        </h2>
        <p data-reveal data-delay="280" class="text-stone-400 font-light text-base md:text-lg leading-relaxed">
          {{ $t('home.shift.body') }}
        </p>
      </div>
    </section>

    <!-- ░░ 3. WHAT WE DO — value props ░░ -->
    <section class="py-32 px-6 bg-white">
      <div class="max-w-5xl mx-auto">
        <p data-reveal class="text-xs tracking-[0.35em] uppercase text-stone-400 mb-20 text-center">
          {{ $t('home.whatLabel') }}
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          <div
            v-for="(prop, i) in valueProps"
            :key="prop.titleKey"
            data-reveal
            :data-delay="i * 150"
            class="flex flex-col items-center gap-5"
          >
            <div class="w-12 h-12 flex items-center justify-center text-stone-400" v-html="prop.icon" />
            <h3 class="text-sm tracking-[0.2em] uppercase text-stone-800 font-light">
              {{ $t(prop.titleKey) }}
            </h3>
            <p class="text-stone-500 text-sm leading-relaxed font-light">
              {{ $t(prop.bodyKey) }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ░░ 4. HOW IT WORKS ░░ -->
    <section class="py-32 px-6 bg-stone-50">
      <div class="max-w-4xl mx-auto">
        <p data-reveal class="text-xs tracking-[0.35em] uppercase text-stone-400 mb-20 text-center">
          {{ $t('home.howLabel') }}
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div
            v-for="(step, i) in steps"
            :key="i"
            data-reveal
            :data-delay="i * 200"
            class="flex flex-col gap-5"
          >
            <span class="text-6xl font-extralight text-stone-200 tracking-tighter leading-none">{{ step.num }}</span>
            <h3 class="text-sm tracking-[0.2em] uppercase text-stone-800 font-light">{{ step.title }}</h3>
            <p class="text-stone-500 font-light text-sm leading-relaxed">{{ step.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ░░ 5. PACKAGES TEASER ░░ -->
    <section class="py-32 px-6 bg-white">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-20">
          <p data-reveal class="text-xs tracking-[0.35em] uppercase text-stone-400 mb-4">
            {{ $t('home.packagesTeaser.label') }}
          </p>
          <h2 data-reveal data-delay="150" class="text-3xl md:text-5xl font-extralight text-stone-800 tracking-[0.04em]">
            {{ $t('home.packagesTeaser.title') }}
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div
            v-for="(pkg, i) in packageTeasers"
            :key="pkg.slug"
            data-reveal
            :data-delay="i * 130"
            class="border border-stone-200 p-10 group hover:border-stone-500 transition-colors duration-300 cursor-default"
          >
            <p class="text-xs tracking-[0.2em] uppercase text-stone-400 mb-4">{{ pkg.tagline }}</p>
            <h3 class="text-xl tracking-[0.1em] uppercase font-light text-stone-800 mb-8">{{ pkg.name }}</h3>
            <p class="text-3xl font-extralight text-stone-700 tracking-wide">{{ pkg.price }}</p>
          </div>
        </div>

        <div data-reveal class="text-center">
          <NuxtLink
            :to="localePath('/teenused')"
            class="inline-block border border-stone-800 text-stone-800 text-xs tracking-[0.25em] uppercase px-8 py-3 hover:bg-stone-800 hover:text-white transition-all duration-300"
          >
            {{ $t('home.packagesTeaser.link') }} →
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ░░ 6. WORKBOOK TEASER ░░ -->
    <section class="py-32 px-6 bg-stone-900">
      <div class="max-w-2xl mx-auto text-center">
        <p data-reveal class="text-xs tracking-[0.35em] uppercase text-stone-500 mb-8">
          {{ $t('home.workbookTeaser.label') }}
        </p>
        <h2 data-reveal data-delay="150" class="text-3xl md:text-5xl font-extralight text-white tracking-[0.04em] leading-snug mb-10">
          {{ $t('home.workbookTeaser.title') }}
        </h2>
        <p data-reveal data-delay="280" class="text-stone-400 font-light text-base leading-relaxed mb-12">
          {{ $t('home.workbookTeaser.body') }}
        </p>
        <NuxtLink
          data-reveal
          data-delay="380"
          :to="localePath('/pood')"
          class="inline-block border border-white/40 text-white text-xs tracking-[0.25em] uppercase px-8 py-3 hover:bg-white hover:text-stone-800 transition-all duration-300"
        >
          {{ $t('home.workbookTeaser.link') }} →
        </NuxtLink>
      </div>
    </section>

    <!-- ░░ 7. QUOTE ░░ -->
    <section class="py-24 px-6 bg-stone-50 text-center">
      <blockquote data-reveal class="max-w-2xl mx-auto text-2xl md:text-3xl font-extralight text-stone-600 leading-relaxed tracking-wide italic">
        {{ $t('home.quote') }}
      </blockquote>
    </section>

    <!-- ░░ 8. FINAL CTA ░░ -->
    <section class="py-36 px-6 bg-stone-900 text-center">
      <div class="max-w-2xl mx-auto">
        <p data-reveal class="text-xs tracking-[0.35em] uppercase text-stone-500 mb-8">
          {{ $t('home.finalCta.eyebrow') }}
        </p>
        <h2 data-reveal data-delay="150" class="text-3xl md:text-5xl font-extralight text-white tracking-[0.04em] leading-snug mb-14">
          {{ $t('home.finalCta.title') }}
        </h2>
        <NuxtLink
          data-reveal
          data-delay="280"
          :to="localePath('/broneeri')"
          class="inline-block bg-white text-stone-900 text-xs tracking-[0.3em] uppercase px-12 py-4 hover:bg-stone-100 transition-colors duration-300 mb-14"
        >
          {{ $t('home.finalCta.btn') }}
        </NuxtLink>
        <div data-reveal data-delay="380" class="flex items-center justify-center gap-8 text-stone-500 text-sm font-light">
          <a href="tel:+37200000000" class="hover:text-white transition-colors duration-200">+372 000 0000</a>
          <span class="text-stone-700">—</span>
          <a href="mailto:info@tahistadeselu.ee" class="hover:text-white transition-colors duration-200">info@tahistadeselu.ee</a>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
const { t, tm } = useI18n()
const localePath = useLocalePath()
const { app: { baseURL } } = useRuntimeConfig()
const v = (file: string) => `${baseURL}video/${file}`

useScrollReveal()

// Hero video swap
const placeholderRef = ref<HTMLVideoElement | null>(null)
const hdRef = ref<HTMLVideoElement | null>(null)
const hdReady = ref(false)

function onHdReady() {
  hdRef.value?.play()
  hdReady.value = true
}

// Hero title split
const titleRaw = computed(() => t('home.title'))
const titleLine1 = computed(() => titleRaw.value.split('\n')[0] ?? '')
const titleLine2 = computed(() => titleRaw.value.split('\n')[1] ?? '')

// Value props (section 3)
const valueProps = [
  {
    titleKey: 'home.values.personal.title',
    bodyKey: 'home.values.personal.body',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" class="w-12 h-12"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>`,
  },
  {
    titleKey: 'home.values.joyful.title',
    bodyKey: 'home.values.joyful.body',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" class="w-12 h-12"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>`,
  },
  {
    titleKey: 'home.values.fullService.title',
    bodyKey: 'home.values.fullService.body',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" class="w-12 h-12"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>`,
  },
]

// How it works steps (section 4)
const steps = computed(() => tm('home.steps') as Array<{ num: string; title: string; body: string }>)

// Package teasers (section 5) — pulls from existing teenused keys
const packageTeasers = computed(() => [
  {
    slug: 'saatmine',
    name: t('teenused.packages.saatmine.name'),
    tagline: t('teenused.packages.saatmine.tagline'),
    price: t('teenused.packages.saatmine.price'),
  },
  {
    slug: 'malestus',
    name: t('teenused.packages.malestus.name'),
    tagline: t('teenused.packages.malestus.tagline'),
    price: t('teenused.packages.malestus.price'),
  },
  {
    slug: 'parand',
    name: t('teenused.packages.parand.name'),
    tagline: t('teenused.packages.parand.tagline'),
    price: t('teenused.packages.parand.price'),
  },
])
</script>
