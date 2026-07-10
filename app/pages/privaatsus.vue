<template>
  <div>
    <!-- Page header -->
    <section class="pt-40 pb-20 px-6 bg-stone-50">
      <div class="max-w-3xl mx-auto text-center">
        <p class="text-xs tracking-[0.35em] uppercase text-stone-400 mb-4">{{ $t('privacy.eyebrow') }}</p>
        <h1 class="text-4xl md:text-6xl font-extralight text-stone-800 tracking-[0.08em] uppercase leading-tight">
          {{ $t('privacy.title') }}
        </h1>
        <p class="mt-8 text-base text-stone-500 font-light max-w-lg mx-auto leading-relaxed">
          {{ $t('privacy.intro') }}
        </p>
      </div>
    </section>

    <!-- Sections -->
    <section class="py-24 px-6 bg-white">
      <div class="max-w-2xl mx-auto space-y-14">
        <div v-for="(section, i) in sections" :key="i">
          <h2 class="text-sm tracking-[0.2em] uppercase text-stone-800 font-light mb-4">
            {{ section.title }}
          </h2>
          <p class="text-stone-500 font-light leading-relaxed text-sm">
            {{ section.body }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t, tm } = useI18n()

useSeoMeta({
  title: () => t('privacy.seo.title'),
  description: () => t('privacy.seo.description'),
  ogTitle: () => t('privacy.seo.title'),
  ogDescription: () => t('privacy.seo.description'),
  robots: 'noindex, follow',
})

const sections = computed(() => tm('privacy.sections') as Array<{ title: string; body: string }>)
</script>
