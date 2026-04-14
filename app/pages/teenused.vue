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
      </div>
    </section>

    <!-- Packages -->
    <section class="py-24 px-6 bg-white">
      <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div
          v-for="pkg in packages"
          :key="pkg.slug"
          :class="[
            'flex flex-col border p-10 transition-shadow duration-300 hover:shadow-lg',
            pkg.featured ? 'border-stone-800 bg-stone-800 text-white' : 'border-stone-200 bg-white',
          ]"
        >
          <!-- Badge row -->
          <div class="mb-6 min-h-[20px]">
            <span
              v-if="pkg.badge"
              class="text-xs tracking-[0.25em] uppercase text-stone-400"
            >{{ pkg.badge }}</span>
            <span
              v-else-if="pkg.label"
              :class="['text-xs tracking-[0.2em] uppercase', pkg.featured ? 'text-stone-400' : 'text-stone-400']"
            >{{ pkg.label }}</span>
          </div>

          <!-- Name + tagline -->
          <h2
            :class="['text-lg tracking-[0.15em] uppercase font-light mb-1', pkg.featured ? 'text-white' : 'text-stone-800']"
          >
            {{ pkg.name }}
          </h2>
          <p :class="['text-xs tracking-[0.15em] uppercase mb-6', pkg.featured ? 'text-stone-500' : 'text-stone-400']">
            {{ pkg.tagline }}
          </p>

          <p :class="['text-sm font-light leading-relaxed mb-8 flex-1', pkg.featured ? 'text-stone-300' : 'text-stone-500']">
            {{ pkg.description }}
          </p>

          <!-- Includes -->
          <ul class="space-y-3 mb-10">
            <li
              v-for="(item, i) in pkg.includes"
              :key="i"
              :class="['flex items-start gap-3 text-sm font-light', pkg.featured ? 'text-stone-300' : 'text-stone-500']"
            >
              <span :class="['mt-0.5 flex-shrink-0', pkg.featured ? 'text-stone-500' : 'text-stone-300']">—</span>
              <span>{{ item }}</span>
            </li>
          </ul>

          <!-- Price -->
          <div :class="['mb-8 border-t pt-8', pkg.featured ? 'border-stone-600' : 'border-stone-100']">
            <p :class="['text-xs tracking-[0.2em] uppercase mb-1', 'text-stone-400']">{{ $t('teenused.fromPrice') }}</p>
            <p :class="['text-3xl font-extralight tracking-wide', pkg.featured ? 'text-white' : 'text-stone-800']">
              {{ pkg.price }}
            </p>
          </div>

          <!-- CTA -->
          <NuxtLink
            :to="localePath('/broneeri')"
            :class="[
              'text-center text-xs tracking-[0.25em] uppercase px-6 py-3 transition-all duration-300',
              pkg.featured
                ? 'bg-white text-stone-800 hover:bg-stone-100'
                : 'border border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-white',
            ]"
          >
            {{ $t('teenused.bookBtn') }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Note -->
    <section class="py-16 px-6 bg-stone-50 text-center">
      <p class="text-stone-400 font-light text-sm max-w-xl mx-auto leading-relaxed">
        {{ $t('teenused.note') }}
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t, tm } = useI18n()
const localePath = useLocalePath()

const titleRaw = computed(() => t('teenused.title'))
const titleLine1 = computed(() => titleRaw.value.split('\n')[0] ?? '')
const titleLine2 = computed(() => titleRaw.value.split('\n')[1] ?? '')

const packages = computed(() => [
  {
    slug: 'saatmine',
    name: t('teenused.packages.saatmine.name'),
    tagline: t('teenused.packages.saatmine.tagline'),
    description: t('teenused.packages.saatmine.description'),
    price: t('teenused.packages.saatmine.price'),
    includes: tm('teenused.packages.saatmine.includes') as string[],
    featured: false,
    badge: null,
    label: null,
  },
  {
    slug: 'malestus',
    name: t('teenused.packages.malestus.name'),
    tagline: t('teenused.packages.malestus.tagline'),
    description: t('teenused.packages.malestus.description'),
    price: t('teenused.packages.malestus.price'),
    includes: tm('teenused.packages.malestus.includes') as string[],
    featured: true,
    badge: t('teenused.popularBadge'),
    label: null,
  },
  {
    slug: 'parand',
    name: t('teenused.packages.parand.name'),
    tagline: t('teenused.packages.parand.tagline'),
    description: t('teenused.packages.parand.description'),
    price: t('teenused.packages.parand.price'),
    includes: tm('teenused.packages.parand.includes') as string[],
    featured: false,
    badge: null,
    label: t('teenused.premiumLabel'),
  },
])
</script>
