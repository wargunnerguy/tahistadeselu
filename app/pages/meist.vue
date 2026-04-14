<template>
  <div>
    <!-- Page header -->
    <section class="pt-40 pb-20 px-6 bg-stone-50">
      <div class="max-w-3xl mx-auto text-center">
        <p class="text-xs tracking-[0.35em] uppercase text-stone-400 mb-4">Meist</p>
        <h1 class="text-4xl md:text-6xl font-extralight text-stone-800 tracking-[0.08em] uppercase leading-tight">
          Iga elu on<br />ainulaadne lugu
        </h1>
      </div>
    </section>

    <!-- Story -->
    <section class="py-24 px-6 bg-white">
      <div class="max-w-2xl mx-auto">
        <p class="text-xs tracking-[0.3em] uppercase text-stone-400 mb-8">Meie lugu</p>
        <p class="text-2xl md:text-3xl font-extralight text-stone-700 leading-relaxed mb-10">
          Matused ei pea olema pelgalt leinatalitused. Need võivad olla tähistamised — armastuse, mälestuste ja elu täis lugu.
        </p>
        <p class="text-stone-500 font-light leading-relaxed text-base mb-6">
          Tähistades Elu sündis soovist muuta see raske hetk millekski kauniks. Oleme näinud, kuidas õigesti korraldatud talitus aitab leinal muutuda tänulikkuseks — ja pisaratel naeratus.
        </p>
        <p class="text-stone-500 font-light leading-relaxed text-base">
          Meie jaoks ei ole tegemist lihtsalt tööga. Iga perekond, iga lugu, iga talitus on meile au ja vastutus.
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
        <p class="text-xs tracking-[0.3em] uppercase text-stone-400 mb-16 text-center">Kes me oleme</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h3 class="text-sm tracking-[0.2em] uppercase text-stone-800 font-light mb-5">
              [Teie nimi, asutaja]
            </h3>
            <p class="text-stone-500 font-light leading-relaxed text-sm">
              [Siia tuleb teie isiklik lugu — miks te selle töö valisite, mis teile selles oluline on ja milline on teie visioon. Asendage see tekst oma sõnadega.]
            </p>
          </div>
          <div>
            <h3 class="text-sm tracking-[0.2em] uppercase text-stone-800 font-light mb-5">
              Meie väärtused
            </h3>
            <ul class="space-y-4 text-stone-500 font-light text-sm">
              <li class="flex items-start gap-3">
                <span class="text-stone-300 mt-0.5">—</span>
                <span>Iga inimene väärib väärikat ja personaalset mälestust</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-stone-300 mt-0.5">—</span>
                <span>Rõõm ja armastus on leina kõrval alati olemas</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-stone-300 mt-0.5">—</span>
                <span>Perekond ei peaks muretsema — me hoolitseme kõige eest</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-stone-300 mt-0.5">—</span>
                <span>Ausus, soojus ja tähelepanu igal sammul</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 px-6 bg-stone-50 text-center">
      <p class="text-xs tracking-[0.35em] uppercase text-stone-400 mb-6">Alustame vestlusega</p>
      <h2 class="text-2xl md:text-3xl font-extralight text-stone-700 mb-10 tracking-wide">
        Räägime sellest, kuidas saame aidata.
      </h2>
      <NuxtLink
        to="/broneeri"
        class="inline-block border border-stone-800 text-stone-800 text-xs tracking-[0.25em] uppercase px-8 py-3 hover:bg-stone-800 hover:text-white transition-all duration-300"
      >
        Broneeri konsultatsioon
      </NuxtLink>
    </section>
  </div>
</template>
