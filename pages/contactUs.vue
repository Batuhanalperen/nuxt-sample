<template>
  <div>Contact Us</div>
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
