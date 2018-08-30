export const strict = true

export const state = () => ({
  items: [],
})

export const mutations = {
  ADD_REPOSITORY (state, description = {}) {
    state.items.push(description)
  },
}

export const getters = {
  isHydrated: state => state.items.length > 0,
  getRepository: state => key => state.items.filter(repo => key === repo.name),
  byOrganization: state => organization => state.items.filter(repo => organization === repo.full_name.split('/')[0]),
}

export const actions = {
  async hydrate ({
    commit, getters,
  }) {
    // Let's say we eventually will have more than one organization stored here
    const organization = 'webplatform'
    const reposUrl = `/github/orgs/${organization}/repos`
    const isHydrated = await getters.isHydrated
    if (isHydrated === false) {
      const repos = await this.$axios.$get(reposUrl)
      repos.forEach(repo => {
        repo.organization = organization
        commit('ADD_REPOSITORY', repo)
      })
    }
  },
}
