<template>
  <small>
    (<a
      :href="href"
      target="_blank"
    >{{ textContent }}</a>)
  </small>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      default: 'http://localhost:3000/bff',
    },
  },
  computed: {
    textContent () {
      let href = this.href
      // const urlObj = new URL(href)
      href = decodeURIComponent(href)
      const search = href.split('?')[1] || '...'
      return search
    },
  },
}
</script>
