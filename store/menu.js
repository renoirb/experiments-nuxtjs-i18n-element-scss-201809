export const strict = true

export const state = () => ({
  menus: [],
  hidden: false,
})

export const mutations = {
  SET_MENUS (state, menus = []) {
    state.menus = menus
  },
  TOGGLE_HIDDEN (state) {
    state.hidden = !state.hidden
  },
}

export const getters = {
  menus (state) {
    return state.menus
  },
  hidden (state) {
    return state.hidden
  },
}

export const actions = {
  async hydrate ({
    dispatch,
  }) {
    const where = '/mocking-api/ui/menu.json'
    const menu = await this.$axios.$get(where)
    await dispatch('addAll', menu)
  },
  addAll ({
    commit,
  }, menus) {
    if (Array.isArray(menus) && menus.length) {
      commit('SET_MENUS', menus)
    }
  },
  toggleHidden ({
    commit,
  }) {
    commit('TOGGLE_HIDDEN')
  },
}
