<template>
  <div class="nav" :class="{ vertical, horizontal: !vertical }">
    <ul>
      <nuxt-link v-for="title in menu" :key="title" :to="$t(`links.${title}`)">
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
          <v-list-item>
            {{ user.email }}
          </v-list-item>
          <v-list-item @click="logout()">
            {{ $t('menu.logout') }}
          </v-list-item>
        </v-list>
      </v-menu>
    </ul>
    <div class="lang">
      <SwitchLang />
    </div>
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
    vertical: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    ...mapGetters(['user']),
  },
  beforeMount() {
    this.setLocale(this.$i18n.locale)
  },
  methods: {
    ...mapMutations(['setLocale']),
    logout() {
      this.$store.dispatch('logout')
    },
  },
}
</script>

<style lang="scss" scoped>
.nav {
  height: 100%;
  &.horizontal {
    display: flex;
    align-items: center;
  }
  &.vertical {
    display: none;
  }
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

@media only screen and (max-width: 768px) {
  .nav {
    height: auto;
    padding-top: 16px;
    padding-left: 8px;
    &.vertical {
      display: block;
      width: 100%;
      ul {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;
        list-style: none;
        margin: 0;
        padding: 0;
      }
      li {
        display: flex;
        align-items: center;
        padding: 0 16px;
        transition: 0.2s all ease-in-out;
        &:hover {
          background: #cecece;
        }
      }
      .lang,
      .user {
        display: flex;
        align-items: center;
        padding: 0 16px;
        height: auto;
        transition: 0.2s all ease-in-out;
        &:hover {
          background: #cecece;
        }
      }
    }
    &.horizontal {
      display: none;
    }
  }
}
</style>
<style>
.v-navigation-drawer__content {
  max-height: 100vh;
}
</style>
