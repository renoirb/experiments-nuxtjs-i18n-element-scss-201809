import createPersistedState from 'vuex-persistedstate'

export default async ({
  store, $axios, isHMR,
}) => {
  // Just in case nuxt.config.js gets a change in ssr:false when adding this plugin.
  if (process.browser) {
    // In case of HMR, mutation occurs before nuxReady, so previously saved state
    // gets replaced with original state received from server. So, we've to skip HMR.
    // Also nuxtReady event fires for HMR as well, which results multiple registration of
    // vuex-persistedstate plugin
    if (isHMR) return

    await store.dispatch('env/hydrate')
    let API_PREFIX = await store.getters['env/getValue']('API_PREFIX')
    if (typeof API_PREFIX !== 'string') {
      API_PREFIX = ''
    }

    const hasWindowLocation = Reflect.has(window, 'location')
    let baseURL = hasWindowLocation ? window.location.origin : null
    if ($axios && baseURL !== null) {
      baseURL += API_PREFIX
      $axios.defaults.baseURL = baseURL
    }

    createPersistedState({
      key: 'persistedstate',
      paths: [
        'env',
        'repositories',
      ],
    })(store) // vuex plugins can be connected to store, even after creation
  }
}
