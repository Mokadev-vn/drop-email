<template>
  <div>
    <p class="control">
      <textarea class="textarea" :class="customStyling"  rows="6" v-model="el.code"></textarea>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    el: Object,
  },
  computed: {
    customStyling() {
      return {};
    },
  },
};
</script>

<style lang="sass" scoped>
.textarea
    border: 1px solid #dbdbdb !important
</style>