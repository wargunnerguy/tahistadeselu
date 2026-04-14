import et from '@@/locales/et'
import en from '@@/locales/en'

export default defineNuxtPlugin((nuxtApp) => {
  const i18n = nuxtApp.$i18n as any
  if (i18n?.setLocaleMessage) {
    i18n.setLocaleMessage('et', et)
    i18n.setLocaleMessage('en', en)
  }
})
