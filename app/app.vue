<template>
  <div>
    <NuxtRouteAnnouncer />
    <NavBar />
    <main>
      <NuxtPage />
    </main>
    <Footer />
    <MessengerButton />
  </div>
</template>

<script setup lang="ts">
const head = useLocaleHead({ dir: true, lang: true, seo: true })

useHead(() => ({
  htmlAttrs: head.value.htmlAttrs,
  link: head.value.link,
  meta: head.value.meta,
  noscript: [
    { innerHTML: '<style>[data-reveal]{opacity:1 !important;transform:none !important}</style>', tagPosition: 'head' },
  ],
}))

useSeoMeta({
  ogSiteName: 'Tähistades Elu',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})
</script>

<style>
[data-reveal] {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
[data-reveal].revealed {
  opacity: 1;
  transform: translateY(0);
}
</style>
