<template>
  <div>
    <!-- Page header -->
    <section class="pt-40 pb-20 px-6 bg-stone-50">
      <div class="max-w-3xl mx-auto text-center">
        <p class="text-xs tracking-[0.35em] uppercase text-stone-400 mb-4">Teenused</p>
        <h1 class="text-4xl md:text-6xl font-extralight text-stone-800 tracking-[0.08em] uppercase leading-tight">
          Valime koos<br />õige tee
        </h1>
        <p class="mt-8 text-base text-stone-500 font-light max-w-lg mx-auto leading-relaxed">
          Igal perel on oma vajadused. Oleme koostanud kolm paketti — kuid kõike saab kohandada.
        </p>
      </div>
    </section>

    <!-- Packages -->
    <section class="py-24 px-6 bg-white">
      <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="pkg in packages"
          :key="pkg.slug"
          :class="[
            'flex flex-col border p-10 transition-shadow duration-300 hover:shadow-lg',
            pkg.featured ? 'border-stone-800 bg-stone-800 text-white' : 'border-stone-200 bg-white',
          ]"
        >
          <!-- Badge -->
          <div v-if="pkg.featured" class="text-xs tracking-[0.25em] uppercase text-stone-400 mb-6">
            Populaarseim valik
          </div>
          <div v-else class="mb-10" />

          <h2
            :class="['text-lg tracking-[0.15em] uppercase font-light mb-4', pkg.featured ? 'text-white' : 'text-stone-800']"
          >
            {{ pkg.name }}
          </h2>
          <p :class="['text-sm font-light leading-relaxed mb-8 flex-1', pkg.featured ? 'text-stone-300' : 'text-stone-500']">
            {{ pkg.description }}
          </p>

          <!-- What's included -->
          <ul class="space-y-3 mb-10">
            <li
              v-for="item in pkg.includes"
              :key="item"
              :class="['flex items-start gap-3 text-sm font-light', pkg.featured ? 'text-stone-300' : 'text-stone-500']"
            >
              <span :class="['mt-0.5 flex-shrink-0', pkg.featured ? 'text-stone-400' : 'text-stone-300']">—</span>
              <span>{{ item }}</span>
            </li>
          </ul>

          <!-- Price -->
          <div :class="['mb-8 border-t pt-8', pkg.featured ? 'border-stone-600' : 'border-stone-100']">
            <p :class="['text-xs tracking-[0.2em] uppercase mb-1', pkg.featured ? 'text-stone-400' : 'text-stone-400']">Alates</p>
            <p :class="['text-3xl font-extralight tracking-wide', pkg.featured ? 'text-white' : 'text-stone-800']">
              {{ pkg.price }}
            </p>
          </div>

          <!-- CTA -->
          <NuxtLink
            to="/broneeri"
            :class="[
              'text-center text-xs tracking-[0.25em] uppercase px-6 py-3 transition-all duration-300',
              pkg.featured
                ? 'bg-white text-stone-800 hover:bg-stone-100'
                : 'border border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-white',
            ]"
          >
            Broneeri
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Note -->
    <section class="py-16 px-6 bg-stone-50 text-center">
      <p class="text-stone-400 font-light text-sm max-w-xl mx-auto leading-relaxed">
        Kõiki pakette saab täiendada lisateenustega — lilled, muusika, videograafia ja rohkem.
        Räägime detailidest broneeringu ajal.
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
const packages = [
  {
    slug: 'mälestusfilm',
    name: 'Mälestusfilm',
    description: 'Ilus videofilm, mis jäädvustab lähedase elu, mälestused ja kõige tähtsamad hetked — midagi, mis jääb perekonnale igaveseks.',
    includes: [
      'Kuni 2-tunnine filmimissessioon',
      'Professionaalne montaaž',
      'Taustamuusika valik',
      'Lõplik film HD-formaadis',
    ],
    price: '€ 490',
    featured: false,
  },
  {
    slug: 'taislik-pakett',
    name: 'Täielik pakett',
    description: 'Meie täielik teenus — mälestusfilm ja tseremoonia koos. Hoolitseme kõige eest, et saaksite olla kohal.',
    includes: [
      'Kõik Mälestusfilmi sisust',
      'Tseremoonia korraldus',
      'Isiklik koordinaator',
      'Lilleseade (põhiline)',
      'Tseremoonia helitehnika',
      'Järelhooldus ja tugi',
    ],
    price: '€ 990',
    featured: true,
  },
  {
    slug: 'tähista mine',
    name: 'Tähistamine',
    description: 'Professionaalselt korraldatud tseremoonia, mis tähistab lähedase elu soojalt ja väärikalt.',
    includes: [
      'Tseremoonia korraldus',
      'Isiklik koordinaator',
      'Programmi koostamine',
      'Tseremoonia helitehnika',
    ],
    price: '€ 590',
    featured: false,
  },
]
</script>
