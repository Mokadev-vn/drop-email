<template>
  <div class="row">
    <div class="col-6">
      <div class="form-group">
        <label>Margin Top:</label>
        <select v-model="el.marginTop" class="form-control">
            <option value="a lot">A Lot</option>
            <option value="some">Some</option>
            <option value="a little">A Little</option>
            <option value="none">None</option>
          </select>
      </div>
    </div>
    <div class="col-6">
      <div class="form-group">
        <label>Margin Bottom:</label>
        <select v-model="el.marginBottom" class="form-control">
            <option value="a lot">A Lot</option>
            <option value="some">Some</option>
            <option value="a little">A Little</option>
            <option value="none">None</option>
          </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Margin",

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
</style>