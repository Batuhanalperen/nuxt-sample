<template>
  <v-app>
    <v-app-bar fixed app elevation="0">
      <div class="navbar">
        <v-toolbar-title v-text="pageTitle" />
        <ul class="nav">
          <nuxt-link v-for="{ title, path } in menu" :key="path" :to="path">
            <li>{{ title }}</li>
          </nuxt-link>
        </ul>
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
        { title: 'Homepage', path: '/' },
        { title: 'Contact Us', path: '/contactUs' },
      ],
    }
  },
  computed: {
    ...mapGetters(['title']),
    pageTitle() {
      return `Sample ${this.title !== 'Homepage' ? `- ${this.title}` : ''}`
    },
  },
  watch: {
    '$route.path'(path) {
      this.getTitle(path)
    },
  },
  mounted() {
    this.getTitle(this.$route.path)
  },
  methods: {
    ...mapMutations(['setTitle']),
    getTitle(path) {
      const title = this.menu.find((x) => x.path === path).title || null
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
}
.nav {
  margin-left: 16px;
  list-style: none;
  display: flex;
  justify-content: flex-end;
  align-items: stretch;
  height: 100%;
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
<style>
.v-toolbar__content {
  padding: 0 16px;
}
</style>
