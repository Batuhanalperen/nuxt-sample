<template>
  <v-dialog v-model="isVisible" width="500">
    <template #activator="{ on, attrs }">
      <div class="activator" v-bind="attrs" v-on="on">
        {{ $t('menu.login') }}
      </div>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2">
        Privacy Policy
      </v-card-title>

      <v-card-text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="isVisible = false">
          I accept
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      isVisible: false,
    }
  },
}
</script>
<style lang="scss" scoped>
.activator {
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 100%;
  transition: 0.2s all ease-in-out;
  &:hover {
    background: #cecece;
  }
}
</style>
