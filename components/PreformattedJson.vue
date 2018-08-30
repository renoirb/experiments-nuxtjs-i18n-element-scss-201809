<template>
  <pre
    style="word-break: break-all !important;"
    :class="classNames"
  >
{{ stringified }}
  </pre>
</template>

<script>
export default {
  name: 'UPreformattedJson',
  props: {
    object: {
      type: [
        Object,
        String,
        Array,
        Boolean,
      ],
      default: () => ({}),
    },
  },
  computed: {
    classNames () {
      return ['u-preformatted-json--component']
    },
    stringified () {
      return JSON.stringify(this.object, null, 4)
    },
  },
}
</script>
