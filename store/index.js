export const state = () => ({
  title: null,
  locale: 'en',
  user: { name: null, email: null },
})

export const getters = {
  title: (state) => {
    return state.title
  },
  locale: (state) => {
    return state.locale
  },
  user: (state) => {
    return state.user
  },
}

export const mutations = {
  setTitle(state, payload) {
    state.title = payload
  },
  setLocale(state, payload = 'en') {
    state.locale = payload
  },
  setUser(state, { name = null, email = null }) {
    state.user = { name, email }
  },
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {},
}
