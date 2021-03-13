import hash from 'object-hash'

export const state = () => ({
  title: null,
  locale: 'en',
  user: { name: null, email: null, password: null },
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
  setUser(state, payload) {
    if (payload.password) payload.password = hash(payload.password)
    state.user = payload
  },
}

export const actions = {
  logout({ commit }) {
    commit('setUser', { name: null, email: null, password: null })
  },
}
