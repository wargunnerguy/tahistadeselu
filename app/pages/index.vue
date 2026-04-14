<template>
  <div>
    <!-- ░░ HERO ░░ -->
    <section class="relative h-screen overflow-hidden">
      <!-- Video — does not block render, overlay visible while loading -->
      <video
        class="absolute inset-0 w-full h-full object-cover"
        autoplay
        muted
        loop
        playsinline
        preload="metadata"
      >
        <source src="/video/hero.webm" type="video/webm" />
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/40" />

      <!-- Centered text -->
      <div class="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <p class="text-xs tracking-[0.35em] uppercase text-white/60 mb-6">
          Matusetalituse agentuur
        </p>
        <h1
          class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight text-white tracking-[0.12em] uppercase leading-tight"
        >
          Elu väärib<br />tähistamist
        </h1>
        <p class="mt-8 text-base md:text-lg text-white/75 max-w-md font-light leading-relaxed tracking-wide">
          Me aitame sind lähedase elu tähistada<br class="hidden sm:block" />
          rõõmu ja armastusega.
        </p>
        <NuxtLink
          to="/broneeri"
          class="mt-10 inline-block border border-white/60 text-white text-xs tracking-[0.25em] uppercase px-8 py-3 hover:bg-white hover:text-stone-800 transition-all duration-300"
        >
          Broneeri konsultatsioon
        </NuxtLink>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
        <span class="text-xs tracking-[0.2em] uppercase">Keri alla</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>

    <!-- ░░ VALUE PROPS ░░ -->
    <section class="py-24 px-6 bg-white">
      <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
        <div v-for="prop in valueProps" :key="prop.title" class="flex flex-col items-center gap-5">
          <div class="w-12 h-12 flex items-center justify-center text-stone-400" v-html="prop.icon" />
          <h3 class="text-sm tracking-[0.2em] uppercase text-stone-800 font-light">
            {{ prop.title }}
          </h3>
          <p class="text-stone-500 text-sm leading-relaxed font-light">
            {{ prop.body }}
          </p>
        </div>
      </div>
    </section>

    <!-- ░░ QUOTE BREAK ░░ -->
    <section class="py-20 px-6 bg-stone-50 text-center">
      <blockquote class="max-w-2xl mx-auto text-2xl md:text-3xl font-extralight text-stone-600 leading-relaxed tracking-wide italic">
        „Iga elu on ainulaadne lugu —<br class="hidden sm:block" />
        see väärib kaunist lõpuakkordi."
      </blockquote>
    </section>
  </div>
</template>

<script setup lang="ts">
const valueProps = [
  {
    title: 'Isiklik lähenemine',
    body: 'Iga talitus on ainulaadne nagu inimene ise. Kuulame, mõistame ja loome täpselt selle, mida teie perekond vajab.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" class="w-12 h-12">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>`,
  },
  {
    title: 'Rõõmust kantud',
    body: 'Tähistame elu, mitte ei leina surma. Meie talitused on soojad, kaunid ja täis mälestusi, mis jäävad südamesse.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" class="w-12 h-12">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>`,
  },
  {
    title: 'Kõik ühest kohast',
    body: 'Hoolitseme kõige eest — korraldusest kuni lilledeni. Teie saate olla kohal, mitte muretseda detailide pärast.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" class="w-12 h-12">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>`,
  },
]
</script>
