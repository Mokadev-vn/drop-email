<template>
    <div v-if="el.code === ''" class="code-null"></div>
    <div v-else v-html="el.code"></div>
</template>

<script>
export default {
  props: {
    el: Object,
  },
};
</script>

<style lang="sass" scoped>
.code-null
    margin: 15px 0
</style>
