<template>
  <div class="container">
    <div class="row">
      <div
        class="col dropzone"
        v-for="(col, i) in el.col"
        :key="col"
        :class="`col-${12 / el.col}`"
        :data-index="index"
        content="true"
        @click="edit(i)"
      >
        <div class="icons">
          <i
            class="fas fa-edit"
            @click="edit(i)"
            aria-hidden="true"
            title="Edit Component"
          ></i>
          <i
            class="far fa-trash-alt"
            @click="destroy(i)"
            aria-hidden="true"
            title="Delete Component"
          ></i>
        </div>
        <component
          v-if="el.content[i]"
          :is="'k-' + el.content[i].key"
          :el="el.content[i]"
        ></component>
      </div>
    </div>
  </div>
</template>

<script>
// import InteractJS from "interactjs";
import Global from "../helper"
import Text from "./Text";
import Image from "./Image";
import Divider from "./Divider";
import Button from "./Button";
import Space from "./Space";
import Links from "./Links";
import Html from "./Html";
import Layout from "./Layout";

export default {
  props: {
    el: Object,
    index: Number,
  },
  components: {
    "k-text": Text,
    "k-divider": Divider,
    "k-image": Image,
    "k-button": Button,
    "k-space": Space,
    "k-links": Links,
    "k-layout": Layout,
    "k-html": Html,
  },
  mounted() {
    console.log(this.el.content[0].key);
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

    edit(child) {
      Global.emit("edit-child", {
        index: this.index,
        child: child,
      });
    },
  },
  computed: {
    customStyling() {
      return {};
    },
  },
};
</script>

<style scoped>
.col {
  height: auto;
  min-height: 50px;
  border: 1px solid rgb(243, 241, 241);

}
</style>