<template>
  <div id="app">
    <div class="container-fluid h-100">
      <div class="content row">
        <div class="render col-9 h-100">
          <preview :dropped="dropped"></preview>
        </div>
        <div class="action col-3">
          <toolbar :draggable="components" :dropped="dropped"></toolbar>
        </div>
      </div>
    </div>
    <div class="control-btn">
      <div @click="previewMobile"><i class="fas fa-mobile"></i></div>
      <div @click="previewDesktop"><i class="fas fa-desktop"></i></div>
    </div>
  </div>
</template>

<script>
import Global from "./helper.js";
import Toolbar from "./Toolbar.vue";
import Preview from "./Preview.vue";

export default {
  name: "App",

  components: {
    Toolbar,
    Preview,
  },

  data() {
    return {
      dropped: [],
      autoEdit: true,
      autoSave: true,
      components: {
        text: {
          key: "text",
          icon: "fa-font",
          name: "Text",
          justify: "left",
          marginTop: "none",
          marginBottom: "none",
          fontSize: "medium",
          color: "black",
          text: "Your text goes here...",
          bold: false,
          italic: false,
        },
        image: {
          key: "image",
          icon: "fa-image",
          name: "Image",
          justify: "centered",
          marginTop: "a little",
          marginBottom: "a little",
          caption: "",
          height: "300",
          src: "http://fpoimg.com/550x300?text=First",
        },
        button: {
          key: "button",
          icon: "fa-ad",
          name: "Button",
          justify: "centered",
          marginTop: "a little",
          marginBottom: "a little",
          label: "Click me!",
          color: "blue",
        },
        links: {
          key: "links",
          name: "Social links",
          marginTop: "some",
          marginBottom: "none",
          frozen: true,
          links: ["fa-facebook", "fa-twitter", "fa-instagram"],
        },
        divider: {
          key: "divider",
          icon: "fa-minus",
          name: "Divider",
          marginTop: "none",
          marginBottom: "none",
        },
        space: {
          key: "space",
          icon: "fa-arrows-alt-v",
          name: "Space",
          marginTop: "a little",
          marginBottom: "a little",
        },
        layout: {
          key: "layout",
          icon: "fa-columns",
          name: "Layout",
          marginTop: "none",
          marginBottom: "none",
          col: 2,
          content: []
        },
        html: {
          key: "html",
          icon: "fa-code",
          name: "Code HTML",
          marginTop: "none",
          marginBottom: "none",
          code: "<h2>Enter your code here</h2>",
        },
      },
    };
  },

  mounted() {
    this.load();

    Global.listen("save", () => {
      this.save();
    });
    Global.listen("component-dropped", (event) => {
      console.log(event);
      this.addComponent(event);
      this.save();
    });
    Global.listen("destroy-component", (index) => {
      this.destroy(index);
      this.save();
    });
    Global.listen("edit-component", (index) => {
      this.edit(index);
      this.save();
    });
    Global.listen("clone-component", (index) => {
      this.clone(index);
      this.save();
    });
    Global.listen("create-dropzone", (index) => {
      this.createDropzoneNextToComponent(index);
      this.save();
    });
    Global.listen("destroy-dropzone", (index) => {
      this.destroyDropzoneNextToComponent(index);
      this.save();
    });

    Global.listen("edit-child", (index) => {
      this.edit(index)
      this.save();
    })
  },

  watch: {
    autoSave(val) {
      if (val) {
        this.save();
      } else {
        localStorage.setItem("autoSave", JSON.stringify(false));
        this.deleteStorage();
      }
    },

    autoEdit() {
      this.save();
    },
  },

  methods: {
    load() {
      this.dropped = localStorage.getItem("dropped")
        ? JSON.parse(localStorage.getItem("dropped"))
        : [];
      this.autoSave = localStorage.getItem("autoSave")
        ? JSON.parse(localStorage.getItem("autoSave"))
        : true;
      this.autoEdit = localStorage.getItem("autoEdit")
        ? JSON.parse(localStorage.getItem("autoEdit"))
        : false;
    },

    save() {
      if (this.autoSave) {
        localStorage.setItem("dropped", JSON.stringify(this.dropped));
        localStorage.setItem("autoSave", JSON.stringify(this.autoSave));
        localStorage.setItem("autoEdit", JSON.stringify(this.autoEdit));
      }
    },

    deleteStorage() {
      localStorage.removeItem("dropped");
      localStorage.removeItem("autoEdit");
    },

    addComponent(event) {
      let index = parseInt(event.target.getAttribute("data-index"));
      let key = event.relatedTarget.getAttribute("data-key");
      let isSibling = event.target.getAttribute("sibling") != null;
      let content = event.target.getAttribute("content") != null;

      if (content) {
        let data = this.components[key]
        let start = this.dropped[index].content.length
        this.dropped[index].content.splice(
          start,
          0,
          JSON.parse(JSON.stringify(data))
        );
        console.log(this.dropped)
      }else if (isSibling) {
        this.dropped[index].hasDropzone = false;
        let temp = JSON.parse(JSON.stringify(this.dropped[index]));
        temp.sibling = this.components[key];
        this.$set(this.dropped, index, temp);
      } else {
        this.dropped.splice(
          index,
          0,
          JSON.parse(JSON.stringify(this.components[key]))
        );
        this.dropped[index].index = index;
      }

      Global.emit("component-added", index);
      Global.emit("highlight-container", index);

      if (this.autoEdit) {
        Global.emit("editing-component", {
          index: index,
          isSibling: isSibling,
        });
      }
    },

    destroy(data) {
      if (data.isSibling) {
        let temp = JSON.parse(JSON.stringify(this.dropped[data.index]));
        temp.sibling = undefined;
        this.$set(this.dropped, data.index, temp);
      } else if (this.dropped[data.index].sibling) {
        let temp = JSON.parse(JSON.stringify(this.dropped[data.index].sibling));
        this.$set(this.dropped, data.index, temp);
      } else {
        this.dropped.splice(data.index, 1);
      }
    },

    edit(data) {
      Global.emit("editing-component", {
        index: data.index,
        isSibling: data.isSibling,
        child: (data.child) ? data.child : null
      });
    },

    clone(data) {
      let newIndex = data.index + 1;
      if (data.isSibling) {
        let copy = JSON.parse(JSON.stringify(this.dropped[data.index].sibling));
        copy.index = newIndex;
        this.dropped.splice(newIndex, 0, copy);
      } else {
        let copy = JSON.parse(JSON.stringify(this.dropped[data.index]));
        copy.sibling = undefined;
        copy.index = newIndex;
        this.dropped.splice(newIndex, 0, copy);
      }

      Global.emit("component-added", {
        index: newIndex,
        isSibling: data.isSibling,
      });
      Global.emit("highlight-container", newIndex);

      if (this.autoEdit) {
        Global.emit("editing-component", {
          index: newIndex,
          isSibling: data.isSibling,
        });
      }
    },

    createDropzoneNextToComponent(index) {
      if (this.dropped[index].hasDropzone || this.dropped[index].sibling) {
        Global.emit("highlight-container", index);
        return;
      }

      let temp = JSON.parse(JSON.stringify(this.dropped[index]));
      temp.hasDropzone = true;

      this.$set(this.dropped, index, temp);
      Global.emit("highlight-container", index);
    },

    destroyDropzoneNextToComponent(index) {
      let temp = JSON.parse(JSON.stringify(this.dropped[index]));
      temp.hasDropzone = false;

      this.$set(this.dropped, index, temp);
    },
    show() {
      console.log(this.dropped);
    },

    previewMobile() {
      let preview = document.querySelector(".preview-wrapper");
      preview.style.width = "300px";
      preview.style.transition = "width 1s";
      let temp = document.querySelectorAll(".size-component")
      for(let i = 0; i < temp.length; i++){
        temp[i].classList.remove("size-component")
      }

    },

    previewDesktop() {
      let preview = document.querySelector(".preview-wrapper");
      preview.style.width = "900px";
      preview.style.transition = "width 1s";
      let temp = document.querySelectorAll(".component-container")
      for(let i = 0; i < temp.length; i++){
        temp[i].classList.add("size-component")
      }
    },
  },
};
</script>

