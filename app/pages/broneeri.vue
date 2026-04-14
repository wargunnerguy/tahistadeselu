<template>
  <div>
    <!-- Page header -->
    <section class="pt-40 pb-20 px-6 bg-stone-50">
      <div class="max-w-3xl mx-auto text-center">
        <p class="text-xs tracking-[0.35em] uppercase text-stone-400 mb-4">{{ $t('broneeri.eyebrow') }}</p>
        <h1 class="text-4xl md:text-6xl font-extralight text-stone-800 tracking-[0.08em] uppercase leading-tight">
          {{ $t('broneeri.title') }}
        </h1>
        <p class="mt-8 text-base text-stone-500 font-light max-w-lg mx-auto leading-relaxed">
          {{ $t('broneeri.subtitle') }}
        </p>
      </div>
    </section>

    <!-- Form -->
    <section class="py-24 px-6 bg-white">
      <div class="max-w-xl mx-auto">

        <!-- Success -->
        <div v-if="status === 'success'" class="text-center py-16">
          <p class="text-xs tracking-[0.3em] uppercase text-stone-400 mb-4">{{ $t('broneeri.form.successEyebrow') }}</p>
          <h2 class="text-2xl font-extralight text-stone-700 mb-6 tracking-wide">
            {{ $t('broneeri.form.successTitle') }}
          </h2>
          <p class="text-stone-500 font-light text-sm leading-relaxed">
            {{ $t('broneeri.form.successBody') }}
          </p>
        </div>

        <form v-else class="space-y-10" @submit.prevent="submit">

          <div>
            <label class="block text-xs tracking-[0.2em] uppercase text-stone-400 mb-3">{{ $t('broneeri.form.name') }}</label>
            <input
              v-model="form.nimi"
              type="text"
              required
              :placeholder="$t('broneeri.form.namePlaceholder')"
              class="w-full border-b border-stone-200 bg-transparent py-3 text-stone-800 placeholder-stone-300 focus:outline-none focus:border-stone-600 transition-colors text-sm"
            />
          </div>

          <div>
            <label class="block text-xs tracking-[0.2em] uppercase text-stone-400 mb-3">{{ $t('broneeri.form.email') }}</label>
            <input
              v-model="form.epost"
              type="email"
              required
              :placeholder="$t('broneeri.form.emailPlaceholder')"
              class="w-full border-b border-stone-200 bg-transparent py-3 text-stone-800 placeholder-stone-300 focus:outline-none focus:border-stone-600 transition-colors text-sm"
            />
          </div>

          <div>
            <label class="block text-xs tracking-[0.2em] uppercase text-stone-400 mb-3">{{ $t('broneeri.form.phone') }}</label>
            <input
              v-model="form.telefon"
              type="tel"
              :placeholder="$t('broneeri.form.phonePlaceholder')"
              class="w-full border-b border-stone-200 bg-transparent py-3 text-stone-800 placeholder-stone-300 focus:outline-none focus:border-stone-600 transition-colors text-sm"
            />
          </div>

          <div>
            <label class="block text-xs tracking-[0.2em] uppercase text-stone-400 mb-3">{{ $t('broneeri.form.date') }}</label>
            <input
              v-model="form.kuupaev"
              type="date"
              class="w-full border-b border-stone-200 bg-transparent py-3 text-stone-800 placeholder-stone-300 focus:outline-none focus:border-stone-600 transition-colors text-sm"
            />
          </div>

          <div>
            <label class="block text-xs tracking-[0.2em] uppercase text-stone-400 mb-3">{{ $t('broneeri.form.info') }}</label>
            <textarea
              v-model="form.lisainfo"
              rows="4"
              :placeholder="$t('broneeri.form.infoPlaceholder')"
              class="w-full border-b border-stone-200 bg-transparent py-3 text-stone-800 placeholder-stone-300 focus:outline-none focus:border-stone-600 transition-colors text-sm resize-none"
            />
          </div>

          <p v-if="status === 'error'" class="text-red-400 text-xs tracking-wide">
            {{ $t('broneeri.form.error') }}
          </p>

          <button
            type="submit"
            :disabled="status === 'sending'"
            class="w-full border border-stone-800 text-stone-800 text-xs tracking-[0.25em] uppercase py-4 hover:bg-stone-800 hover:text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {{ status === 'sending' ? $t('broneeri.form.sending') : $t('broneeri.form.submit') }}
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const form = reactive({
  nimi: '',
  epost: '',
  telefon: '',
  kuupaev: '',
  lisainfo: '',
})

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
      body: JSON.stringify({ type: 'broneering', ...form }),
    })
    const json = await res.json()
    if (!json.success) throw new Error(json.error || 'server error')
    status.value = 'success'
  } catch {
    status.value = 'error'
  }
}
</script>
