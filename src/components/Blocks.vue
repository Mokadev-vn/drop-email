<template>
  <div>
    <div
      v-for="(row, i) in rowsOfComponents"
      class="columns has-text-centered"
      :key="i"
    >
      <div
        v-for="el in row"
        class="column draggable"
        :data-key="el.key"
        :key="el.key"
      >
        <div class="element">
          <i v-if="el.icon" class="fas" :class="el.icon"></i>
          <p>{{ el.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InteractJS from "interactjs";

export default {
  name: "Blocks",

  props: {
    draggable: Object,
  },

  data() {
    return {
      rowsOfComponents: {
        first: [this.draggable.text, this.draggable.image],
        second: [this.draggable.divider, this.draggable.button],
        third: [this.draggable.space, this.draggable.links],
        fourth: [this.draggable.test, this.draggable.html],
      },
    };
  },

  mounted() {
    this.makeComponentsDraggable();
  },

  methods: {
    makeComponentsDraggable() {
      InteractJS(".draggable").draggable({
        onmove: dragMoveListener,

        onend: function (event) {
          var target = event.target;
          target.style.webkitTransform = target.style.transform =
            "translate(0px, 0px)";

          target.classList.remove("moving");

          target.setAttribute("data-x", 0);
          target.setAttribute("data-y", 0);
        },
      });

      function dragMoveListener(event) {
        var target = event.target;

        var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
        var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

        target.classList.add("moving");

        target.style.webkitTransform = target.style.transform =
          "translate(" + x + "px, " + y + "px)";

        target.setAttribute("data-x", x);
        target.setAttribute("data-y", y);
      }

      window.dragMoveListener = dragMoveListener;
    },
  },
};
</script>

<style lang="sass">
@import '../assets/sass/library'

.column
  margin: 5px
  height: 70px
  font-size: 12px
  font-weight: 600
  background: whitesmoke
  color: rgb(80, 86, 89)
  padding: 0px
  &.draggable
    z-index: 9999
    padding: 0

.element
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  overflow-wrap: break-word
  text-overflow: ellipsis
  white-space: pre
  overflow: hidden
  text-transform: uppercase
  height: 100%
  width: 100%
  background-color: white
  border: 1px solid $gray
  border-radius: 4px
  transition: all 300ms ease
  .fas
    font-size: 25px
    display: block
  &:hover
    cursor: grab
    border-color: $blue
    box-shadow: rgb(0 0 0 / 35%) 0px 6px 10px
    transition: border-color 300ms ease
  &.moving
    cursor: grab

.can-drop
  z-index: 1
  transition: background 300ms
  border-radius: 4px
  .element
    background-color: $green
    border-color: transparent
    border-radius: 4px
    color: white
    transition: all 300ms ease
</style>