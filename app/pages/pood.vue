<template>
  <div>
    <!-- Page header -->
    <section class="pt-40 pb-20 px-6 bg-stone-50">
      <div class="max-w-3xl mx-auto text-center">
        <p class="text-xs tracking-[0.35em] uppercase text-stone-400 mb-4">{{ $t('pood.eyebrow') }}</p>
        <h1 class="text-4xl md:text-6xl font-extralight text-stone-800 tracking-[0.08em] uppercase leading-tight">
          {{ titleLine1 }}<br />{{ titleLine2 }}
        </h1>
        <p class="mt-8 text-base text-stone-500 font-light max-w-lg mx-auto leading-relaxed">
          {{ $t('pood.subtitle') }}
        </p>
      </div>
    </section>

    <!-- What is it -->
    <section class="py-24 px-6 bg-white">
      <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <!-- Text -->
        <div>
          <p class="text-xs tracking-[0.3em] uppercase text-stone-400 mb-8">{{ $t('pood.whatLabel') }}</p>
          <p class="text-2xl md:text-3xl font-extralight text-stone-700 leading-relaxed mb-8">
            {{ $t('pood.whatLead') }}
          </p>
          <p class="text-stone-500 font-light leading-relaxed text-base">
            {{ $t('pood.whatBody') }}
          </p>
        </div>
        <!-- Visual placeholder — replace with actual product image -->
        <div class="aspect-[3/4] bg-stone-100 flex items-center justify-center">
          <div class="text-center px-8">
            <div class="w-16 h-16 mx-auto mb-6 text-stone-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <p class="text-xs tracking-[0.2em] uppercase text-stone-400 font-light">Minu Lugu</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Chapters -->
    <section class="py-24 px-6 bg-stone-50">
      <div class="max-w-4xl mx-auto">
        <p class="text-xs tracking-[0.3em] uppercase text-stone-400 mb-16 text-center">{{ $t('pood.chaptersLabel') }}</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <div
            v-for="(ch, i) in chapters"
            :key="i"
            class="flex flex-col gap-3"
          >
            <span class="text-xs tracking-[0.2em] uppercase text-stone-300 font-light">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3 class="text-sm tracking-[0.15em] uppercase text-stone-800 font-light">{{ ch.title }}</h3>
            <p class="text-xs text-stone-400 font-light leading-relaxed">{{ ch.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Specs + Price + Packages -->
    <section class="py-24 px-6 bg-white">
      <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">

        <!-- Specs -->
        <div>
          <p class="text-xs tracking-[0.3em] uppercase text-stone-400 mb-8">{{ $t('pood.specLabel') }}</p>
          <ul class="space-y-4">
            <li
              v-for="(spec, i) in specs"
              :key="i"
              class="flex items-start gap-3 text-sm font-light text-stone-500"
            >
              <span class="text-stone-300 mt-0.5 flex-shrink-0">—</span>
              <span>{{ spec }}</span>
            </li>
          </ul>
        </div>

        <!-- Price -->
        <div class="flex flex-col justify-between">
          <div>
            <p class="text-xs tracking-[0.3em] uppercase text-stone-400 mb-4">{{ $t('pood.specLabel') }}</p>
            <p class="text-4xl font-extralight text-stone-800 tracking-wide mb-3">{{ $t('pood.price') }}</p>
            <p class="text-xs text-stone-400 font-light">{{ $t('pood.priceNote') }}</p>
          </div>
          <div class="mt-10">
            <a
              href="#telli"
              class="inline-block border border-stone-800 text-stone-800 text-xs tracking-[0.25em] uppercase px-8 py-3 hover:bg-stone-800 hover:text-white transition-all duration-300"
            >
              {{ $t('pood.buyBtn') }}
            </a>
            <p class="mt-4 text-xs text-stone-400 font-light leading-relaxed">{{ $t('pood.buyNote') }}</p>
          </div>
        </div>

        <!-- Included in packages -->
        <div>
          <p class="text-xs tracking-[0.3em] uppercase text-stone-400 mb-8">{{ $t('pood.packagesLabel') }}</p>
          <div class="space-y-4">
            <div
              v-for="pkg in inPackages"
              :key="pkg"
              class="border border-stone-200 px-5 py-4"
            >
              <p class="text-sm tracking-[0.1em] uppercase text-stone-700 font-light">{{ pkg }}</p>
            </div>
          </div>
          <NuxtLink
            :to="localePath('/teenused')"
            class="mt-8 inline-block text-xs tracking-[0.2em] uppercase text-stone-400 hover:text-stone-800 transition-colors underline underline-offset-4"
          >
            {{ $t('nav.teenused') }} →
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Order form -->
    <section id="telli" class="py-24 px-6 bg-stone-50">
      <div class="max-w-xl mx-auto">
        <p class="text-xs tracking-[0.35em] uppercase text-stone-400 mb-4 text-center">{{ $t('pood.orderLabel') }}</p>
        <h2 class="text-3xl md:text-4xl font-extralight text-stone-800 tracking-wide uppercase mb-4 text-center">
          {{ $t('pood.orderTitle') }}
        </h2>
        <p class="text-stone-500 font-light text-sm text-center mb-16">{{ $t('pood.orderSubtitle') }}</p>

        <!-- Success -->
        <div v-if="status === 'success'" class="text-center py-10">
          <p class="text-xs tracking-[0.3em] uppercase text-stone-400 mb-4">{{ $t('pood.form.successEyebrow') }}</p>
          <h3 class="text-xl font-extralight text-stone-700 mb-4 tracking-wide">{{ $t('pood.form.successTitle') }}</h3>
          <p class="text-stone-500 font-light text-sm">{{ $t('pood.form.successBody') }}</p>
        </div>

        <form v-else class="space-y-10" @submit.prevent="submit">
          <div>
            <label class="block text-xs tracking-[0.2em] uppercase text-stone-400 mb-3">{{ $t('pood.form.name') }}</label>
            <input
              v-model="form.nimi"
              type="text"
              required
              :placeholder="$t('pood.form.namePlaceholder')"
              class="w-full border-b border-stone-200 bg-transparent py-3 text-stone-800 placeholder-stone-300 focus:outline-none focus:border-stone-600 transition-colors text-sm"
            />
          </div>

          <div>
            <label class="block text-xs tracking-[0.2em] uppercase text-stone-400 mb-3">{{ $t('pood.form.email') }}</label>
            <input
              v-model="form.epost"
              type="email"
              required
              :placeholder="$t('pood.form.emailPlaceholder')"
              class="w-full border-b border-stone-200 bg-transparent py-3 text-stone-800 placeholder-stone-300 focus:outline-none focus:border-stone-600 transition-colors text-sm"
            />
          </div>

          <div>
            <label class="block text-xs tracking-[0.2em] uppercase text-stone-400 mb-3">{{ $t('pood.form.qty') }}</label>
            <select
              v-model="form.kogus"
              class="w-full border-b border-stone-200 bg-transparent py-3 text-stone-800 focus:outline-none focus:border-stone-600 transition-colors text-sm"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
          </div>

          <p v-if="status === 'error'" class="text-red-400 text-xs tracking-wide">
            {{ $t('pood.form.error') }}
          </p>

          <button
            type="submit"
            :disabled="status === 'sending'"
            class="w-full border border-stone-800 text-stone-800 text-xs tracking-[0.25em] uppercase py-4 hover:bg-stone-800 hover:text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {{ status === 'sending' ? $t('pood.form.sending') : $t('pood.form.submit') }}
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t, tm } = useI18n()
const localePath = useLocalePath()

const titleRaw = computed(() => t('pood.title'))
const titleLine1 = computed(() => titleRaw.value.split('\n')[0] ?? '')
const titleLine2 = computed(() => titleRaw.value.split('\n')[1] ?? '')

const chapters = computed(() => tm('pood.chapters') as Array<{ title: string; desc: string }>)
const specs = computed(() => tm('pood.specs') as string[])
const inPackages = computed(() => tm('pood.inPackages') as string[])

const form = reactive({ nimi: '', epost: '', kogus: '1' })
const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')

async function submit() {
  const url = import.meta.env.VITE_APPS_SCRIPT_URL
  if (!url || url === 'your_url_here') {
    status.value = 'error'
    return
  }
  status.value = 'sending'
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ type: 'paeviku-tellimus', ...form }),
    })
    const json = await res.json()
    if (!json.success) throw new Error(json.error || 'server error')
    status.value = 'success'
  } catch {
    status.value = 'error'
  }
}
</script>
