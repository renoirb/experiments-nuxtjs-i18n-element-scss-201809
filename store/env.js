import Vue from 'vue'

export const strict = true

export const state = () => ({})

export const mutations = {
  IMPORT (state, properties) {
    for (const [
      key,
      value,
    ] of Object.entries(properties)) {
      const v = JSON.parse(JSON.stringify(value))
      Vue.set(state, key, v)
    }
  },
}

export const getters = {
  isHydrated (state) {
    return Object.keys(state).length > 0
  },
  getValue: state => key => Reflect.get(state, key),
}

export const actions = {
  async hydrate ({
    commit, getters,
  }) {
    const where = '/mocking-api/env.json'
    const isHydrated = await getters.isHydrated
    if (isHydrated === false) {
      const data = await this.$axios.$get(where)
      commit('IMPORT', data)
    }
  },
}
