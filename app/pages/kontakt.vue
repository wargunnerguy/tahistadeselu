<template>
  <div>
    <!-- Page header -->
    <section class="pt-40 pb-20 px-6 bg-stone-50">
      <div class="max-w-3xl mx-auto text-center">
        <p class="text-xs tracking-[0.35em] uppercase text-stone-400 mb-4">Kontakt</p>
        <h1 class="text-4xl md:text-6xl font-extralight text-stone-800 tracking-[0.08em] uppercase leading-tight">
          Räägime
        </h1>
      </div>
    </section>

    <section class="py-24 px-6 bg-white">
      <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">

        <!-- Contact info -->
        <div class="space-y-12">
          <div>
            <p class="text-xs tracking-[0.3em] uppercase text-stone-400 mb-6">Ühendust saab</p>
            <ul class="space-y-6">
              <li>
                <p class="text-xs tracking-[0.2em] uppercase text-stone-400 mb-1">Telefon</p>
                <a
                  href="tel:+37200000000"
                  class="text-stone-700 font-light text-sm hover:text-stone-400 transition-colors"
                >
                  +372 000 0000 <!-- Asendage oma numbriga -->
                </a>
              </li>
              <li>
                <p class="text-xs tracking-[0.2em] uppercase text-stone-400 mb-1">E-post</p>
                <a
                  href="mailto:info@tahistadeselu.ee"
                  class="text-stone-700 font-light text-sm hover:text-stone-400 transition-colors"
                >
                  info@tahistadeselu.ee <!-- Asendage oma e-postiga -->
                </a>
              </li>
              <li>
                <p class="text-xs tracking-[0.2em] uppercase text-stone-400 mb-1">Asukoht</p>
                <p class="text-stone-700 font-light text-sm">
                  Eesti <!-- Täpne aadress siia -->
                </p>
              </li>
            </ul>
          </div>

          <div>
            <p class="text-xs tracking-[0.3em] uppercase text-stone-400 mb-4">Tööaeg</p>
            <p class="text-stone-500 font-light text-sm leading-relaxed">
              Esmaspäev – reede: 9:00 – 18:00<br />
              Hädaolukordades oleme kättesaadavad ööpäevaringselt.
            </p>
          </div>
        </div>

        <!-- Form -->
        <div>
          <!-- Success -->
          <div v-if="status === 'success'" class="py-10">
            <p class="text-xs tracking-[0.3em] uppercase text-stone-400 mb-4">Saadetud</p>
            <h2 class="text-xl font-extralight text-stone-700 mb-4 tracking-wide">
              Täname! Vastame peagi.
            </h2>
            <p class="text-stone-500 font-light text-sm">
              Võtame teiega ühendust esimesel võimalusel.
            </p>
          </div>

          <!-- Form -->
          <form v-else class="space-y-10" @submit.prevent="submit">

            <div>
              <label class="block text-xs tracking-[0.2em] uppercase text-stone-400 mb-3">Nimi *</label>
              <input
                v-model="form.nimi"
                type="text"
                required
                placeholder="Teie nimi"
                class="w-full border-b border-stone-200 bg-transparent py-3 text-stone-800 placeholder-stone-300 focus:outline-none focus:border-stone-600 transition-colors text-sm"
              />
            </div>

            <div>
              <label class="block text-xs tracking-[0.2em] uppercase text-stone-400 mb-3">E-post *</label>
              <input
                v-model="form.epost"
                type="email"
                required
                placeholder="teie@email.ee"
                class="w-full border-b border-stone-200 bg-transparent py-3 text-stone-800 placeholder-stone-300 focus:outline-none focus:border-stone-600 transition-colors text-sm"
              />
            </div>

            <div>
              <label class="block text-xs tracking-[0.2em] uppercase text-stone-400 mb-3">Sõnum *</label>
              <textarea
                v-model="form.sonum"
                rows="5"
                required
                placeholder="Kuidas saame aidata?"
                class="w-full border-b border-stone-200 bg-transparent py-3 text-stone-800 placeholder-stone-300 focus:outline-none focus:border-stone-600 transition-colors text-sm resize-none"
              />
            </div>

            <!-- Error -->
            <p v-if="status === 'error'" class="text-red-400 text-xs tracking-wide">
              Midagi läks valesti. Palun proovige uuesti.
            </p>

            <button
              type="submit"
              :disabled="status === 'sending'"
              class="w-full border border-stone-800 text-stone-800 text-xs tracking-[0.25em] uppercase py-4 hover:bg-stone-800 hover:text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {{ status === 'sending' ? 'Saatmine...' : 'Saada sõnum' }}
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
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
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'kontakt', ...form }),
    })
    status.value = 'success'
  } catch {
    status.value = 'error'
  }
}
</script>
