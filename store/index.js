export const strict = true

export const state = () => ({})

export const actions = {
  async nuxtServerInit ({
    dispatch,
  }) {
    await dispatch('env/hydrate')
    await dispatch('menu/hydrate')
  },
}
