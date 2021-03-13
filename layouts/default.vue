<template>
  <v-app>
    <v-app-bar fixed app elevation="0">
      <div class="navbar">
        <div class="logo">
          <v-icon>mdi-checkbox-blank-circle</v-icon>
          <v-toolbar-title v-text="pageTitle" />
        </div>
        <Menu :menu="menu" />
        <v-btn
          fab
          elevation="0"
          class="mobile-menu"
          @click="isMenuOpen = !isMenuOpen"
        >
          <v-icon> mdi-menu </v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <v-navigation-drawer
      v-model="isMenuOpen"
      app
      disable-resize-watcher
      disable-route-watcher
      fixed
      right
    >
      <Menu :menu="menu" vertical />
    </v-navigation-drawer>
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
      menu: ['homepage', 'contactUs'],
      isMenuOpen: false,
      windowWidth: 0,
    }
  },
  head() {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale,
      },
    }
  },
  computed: {
    ...mapGetters(['title']),
    pageTitle() {
      return this.title !== this.$t('menu.homepage') && this.title
        ? this.$t(`menu.${this.title}`)
        : 'Sample'
    },
  },
  watch: {
    '$route.name'(name) {
      this.getTitle(name)
    },
    windowWidth(width) {
      if (width > 768) this.isMenuOpen = false
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  mounted() {
    this.getTitle(this.$route.name)
    this.windowWidth = window.innerWidth
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
  },
  methods: {
    ...mapMutations(['setTitle']),
    getTitle(name) {
      this.menu.forEach((x) => {
        if (x === name.split('__')[0]) this.setTitle(x)
        else this.setTitle(null)
      })
    },
    onResize() {
      this.windowWidth = window.innerWidth
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
  .mobile-menu {
    display: none;
  }
}

@media only screen and (max-width: 768px) {
  .navbar {
    .mobile-menu {
      display: block;
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
