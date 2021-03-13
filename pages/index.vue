<template>
  <div>
    <h1>{{ $t('menu.homepage') }}</h1>
    <p>{{ $t('homepage.p') }}</p>
  </div>
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
