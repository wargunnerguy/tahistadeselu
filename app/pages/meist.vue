<template>
  <div>
    <!-- Page header -->
    <section class="pt-40 pb-20 px-6 bg-stone-50">
      <div class="max-w-3xl mx-auto text-center">
        <p class="text-xs tracking-[0.35em] uppercase text-stone-400 mb-4">{{ $t('meist.eyebrow') }}</p>
        <h1 class="text-4xl md:text-6xl font-extralight text-stone-800 tracking-[0.08em] uppercase leading-tight">
          {{ titleLine1 }}<br />{{ titleLine2 }}
        </h1>
      </div>
    </section>

    <!-- Story -->
    <section class="py-24 px-6 bg-white">
      <div class="max-w-2xl mx-auto">
        <p class="text-xs tracking-[0.3em] uppercase text-stone-400 mb-8">{{ $t('meist.story.label') }}</p>
        <p class="text-2xl md:text-3xl font-extralight text-stone-700 leading-relaxed mb-10">
          {{ $t('meist.story.lead') }}
        </p>
        <p
          v-for="(paragraph, i) in paragraphs"
          :key="i"
          class="text-stone-500 font-light leading-relaxed text-base mb-6 last:mb-0"
        >
          {{ paragraph }}
        </p>

        <!-- Signature -->
        <div class="mt-14 flex items-center gap-5">
          <img
            v-if="founderPhoto"
            :src="founderPhoto"
            :alt="$t('meist.signature.role')"
            class="w-16 h-16 rounded-full object-cover"
            loading="lazy"
          />
          <div>
            <p class="text-sm text-stone-700 font-light tracking-wide">— {{ $t('meist.signature.role') }}</p>
            <p class="text-xs text-stone-400 font-light mt-1 tracking-wide">{{ $t('meist.signature.detail') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Divider -->
    <div class="max-w-2xl mx-auto px-6">
      <div class="border-t border-stone-100" />
    </div>

    <!-- Our symbol -->
    <section class="py-24 px-6 bg-white">
      <div class="max-w-2xl mx-auto text-center">
        <p class="text-xs tracking-[0.3em] uppercase text-stone-400 mb-8">{{ $t('meist.symbol.label') }}</p>
        <img
          :src="`${baseURL}logo.png`"
          :alt="$t('meist.symbol.title')"
          class="mx-auto mb-8 w-40 md:w-52"
          loading="lazy"
        />
        <h2 class="text-2xl md:text-3xl font-extralight text-stone-700 tracking-wide mb-8">
          {{ $t('meist.symbol.title') }}
        </h2>
        <p class="text-stone-500 font-light leading-relaxed text-base">
          {{ $t('meist.symbol.text') }}
        </p>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 px-6 bg-stone-50 text-center">
      <p class="text-xs tracking-[0.35em] uppercase text-stone-400 mb-6">{{ $t('meist.cta.eyebrow') }}</p>
      <h2 class="text-2xl md:text-3xl font-extralight text-stone-700 mb-10 tracking-wide">
        {{ $t('meist.cta.title') }}
      </h2>
      <NuxtLink
        :to="{ path: localePath('/broneeri'), query: { type: 'meeting' } }"
        class="inline-block border border-stone-800 text-stone-800 text-xs tracking-[0.25em] uppercase px-8 py-3 hover:bg-stone-800 hover:text-white transition-all duration-300"
      >
        {{ $t('meist.cta.button') }}
      </NuxtLink>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t, tm } = useI18n()
const localePath = useLocalePath()
const { app: { baseURL } } = useRuntimeConfig()

// Set to e.g. `${baseURL}images/asutaja.jpg` once the founder photo is added to public/images/
const founderPhoto = ''

useSeoMeta({
  title: () => t('meist.seo.title'),
  description: () => t('meist.seo.description'),
  ogTitle: () => t('meist.seo.title'),
  ogDescription: () => t('meist.seo.description'),
  ogImage: 'https://tahistadeselu.ee/og-image.jpg',
})

const titleRaw = computed(() => t('meist.title'))
const titleLine1 = computed(() => titleRaw.value.split('\n')[0] ?? '')
const titleLine2 = computed(() => titleRaw.value.split('\n')[1] ?? '')

const paragraphs = computed(() => tm('meist.story.paragraphs') as string[])
</script>
