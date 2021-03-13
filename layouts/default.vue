<template>
  <v-app>
    <v-app-bar fixed app elevation="0">
      <div class="navbar">
        <div class="logo">
          <v-icon>mdi-checkbox-blank-circle</v-icon>
          <v-toolbar-title v-text="pageTitle" />
        </div>
        <Menu :menu="menu" />
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
  },
  mounted() {
    this.getTitle(this.$route.name)
  },
  methods: {
    ...mapMutations(['setTitle']),
    getTitle(name) {
      const finded = this.menu.find((x) => x.title === name.split('__')[0])
      const title = finded ? finded.title : ''
      this.setTitle(title)
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
