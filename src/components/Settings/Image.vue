<template>
  <div>
    <div class="row">
      <div class="form-group col-12">
        <label>Link Image:</label>
        <input type="text" class="form-control" v-model="el.src" />
      </div>
    </div>
    <div class="row">
      <div class="form-group col-12">
        <label>Caption:</label>
        <input type="text" class="form-control" v-model="el.caption" />
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <label>Height:</label>
        <select class="form-control" v-model="el.height">
          <option value="100">Short</option>
          <option value="150">Medium</option>
          <option value="200">Tall</option>
          <option value="300">Wicked Tall</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Image",

  props: {
    el: Object,
  },

  data() {
    return {};
  },

  methods: {},
};
</script>

<style lang="sass" scoped>
@import '../../assets/sass/library'

.url
  width: 270px
.caption
  width: 290px
</style>