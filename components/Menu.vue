<template>
  <div class="nav">
    <ul>
      <nuxt-link v-for="{ title, path } in menu" :key="path" :to="path">
        <li>{{ $t(`menu.${title}`) }}</li>
      </nuxt-link>
      <Login v-if="!user.email" />
      <v-menu v-else offset-y>
        <template #activator="{ on, attrs }">
          <div v-bind="attrs" class="user" v-on="on">
            {{ user.name }}
            <v-icon>mdi-chevron-down</v-icon>
          </div>
        </template>
        <v-list>
          <v-list-item @click="logout()">
            {{ $t('menu.logout') }}
          </v-list-item>
        </v-list>
      </v-menu>
    </ul>
    <v-menu offset-y>
      <template #activator="{ on, attrs }">
        <div v-bind="attrs" class="lang" v-on="on">
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
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Menu',
  props: {
    menu: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['user']),
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
    selectedLocale() {
      return this.$i18n.locales.find((i) => i.code === this.$i18n.locale).name
    },
  },
  beforeMount() {
    this.setLocale(this.$i18n.locale)
  },
  methods: {
    ...mapMutations(['setLocale']),
    changeLocale(code) {
      this.$i18n.setLocale(code)
      this.setLocale(code)
    },
    logout() {
      this.$store.dispatch('logout')
    },
  },
}
</script>

<style lang="scss" scoped>
.nav {
  height: 100%;
  display: flex;
  align-items: center;
  .lang,
  .user {
    display: flex;
    align-items: center;
    padding: 0 16px;
    height: 100%;
    transition: 0.2s all ease-in-out;
    &:hover {
      background: #cecece;
    }
  }
  ul {
    margin-left: 16px;
    display: flex;
    justify-content: flex-end;
    align-items: stretch;
    height: 100%;
    list-style: none;
  }
  li {
    display: flex;
    align-items: center;
    padding: 0 16px;
    height: 100%;
    transition: 0.2s all ease-in-out;
    &:hover {
      background: #cecece;
    }
  }
  a {
    color: black;
    text-decoration: none;
  }
}
</style>
