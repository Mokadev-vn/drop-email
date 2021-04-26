<template>
  <div>
    <hr :class="customStyling" class="h2" />
  </div>
</template>

<script>
export default {
  name: "DividerComponent",

  props: {
    el: Object,
  },

  data() {
    return {};
  },

  computed: {
    customStyling() {
      return {};
    },
  },

  methods: {},
};
</script>

<style lang="sass">
@import '../assets/sass/library'
</style>