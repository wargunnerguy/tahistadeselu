// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Fully static output
  ssr: false,

  app: {
    baseURL: '/tahistadeselu/',
  },

  nitro: {
    output: {
      dir: 'dist',
      publicDir: 'dist',
    },
  },

  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n'],

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'et',
    locales: [
      { code: 'et', language: 'et-EE', name: 'Eesti' },
      { code: 'en', language: 'en-US', name: 'English' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },
})
