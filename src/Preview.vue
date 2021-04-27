<template>
  <div class="preview-wrapper">
    <template v-if="dropped.length">
      <div class="dropzone" data-index="0"></div>

      <div v-for="(el, index) in dropped" :key="index">
        <div class="row" :class="{ 'show-container': el.sibling }">
          <dropped-component
            :el="el"
            :dropped="dropped"
            :index="index"
            :class="containerClasses(el, index, false)"
          >
          </dropped-component>

          <dropped-component
            v-if="el.sibling"
            :el="el.sibling"
            :dropped="dropped"
            :index="index"
            :is-sibling="true"
            :class="containerClasses(el, index, true)"
          >
          </dropped-component>

          <div
            v-if="el.hasDropzone"
            class="fill dropzone"
            :class="containerClasses(el, index, false, true)"
            :data-index="index"
            :sibling="true"
          ></div>
        </div>

        <div class="dropzone" :data-index="index + 1"></div>
      </div>
    </template>

    <div v-else class="dropzone has-text-centered default" data-index="0">
      <p class="quote">Just drag and drop elements over to here!</p>
      <p class="quote">Then hover over them to edit, clone, or delete</p>
    </div>
  </div>
</template>

<script>
import InteractJS from "interactjs";
import Global from "./helper.js";
import Component from "./components/Component";

export default {
  name: "Preview",

  props: {
    dropped: Array,
  },

  components: {
    "dropped-component": Component,
  },

  data() {
    return {
      highlightedContainers: [],
      beingEdited: { index: null, isSibling: false },
    };
  },

  mounted() {
    this.initDropzones();

    Global.listen("highlight-container", (index) => {
      console.log(index);
      this.highlightContainer(index); 
    });

    Global.listen("editing-component", (data) => {
      this.beingEdited = { index: data.index, isSibling: data.isSibling };
    });

    
    Global.listen("done-editing", () => (this.beingEdited.index = null));
  },

  methods: {
    highlightContainer(index) {
      this.$set(this.highlightedContainers, index, true);

      setTimeout(() => {
        this.$set(this.highlightedContainers, index, false);
      }, 1000);
    },

    containerClasses(el, index, sibling, dropzone) {
      return {
        "show-container": el.sibling,
        highlighted: this.highlightedContainers[index],
        "being-edited":
          this.beingEdited.index === index &&
          this.beingEdited.isSibling === sibling &&
          !dropzone,
      };
    },

    initDropzones() {
      InteractJS(".dropzone").dropzone({
        overlap: 0.1,
        accept: ".draggable",
        ondropactivate: function (event) {
          event.target.classList.add("drop-active");
        },

        ondragenter: function (event) {
          var draggableElement = event.relatedTarget,
            dropzoneElement = event.target;

          dropzoneElement.classList.add("drop-target");
          draggableElement.classList.add("can-drop");
        },

        ondragleave: function (event) {
          event.target.classList.remove("drop-target");
          event.relatedTarget.classList.remove("can-drop");
        },

        ondrop: function (event) {
          Global.emit("component-dropped", event);
          event.relatedTarget.classList.remove("can-drop");
        },

        ondropdeactivate: function (event) {
          event.target.classList.remove("drop-active");
          event.target.classList.remove("drop-target");
        },
      });
    },
  },
  watch: {
    
  }
};
</script>

<style lang="sass">
@import './assets/sass/library'

.preview-wrapper
  background: white
  width: 900px
  max-width: 900px
  height: auto
  min-height: 100%
  padding: 1em
  margin: auto

.row
  display: flex
  border: 1px dashed transparent
  flex-wrap: unset !important
  transition: all 200ms ease
  &:hover.show-container
    max-width: 900px
    border-color: lighten($gray, 15%)
    transition: all 200ms ease

.default
  .quote
    opacity: 0.7
    color: $info
    margin-bottom: 10px
    transition: all 200ms ease

.dropzone
  background: white
  z-index: 0
  margin: 0
  height: 10px
  border: 1px dashed transparent
  border-color: transparent
  transition: border-color 200ms ease
  &.default
    height: auto
    padding: 1em
    font-size: 20px
    border-width: 2px
    &.drop-target
      .quote, .by
        opacity: 0
  &.fill
    height: auto
    margin: 0 10px
    z-index: 0
    min-height: 10px
  &.highlighted
    border-color: $green
    transition: border-color 200ms ease

.drop-active
  border: 1px dashed $blue
  margin: 0
  transition: all 200ms ease

.drop-target
  background: $blue
  border-color: transparent
  z-index: 1
  transition: background 200ms ease, border-color 200ms ease
</style>