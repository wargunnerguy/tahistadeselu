<template>
  <div>
    <!-- Page header -->
    <section class="pt-40 pb-20 px-6 bg-stone-50">
      <div class="max-w-3xl mx-auto text-center">
        <p class="text-xs tracking-[0.35em] uppercase text-stone-400 mb-4">{{ $t('teenused.eyebrow') }}</p>
        <h1 class="text-4xl md:text-6xl font-extralight text-stone-800 tracking-[0.08em] uppercase leading-tight">
          {{ titleLine1 }}<br />{{ titleLine2 }}
        </h1>
        <p class="mt-8 text-base text-stone-500 font-light max-w-lg mx-auto leading-relaxed">
          {{ $t('teenused.subtitle') }}
        </p>
        <p class="mt-4 text-base text-stone-500 font-light max-w-lg mx-auto leading-relaxed">
          {{ $t('teenused.subtitle2') }}
        </p>
      </div>
    </section>

    <!-- Services -->
    <section class="py-24 px-6 bg-white">
      <div class="max-w-2xl mx-auto">
        <p class="text-xs tracking-[0.3em] uppercase text-stone-400 mb-16 text-center">
          {{ $t('teenused.services.label') }}
        </p>

        <div class="space-y-20">
          <div v-for="(service, i) in services" :key="i">
            <h2 class="text-xl md:text-2xl font-extralight text-stone-800 tracking-[0.04em] mb-5">
              {{ service.title }}
            </h2>
            <p class="text-stone-500 font-light text-sm leading-relaxed mb-6">
              {{ service.description }}
            </p>

            <template v-if="service.list && service.list.length">
              <p class="text-xs tracking-[0.2em] uppercase text-stone-400 mb-4">
                {{ service.listLabel }}
              </p>
              <p v-if="service.listIntro" class="text-stone-500 font-light text-sm leading-relaxed mb-4">
                {{ service.listIntro }}
              </p>
              <ul class="space-y-3 mb-6">
                <li
                  v-for="(item, j) in service.list"
                  :key="j"
                  class="flex items-start gap-3 text-sm font-light text-stone-500"
                >
                  <span class="mt-0.5 flex-shrink-0 text-stone-300">—</span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </template>

            <p v-if="service.note" class="text-stone-400 font-light text-sm leading-relaxed italic">
              {{ service.note }}
            </p>
          </div>
        </div>

        <div class="mt-20 text-center">
          <p class="text-stone-500 font-light text-sm leading-relaxed mb-6">
            {{ $t('teenused.services.closing') }}
          </p>
          <p class="text-lg md:text-xl font-extralight text-stone-700 italic tracking-wide">
            {{ $t('teenused.services.motto') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section class="py-24 px-6 bg-stone-50">
      <div class="max-w-5xl mx-auto">
        <p class="text-xs tracking-[0.3em] uppercase text-stone-400 mb-8 text-center">
          {{ $t('teenused.pricing.label') }}
        </p>
        <p class="text-stone-500 font-light text-sm leading-relaxed max-w-xl mx-auto text-center mb-16">
          {{ $t('teenused.pricing.intro') }}
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          <div
            v-for="(item, i) in pricingItems"
            :key="i"
            :class="[
              'flex flex-col p-10 h-full transition-shadow duration-300 hover:shadow-xl',
              i === 0 ? 'bg-stone-900' : 'bg-white border border-stone-200 hover:border-stone-400',
            ]"
          >
            <span
              :class="[
                'text-6xl font-extralight tracking-tighter leading-none mb-8',
                i === 0 ? 'text-stone-700' : 'text-stone-200',
              ]"
            >{{ String(i + 1).padStart(2, '0') }}</span>

            <h2
              :class="[
                'text-base tracking-[0.1em] uppercase font-light mb-5 min-h-[48px]',
                i === 0 ? 'text-white' : 'text-stone-800',
              ]"
            >
              {{ item.title }}
            </h2>
            <p
              :class="[
                'text-4xl font-extralight tracking-wide',
                i === 0 ? 'text-white' : 'text-stone-700',
              ]"
            >
              {{ item.price }}
            </p>
            <p v-if="item.priceNote" class="text-xs tracking-[0.15em] uppercase text-stone-400 mt-2">
              {{ item.priceNote }}
            </p>

            <p
              v-if="item.description"
              :class="['font-light text-sm leading-relaxed mt-6', i === 0 ? 'text-stone-300' : 'text-stone-500']"
            >
              {{ item.description }}
            </p>

            <p class="text-xs tracking-[0.2em] uppercase text-stone-400 mt-8 mb-4">
              {{ item.listLabel }}
            </p>
            <ul class="space-y-3 flex-1">
              <li
                v-for="(entry, j) in item.list"
                :key="j"
                :class="['flex items-start gap-3 text-sm font-light', i === 0 ? 'text-stone-300' : 'text-stone-500']"
              >
                <span :class="['mt-0.5 flex-shrink-0', i === 0 ? 'text-stone-600' : 'text-stone-300']">—</span>
                <span>{{ entry }}</span>
              </li>
            </ul>

            <div
              v-if="item.notes && item.notes.length"
              :class="['mt-8 border-t pt-6 space-y-3', i === 0 ? 'border-stone-700' : 'border-stone-100']"
            >
              <p
                v-for="(note, j) in item.notes"
                :key="j"
                class="text-stone-400 font-light text-xs leading-relaxed"
              >
                {{ note }}
              </p>
            </div>

            <NuxtLink
              :to="ctaTargets[i]"
              :class="[
                'mt-10 text-center text-xs tracking-[0.25em] uppercase px-6 py-4 transition-all duration-300',
                i === 0
                  ? 'bg-white text-stone-900 hover:bg-stone-100'
                  : 'border border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-white',
              ]"
            >
              {{ item.cta }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
const { t, tm } = useI18n()

useSeoMeta({
  title: () => t('teenused.seo.title'),
  description: () => t('teenused.seo.description'),
  ogTitle: () => t('teenused.seo.title'),
  ogDescription: () => t('teenused.seo.description'),
  ogImage: 'https://tahistadeselu.ee/og-image.jpg',
})

const titleRaw = computed(() => t('teenused.title'))
const titleLine1 = computed(() => titleRaw.value.split('\n')[0] ?? '')
const titleLine2 = computed(() => titleRaw.value.split('\n')[1] ?? '')

interface ServiceItem {
  title: string
  description: string
  listLabel?: string
  listIntro?: string
  list?: string[]
  note?: string
}

interface PricingItem {
  title: string
  price: string
  priceNote?: string
  description?: string
  listLabel: string
  list: string[]
  notes?: string[]
  cta: string
}

const services = computed(() => tm('teenused.services.items') as ServiceItem[])
const pricingItems = computed(() => tm('teenused.pricing.items') as PricingItem[])

const localePath = useLocalePath()

// Each pricing card pre-selects its matching option on the booking form
const ctaTargets = computed(() => [
  { path: localePath('/broneeri'), query: { type: 'meeting' } },
  { path: localePath('/broneeri'), query: { type: 'plan' } },
  { path: localePath('/broneeri'), query: { type: 'organize' } },
])

</script>
