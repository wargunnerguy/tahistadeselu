<template>
  <div>
    <!-- Page header -->
    <section class="pt-40 pb-20 px-6 bg-stone-50">
      <div class="max-w-3xl mx-auto text-center">
        <p class="text-xs tracking-[0.35em] uppercase text-stone-400 mb-4">{{ $t('kontakt.eyebrow') }}</p>
        <h1 class="text-4xl md:text-6xl font-extralight text-stone-800 tracking-[0.08em] uppercase leading-tight">
          {{ $t('kontakt.title') }}
        </h1>
      </div>
    </section>

    <section class="py-24 px-6 bg-white">
      <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">

        <!-- Contact info -->
        <div class="space-y-12">
          <div>
            <p class="text-xs tracking-[0.3em] uppercase text-stone-400 mb-6">{{ $t('kontakt.infoLabel') }}</p>
            <ul class="space-y-6">
              <li>
                <p class="text-xs tracking-[0.2em] uppercase text-stone-400 mb-1">{{ $t('kontakt.phoneLabel') }}</p>
                <a
                  href="tel:+37200000000"
                  class="text-stone-700 font-light text-sm hover:text-stone-400 transition-colors"
                >
                  +372 000 0000
                </a>
              </li>
              <li>
                <p class="text-xs tracking-[0.2em] uppercase text-stone-400 mb-1">{{ $t('kontakt.emailLabel') }}</p>
                <a
                  href="mailto:info@tahistadeselu.ee"
                  class="text-stone-700 font-light text-sm hover:text-stone-400 transition-colors"
                >
                  info@tahistadeselu.ee
                </a>
              </li>
              <li>
                <p class="text-xs tracking-[0.2em] uppercase text-stone-400 mb-1">{{ $t('kontakt.locationLabel') }}</p>
                <p class="text-stone-700 font-light text-sm">
                  {{ $t('kontakt.location') }}
                </p>
              </li>
            </ul>
          </div>

          <div>
            <p class="text-xs tracking-[0.3em] uppercase text-stone-400 mb-4">{{ $t('kontakt.hoursLabel') }}</p>
            <p class="text-stone-500 font-light text-sm leading-relaxed">
              {{ $t('kontakt.hours') }}<br />
              {{ $t('kontakt.hoursEmergency') }}
            </p>
          </div>
        </div>

        <!-- Form -->
        <div>
          <!-- Success -->
          <div v-if="status === 'success'" class="py-10">
            <p class="text-xs tracking-[0.3em] uppercase text-stone-400 mb-4">{{ $t('kontakt.form.successEyebrow') }}</p>
            <h2 class="text-xl font-extralight text-stone-700 mb-4 tracking-wide">
              {{ $t('kontakt.form.successTitle') }}
            </h2>
            <p class="text-stone-500 font-light text-sm">
              {{ $t('kontakt.form.successBody') }}
            </p>
          </div>

          <form v-else class="space-y-10" @submit.prevent="submit">

            <div>
              <label class="block text-xs tracking-[0.2em] uppercase text-stone-400 mb-3">{{ $t('kontakt.form.name') }}</label>
              <input
                v-model="form.nimi"
                type="text"
                required
                :placeholder="$t('kontakt.form.namePlaceholder')"
                class="w-full border-b border-stone-200 bg-transparent py-3 text-stone-800 placeholder-stone-300 focus:outline-none focus:border-stone-600 transition-colors text-sm"
              />
            </div>

            <div>
              <label class="block text-xs tracking-[0.2em] uppercase text-stone-400 mb-3">{{ $t('kontakt.form.email') }}</label>
              <input
                v-model="form.epost"
                type="email"
                required
                :placeholder="$t('kontakt.form.emailPlaceholder')"
                class="w-full border-b border-stone-200 bg-transparent py-3 text-stone-800 placeholder-stone-300 focus:outline-none focus:border-stone-600 transition-colors text-sm"
              />
            </div>

            <div>
              <label class="block text-xs tracking-[0.2em] uppercase text-stone-400 mb-3">{{ $t('kontakt.form.message') }}</label>
              <textarea
                v-model="form.sonum"
                rows="5"
                required
                :placeholder="$t('kontakt.form.messagePlaceholder')"
                class="w-full border-b border-stone-200 bg-transparent py-3 text-stone-800 placeholder-stone-300 focus:outline-none focus:border-stone-600 transition-colors text-sm resize-none"
              />
            </div>

            <p v-if="status === 'error'" class="text-red-400 text-xs tracking-wide">
              {{ $t('kontakt.form.error') }}
            </p>

            <button
              type="submit"
              :disabled="status === 'sending'"
              class="w-full border border-stone-800 text-stone-800 text-xs tracking-[0.25em] uppercase py-4 hover:bg-stone-800 hover:text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {{ status === 'sending' ? $t('kontakt.form.sending') : $t('kontakt.form.submit') }}
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const form = reactive({
  nimi: '',
  epost: '',
  sonum: '',
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
      body: JSON.stringify({ type: 'kontakt', ...form }),
    })
    const json = await res.json()
    if (!json.success) throw new Error(json.error || 'server error')
    status.value = 'success'
  } catch {
    status.value = 'error'
  }
}
</script>
