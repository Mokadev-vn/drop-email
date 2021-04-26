<template>
  <div>
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label>Font Size:</label>
          <select v-model="el.fontSize" class="form-control">
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="big">Big</option>
            <option value="wicked-big">Wicked Big</option>
          </select>
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label>Color:</label>
          <select v-model="el.color" class="form-control">
            <option value="black">Black</option>
            <option value="gray">Gray</option>
            <option value="blue">Blue</option>
            <option value="red">Red</option>
          </select>
        </div>
      </div>
    </div>
    <div>
      <p class="control">
        <button
          class="button is-small"
          href="#"
          :class="{ 'is-primary': el.bold }"
          @click.prevent="el.bold = !el.bold"
        >
          <i class="fa fa-bold"></i>
        </button>
        <button
          class="button is-small"
          href="#"
          :class="{ 'is-primary': el.italic }"
          @click.prevent="el.italic = !el.italic"
        >
          <i class="fa fa-italic"></i>
        </button>
      </p>

      <p class="control">
        <textarea class="textarea form-control" rows="3" v-model="el.text"></textarea>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Font",

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

.button .fa
  font-size: 15px
</style>