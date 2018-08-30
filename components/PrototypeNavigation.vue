<template>
  <ol
    v-if="items !== null"
    class="prototype-navigation--component"
  >
    <li
      v-for="(item, index) in items"
      :key="index"
    >
      <nuxt-link
        :to="item.to"
      >
        {{ item.label }}
      </nuxt-link>
    </li>
  </ol>
</template>

<script>
/**
 * Because UNavigationFooter does not have a slot for each item,
 * we have to copy paste.
 * This is just a placeholder sample for the moment.
 */
export default {
  name: 'PrototypeNavigation',
  props: {
    links: {
      type: Array,
      default: () => [
        {
          label: 'Home',
          to: '/',
        },
        {
          label: 'Alpha',
          to: '/alpha',
        },
        {
          label: 'Bravo',
          to: '/bravo',
        },
      ],
    },
  },
  data () {
    return {
      items: null,
    }
  },
  created () {
    this.items = this.links.map(i => JSON.parse(JSON.stringify(i)))
  },
}
</script>

<style scoped>
.prototype-navigation--component {
  user-select: none;
  list-style-type: none;
  vertical-align: top;
  padding: 0;
  margin: 0;
}
.prototype-navigation--component li {
  display: inline-block;
}
.prototype-navigation--component li + li:before {
  content: '|';
  margin: 0 5px;
}
</style>
