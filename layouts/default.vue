<template>
  <v-app>
    <v-app-bar fixed app elevation="0">
      <div class="navbar">
        <div class="logo">
          <v-icon>mdi-checkbox-blank-circle</v-icon>
          <v-toolbar-title v-text="pageTitle" />
        </div>
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
      </div>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer absolute app>
      <span>Sample &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Default',
  data() {
    return {
      menu: [
        { title: 'homepage', path: this.$t('links.homepage') },
        { title: 'contactUs', path: this.$t('links.contactUs') },
      ],
    }
  },
  computed: {
    ...mapGetters(['title', 'locale', 'user']),
    pageTitle() {
      return `Sample ${
        this.title !== this.$t('menu.homepage') && this.title
          ? `- ${this.title}`
          : ''
      }`
    },
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
    selectedLocale() {
      return this.$i18n.locales.find((i) => i.code === this.$i18n.locale).name
    },
  },
  watch: {
    '$route.path'(path) {
      this.getTitle(path)
    },
  },
  beforeMount() {
    this.$i18n.setLocale(this.locale)
  },
  mounted() {
    this.getTitle(this.$route.path)
  },
  methods: {
    ...mapMutations(['setTitle', 'setLocale']),
    getTitle(path) {
      const finded = this.menu.find((x) => x.path === path)
      const title = finded ? this.$t(`menu.${finded.title}`) : ''
      this.setTitle(title)
    },
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
.navbar {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  align-items: center;
  .logo {
    display: flex;
    i {
      margin-right: 8px;
    }
  }
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
}
</style>
<style>
.v-toolbar__content {
  padding: 0 16px;
}
.nuxt-link-active {
  color: black !important;
  text-decoration: none;
}
</style>
