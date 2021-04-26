<template>
  <div class="row">
    <div class="col-6">
      <div class="form-group">
        <label>Label:</label>
        <input type="text" class="form-control" v-model="el.label" />
      </div>
    </div>
    <div class="col-6">
      <div class="form-group">
        <label for="">Color:</label>
        <select class="form-control" v-model="el.color">
          <option value="blue">Blue</option>
          <option value="red">Red</option>
          <option value="yellow">Yellow</option>
          <option value="white">White</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Button",

  props: {
    el: Object,
  },

  data() {
    return {};
  },

  methods: {},
};
</script>

<style lang="sass">
@import '../../assets/sass/library'

.label
  width: 125px
</style>