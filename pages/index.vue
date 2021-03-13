<template>
  <div>{{ $i18n.locales }}</div>
</template>

<script>
export default {
  name: 'Homepage',
  head() {
    return {
      title: this.$t('menu.homepage'),
    }
  },
}
</script>