<style lang="sass">
@import '../node_modules/bulma/bulma'
@import './assets/sass/library'

#app,
.content,
.container
  height: 100%

.app-wrapper
  margin: 0 auto
  max-width: 1000px
  margin-top: 100px
  height: 900px

.app-heading
  margin-bottom: 20px
  .title
    color: $blue

.app-control
  padding-left: 35px
  padding-bottom: 10px
  background: white
  &:not(:last-child)
    margin: 0

render,
.action
  border: 1px solid rgb(165, 163, 163)

.render
  position: absolute
  inset: 0px 425px 0px 0px
  background-color: rgb(255, 255, 255)
  background-image: linear-gradient(45deg, rgb(247, 247, 247) 25%, transparent 25%),linear-gradient(-45deg, rgb(247, 247, 247) 25%, transparent 25%),linear-gradient(45deg, transparent 75%, rgb(247, 247, 247) 75%),linear-gradient(-45deg, transparent 75%, rgb(247, 247, 247) 75%)
  background-size: 20px 20px
  background-position: 0px 0px, 0px 10px, 10px -10px, -10px 0px
  overflow: scroll
  padding: 15px
.action
  background: #f7f7f7
.render-body
  height: 100%
  background-color: white
.control-btn
  position: fixed
  left: 12px
  right: auto
  bottom: 12px
  z-index: 105
  border: 1px solid rgb(59, 62, 67)
  background-color: rgb(41, 48, 57)
  padding: 0px 5px
  color: white
  div
    display: inline-block
    font-size: 25px
    margin: 0 10px
    cursor: pointer
</style>
