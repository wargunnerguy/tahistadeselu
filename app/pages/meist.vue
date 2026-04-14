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
        <p class="text-stone-500 font-light leading-relaxed text-base mb-6">
          {{ $t('meist.story.body1') }}
        </p>
        <p class="text-stone-500 font-light leading-relaxed text-base">
          {{ $t('meist.story.body2') }}
        </p>
      </div>
    </section>

    <!-- Divider -->
    <div class="max-w-2xl mx-auto px-6">
      <div class="border-t border-stone-100" />
    </div>

    <!-- Who we are -->
    <section class="py-24 px-6 bg-white">
      <div class="max-w-4xl mx-auto">
        <p class="text-xs tracking-[0.3em] uppercase text-stone-400 mb-16 text-center">{{ $t('meist.team.label') }}</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h3 class="text-sm tracking-[0.2em] uppercase text-stone-800 font-light mb-5">
              {{ $t('meist.team.founderName') }}
            </h3>
            <p class="text-stone-500 font-light leading-relaxed text-sm">
              {{ $t('meist.team.founderBio') }}
            </p>
          </div>
          <div>
            <h3 class="text-sm tracking-[0.2em] uppercase text-stone-800 font-light mb-5">
              {{ $t('meist.team.valuesTitle') }}
            </h3>
            <ul class="space-y-4 text-stone-500 font-light text-sm">
              <li
                v-for="(val, i) in values"
                :key="i"
                class="flex items-start gap-3"
              >
                <span class="text-stone-300 mt-0.5">—</span>
                <span>{{ val }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 px-6 bg-stone-50 text-center">
      <p class="text-xs tracking-[0.35em] uppercase text-stone-400 mb-6">{{ $t('meist.cta.eyebrow') }}</p>
      <h2 class="text-2xl md:text-3xl font-extralight text-stone-700 mb-10 tracking-wide">
        {{ $t('meist.cta.title') }}
      </h2>
      <NuxtLink
        :to="localePath('/broneeri')"
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

const titleRaw = computed(() => t('meist.title'))
const titleLine1 = computed(() => titleRaw.value.split('\n')[0] ?? '')
const titleLine2 = computed(() => titleRaw.value.split('\n')[1] ?? '')

const values = computed(() => tm('meist.team.values') as string[])
</script>
