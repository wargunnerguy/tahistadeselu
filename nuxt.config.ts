// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Fully static output
  ssr: false,

  nitro: {
    output: {
      dir: 'dist',
      publicDir: 'dist',
    },
  },

  modules: ['@nuxtjs/tailwindcss'],
})
