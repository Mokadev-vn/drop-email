<template>
  <div class="fill">
    <div
      class="component-container"
      :class="customContainerClasses(el, index)"
      :data-index="index"
      :tag="containerID"
      @click="edit"
    >
      <div class="icons">
        <i
          class="fas fa-edit"
          @click="edit"
          aria-hidden="true"
          title="Edit Component"
        ></i>
        <i
          class="fas fa-clone"
          @click="clone"
          aria-hidden="true"
          title="Clone Component"
        ></i>
        <i
          class="far fa-trash-alt"
          @click="destroy"
          aria-hidden="true"
          title="Delete Component"
        ></i>
      </div>
      <component :is="componentKey" :el="el"></component>
    </div>
  </div>
</template>

<script>
import InteractJS from "interactjs";
import Global from "../helper.js";
import Text from "./Text";
import Test from "./Test";
import Image from "./Image";
import Divider from "./Divider";
import Button from "./Button";
import Space from "./Space";
import Links from "./Links";
import Html from "./Html";

export default {
  name: "Component",

  props: {
    dropped: Array,
    el: Object,
    index: Number,
    isSibling: Boolean,
  },

  components: {
    "k-text": Text,
    "k-divider": Divider,
    "k-image": Image,
    "k-button": Button,
    "k-space": Space,
    "k-links": Links,
    "k-test": Test,
    "k-html": Html,
  },

  data() {
    return {};
  },

  mounted() {
    this.makeContainersResizable();

    Global.listen("component-added", () => {
      this.makeContainersResizable();
    });
  },

  computed: {
    componentKey() {
      return `k-${this.el.key}`;
    },

    containerID() {
      if (this.isSibling) {
        return `${this.index}-sibling`;
      }
      return `${this.index}`;
    },
  },

  methods: {
    destroy() {
      let check = confirm("Bạn có chắc muốn xóa nó!");
      if (check) {
        Global.emit("destroy-component", {
          index: this.index,
          isSibling: this.isSibling,
        });
      }
    },

    edit() {
      Global.emit("edit-component", {
        index: this.index,
        isSibling: this.isSibling,
      });
    },

    clone() {
      Global.emit("clone-component", {
        index: this.index,
        isSibling: this.isSibling,
      });
    },

    customContainerClasses(el) {
      return {
        paddingT30: el.marginTop === "a lot",
        paddingT15: el.marginTop === "some",
        paddingT5: el.marginTop === "a little",
        paddingT0: el.marginTop === "none",
        paddingB30: el.marginBottom === "a lot",
        paddingB15: el.marginBottom === "some",
        paddingB5: el.marginBottom === "a little",
        paddingB0: el.marginBottom === "none",
        "has-text-centered": el.justify === "centered",
        "has-text-right": el.justify === "right",
        "has-text-left": el.justify === "left",
        resizable: !el.frozen,
      };
    },

    makeContainersResizable() {
      let self = this;
      InteractJS(".resizable")
        .resizable({
          edges: { left: true, right: true },
          onstart: function (event) {
            event.target.classList.add("resizing");
          },
          onend: function (event) {
            event.target.classList.remove("resizing");
          },
        })
        .on("resizemove", function (event) {
          let index = parseInt(event.target.getAttribute("data-index"));
          let isSibling = self.targetIsSibling(event.target);

          if (self.index !== index && self.isSibling !== isSibling) {
            return;
          }

          let width = event.rect.width;
          let upperLimit = self.howWideCanContainerBe(event.target);

          if (width > upperLimit || width < 300) {
            return;
          }

          if (width > 600) {
            Global.emit("destroy-dropzone", index);
          } else if (width <= 600) {
            self.createAnotherDropzoneInsideContainer(event.target);
          }

          let target = event.target;
          target.style.width = event.rect.width + "px";

          let x = parseFloat(target.getAttribute("data-x")) || 0;
          x += event.deltaRect.left;

          target.setAttribute("data-x", x);
        });
    },

    createAnotherDropzoneInsideContainer(container) {
      let index = parseInt(container.getAttribute("data-index"));

      if (!this.dropped[index].sibling && !this.isSibling) {
        Global.emit("create-dropzone", index);
      }
    },

    targetIsSibling(container) {
      return container.getAttribute("tag").includes("sibling");
    },

    howWideCanContainerBe() {
      let limit = 900;
      let otherMember = "";
      if (this.isSibling) {
        otherMember = document.querySelector(`[tag="${this.index}"]`);
      } else {
        otherMember = document.querySelector(`[tag="${this.index}-sibling"]`);
      }

      if (otherMember) {
        limit -= otherMember.offsetWidth;
      }
      return limit;
    },
  },
};
</script>

<style lang="sass">
@import '../assets/sass/library'

.fill
  width: 100%
  display: inline-block
  z-index: 1

.component-container
  position: relative
  width: 100%
  border: 1px dashed transparent
  transition: border-color 200ms ease
  &:hover
    border-color: $gray
    transition: border-color 200ms ease
    .icons
      opacity: 1
      transition: opacity 200ms ease
  &.resizing
    border-color: $gray
    transition: border-color 200ms ease
    .icons
      opacity: 0
      transition: all 300ms ease

.highlighted .component-container
  border-color: $green
  transition: border-color 200ms ease

.being-edited .component-container
  border-color: $red
  transition: border-color 200ms ease

.icons
  position: absolute
  display: flex
  flex-flow: row
  align-items: center
  justify-content: center
  top: 1px
  right: 5px
  color: $blue
  padding: 4px
  z-index: 9999
  background: white
  opacity: 0
  transition: opacity 200ms ease
  .fas, .far
    flex: 1
    font-size: 17px
    margin: 0 5px
    &:hover
      cursor: pointer
      color: $bright-blue

.paddingT30
  padding-top: 30px
.paddingT15
  padding-top: 15px
.paddingT5
  padding-top: 5px
.paddingT0
  padding-top: 0

.paddingB30
  padding-bottom: 30px
.paddingB15
  padding-bottom: 15px
.paddingB5
  padding-bottom: 5px
.paddingB0
  padding-bottom: 0
</style>