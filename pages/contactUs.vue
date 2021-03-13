<template>
  <div>
    <h1>{{ $t('menu.contactUs') }}</h1>
  </div>
</template>

<script>
export default {
  name: 'ContactUs',
  nuxtI18n: {
    paths: {
      en: '/contact-us',
      tr: '/iletisim',
    },
  },
  head() {
    return {
      title: this.$t('menu.contactUs'),
    }
  },
}
</script>
