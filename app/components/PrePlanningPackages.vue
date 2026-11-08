<template>
  <div class="max-w-5xl mx-auto">
    <div class="text-center mb-20">
      <p data-reveal class="text-xs tracking-[0.35em] uppercase text-stone-400 mb-4">
        {{ $t('teenused.prePlanning.label') }}
      </p>
      <h2 data-reveal data-delay="150" class="text-3xl md:text-5xl font-extralight text-stone-800 tracking-[0.04em] leading-snug max-w-3xl mx-auto">
        {{ $t('teenused.prePlanning.title') }}
      </h2>
      <p data-reveal data-delay="250" class="mt-6 text-xs tracking-[0.3em] uppercase text-stone-400">
        {{ $t('teenused.prePlanning.subtitle') }}
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
      <div
        v-for="(pkg, i) in packages"
        :key="pkg.id"
        data-reveal
        :data-delay="i * 130"
        class="flex flex-col p-10 h-full bg-white border border-stone-200 hover:border-stone-400 hover:shadow-xl transition-all duration-300"
      >
        <span class="text-6xl font-extralight tracking-tighter leading-none mb-8 text-stone-200">
          {{ String(i + 1).padStart(2, '0') }}
        </span>
        <h3 class="text-base tracking-[0.1em] uppercase font-light text-stone-800 mb-5 min-h-[48px]">
          {{ pkg.title }}
        </h3>
        <p class="text-4xl font-extralight tracking-wide text-stone-700">{{ pkg.price }}</p>

        <p class="font-light text-sm leading-relaxed mt-6 text-stone-500 italic">{{ pkg.fit }}</p>

        <p class="text-xs tracking-[0.2em] uppercase text-stone-400 mt-8 mb-4">
          {{ $t('teenused.prePlanning.listLabel') }}
        </p>
        <ul class="space-y-3 flex-1">
          <li
            v-for="(entry, j) in pkg.list"
            :key="j"
            class="flex items-start gap-3 text-sm font-light text-stone-500"
          >
            <span class="mt-0.5 flex-shrink-0 text-stone-300">—</span>
            <span>{{ entry }}</span>
          </li>
        </ul>

        <NuxtLink
          :to="{ path: localePath('/broneeri'), query: { type: 'plan', package: pkg.id } }"
          class="mt-10 text-center text-xs tracking-[0.25em] uppercase px-6 py-4 border border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-white transition-all duration-300"
        >
          {{ $t('teenused.prePlanning.cta') }}
        </NuxtLink>
      </div>
    </div>

    <div data-reveal class="mt-14 max-w-2xl mx-auto text-center space-y-3">
      <p
        v-for="(note, i) in sharedNotes"
        :key="i"
        class="text-stone-500 font-light text-sm leading-relaxed"
      >
        {{ note }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface PrePlanningPackage {
  id: string
  title: string
  price: string
  fit: string
  list: string[]
}

const { tm } = useI18n()
const localePath = useLocalePath()

const packages = computed(() => tm('teenused.prePlanning.packages') as PrePlanningPackage[])
const sharedNotes = computed(() => tm('teenused.prePlanning.notes') as string[])
</script>
