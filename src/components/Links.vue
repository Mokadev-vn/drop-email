<template>
  <div>
    <nav class="nav">
      <div class="nav-left"></div>
      <div class="nav-center">
        <div v-for="(link, i) in el.links" class="nav-item" :key="i">
          <span class="icon">
            <i class="fab" :class="link" href="#"></i>
          </span>
        </div>
      </div>
      <div class="nav-right"></div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "LinksComponent",

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

<style lang="sass" scoped>
@import '../assets/sass/library'

.nav
  max-height: 25px
  min-height: 25px
.nav-item
  padding: 0px 10px
  height: 25px
  align-items: flex-end
</style>