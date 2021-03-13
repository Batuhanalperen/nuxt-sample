<template>
  <div>{{ $t('homepage.p') }}</div>
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
