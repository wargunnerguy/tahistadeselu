<template>
  <a
    v-if="MESSENGER_URL"
    :href="MESSENGER_URL"
    target="_blank"
    rel="noopener"
    aria-label="Facebook Messenger"
    class="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-stone-900 text-white shadow-lg shadow-black/20 hover:bg-stone-700 hover:-translate-y-0.5 transition-all duration-300"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7">
      <path d="M12 2C6.477 2 2 6.145 2 11.259c0 2.913 1.454 5.512 3.726 7.21V22l3.405-1.869c.909.252 1.871.388 2.869.388 5.523 0 10-4.145 10-9.26C22 6.146 17.523 2 12 2zm1.008 12.461l-2.546-2.716-4.97 2.716 5.467-5.804 2.609 2.716 4.906-2.716-5.466 5.804z" />
    </svg>
  </a>
</template>

<script setup lang="ts">
// Set to the page's m.me link (e.g. 'https://m.me/tahistadeselu') to show the button
const MESSENGER_URL = ''
</script>
