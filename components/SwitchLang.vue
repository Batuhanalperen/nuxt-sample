<template>
  <v-menu offset-y>
    <template #activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on">
        {{ selectedLocale }}
        <v-icon>mdi-chevron-down</v-icon>
      </div>
    </template>
    <v-list>
      <v-list-item
        v-for="locale in availableLocales"
        :key="locale.code"
        @click="changeLocale(locale.code)"
      >
        {{ locale.name }}
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'SwitchLang',
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
    selectedLocale() {
      return this.$i18n.locales.find((i) => i.code === this.$i18n.locale).name
    },
  },
  methods: {
    ...mapMutations(['setLocale']),
    changeLocale(code) {
      this.$i18n.setLocale(code)
      this.setLocale(code)
    },
  },
}
</script>
