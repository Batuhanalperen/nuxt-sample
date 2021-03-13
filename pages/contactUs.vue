<template>
  <div>
    <h1>{{ $t('menu.contactUs') }}</h1>
    <v-form ref="form" v-model="valid" :disabled="loading">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-alert v-if="success" type="success">
              {{ $t('contactUs.success', { count: count }) }}
            </v-alert>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="payload.name"
              :rules="nameRules"
              :label="$t('login.name')"
              required
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="payload.email"
              :rules="emailRules"
              :label="$t('login.email')"
              required
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="payload.phonenumber"
              :rules="phoneRules"
              :label="$t('contactUs.phone')"
              required
            />
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              v-model="payload.country_code"
              :items="countryList"
              item-text="name"
              item-value="id"
            >
              <template #selection="data">
                <div class="selected-country">
                  <img
                    :src="`https://www.countryflags.io/${data.item.id}/flat/32.png`"
                  />
                  {{ data.item.name }}
                </div>
              </template>
              <template #item="data">
                <v-list-item-avatar>
                  <img
                    :src="`https://www.countryflags.io/${data.item.id}/flat/32.png`"
                  />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ data.item.name }}</v-list-item-title>
                </v-list-item-content>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model="payload.text"
              counter
              :label="$t('contactUs.text')"
              :rules="textRules"
            />
          </v-col>
          <v-col cols="12">
            <div class="send">
              <v-btn
                elevation="0"
                color="primary"
                :loading="loading"
                @click="handleSend"
              >
                {{ $t('contactUs.send') }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ContactUs',
  nuxtI18n: {
    paths: {
      en: '/contact-us',
      tr: '/iletisim',
    },
  },
  data() {
    return {
      loading: false,
      valid: false,
      success: false,
      count: 3,
      payload: {
        name: '',
        email: '',
        phonenumber: '',
        country_code: '',
        text: '',
      },
      countryList: [
        { id: 'TR', name: 'Turkey' },
        { id: 'US', name: 'United States of America' },
        { id: 'GB', name: 'United Kingdom' },
        { id: 'DE', name: 'Germany' },
        { id: 'SE', name: 'Sweden' },
        { id: 'KE', name: 'Kenya' },
        { id: 'BR', name: 'Brazil' },
        { id: 'ZW', name: 'Zimbabwe' },
      ],
      nameRules: [
        (v) =>
          !!v || this.$t('login.required', { name: this.$t('login.name') }),
      ],
      emailRules: [
        (v) =>
          !!v || this.$t('login.required', { name: this.$t('login.email') }),
        (v) => /.+@.+/.test(v) || this.$t('login.mailValidator'),
      ],
      phoneRules: [
        (v) =>
          !!v ||
          this.$t('login.required', { name: this.$t('contactUs.phone') }),
        (v) =>
          v.replaceAll(' ', '').length === 13 ||
          this.$t('contactUs.phoneValidator'),
      ],
      textRules: [
        (v) =>
          !!v || this.$t('login.required', { name: this.$t('contactUs.text') }),
        (v) =>
          v.length > 10 || this.$t('contactUs.textValidator', { count: 10 }),
      ],
    }
  },
  head() {
    return {
      title: this.$t('menu.contactUs'),
    }
  },
  computed: {
    ...mapGetters(['user']),
  },
  watch: {
    count(count) {
      if (count < 1) this.$router.push(this.$t('links.homepage'))
    },
  },
  mounted() {
    if (this.user && this.user.email && this.user.name) {
      this.payload.name = this.user.name
      this.payload.email = this.user.email
    }
  },
  methods: {
    handleSend() {
      this.$refs.form.validate()
      if (this.valid) {
        this.loading = true
        this.success = false
        this.$axios({
          method: 'post',
          url: '/api/',
          data: this.payload,
        }).finally(() => {
          this.loading = false
          this.success = true
          this.count = 3
          setInterval(() => this.count--, 1000)
        })
      }
    },
  },
}
</script>
<style lang="scss">
.selected-country {
  display: flex;
  align-items: center;
  img {
    margin-right: 8px;
  }
}
.send {
  display: flex;
  justify-content: flex-end;
}
</style>
