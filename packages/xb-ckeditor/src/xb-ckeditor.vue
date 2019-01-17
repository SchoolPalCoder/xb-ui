<template>
  <div>
    <textarea
      :id="randomNumber"
      :value="value"
      :types="types"
      :config="defaultConfig"
      :disabled="readOnlyMode"
    ></textarea>
  </div>
</template>


<script lang="ts">
import { seriesLoadScripts } from "../../../src/utils/utils";
import { Component, Prop, Watch, Mixins, Vue } from "vue-property-decorator";
import Locale from "../../../src/mixins/locale";
import { debug } from "util";

@Component
export default class XbCkeditor extends Mixins(Locale) {
  instance: object = {};
  randomNumber: string = "";
  defaultConfig: object = {
    height: 300,
    basePath: "./static/ckeditor/",
    toolbarGroups: [
      { name: "styles", groups: ["styles"] },
      { name: "basicstyles", groups: ["basicstyles", "cleanup"] },
      { name: "paragraph", groups: ["list", "blocks", "indent", "align", "bidi", "paragraph"] },
      { name: "clipboard", groups: ["clipboard", "undo"] },
      { name: "editing", groups: ["find", "selection", "spellchecker", "editing"] },
      { name: "links", groups: ["links"] },
      { name: "insert", groups: ["insert"] },
      { name: "forms", groups: ["forms"] },
      { name: "tools", groups: ["tools"] },
      { name: "document", groups: ["mode", "document", "doctools"] },
      { name: "others", groups: ["others"] },
      { name: "colors", groups: ["colors"] },
      { name: "about", groups: ["about"] },
    ],
    removeButtons: "Subscript,Superscript,Strike,About,Indent,Outdent,Scayt",
  };

  // 编辑器内容
  @Prop({ type: String })
  value?: string;

  // 编辑器 ID
  @Prop({ type: String })
  id?: string;

  // 编辑器样式类型
  @Prop({ type: String, default: () => `classic` })
  types?: string;

  // 编辑器配置
  @Prop({ type: Object })
  config?: object;

  // 编辑器加载后的回调方法
  @Prop({ type: Function })
  instanceReadyCallback!: () => void;

  // 是否可编辑
  @Prop({ type: Boolean, default: false })
  readOnlyMode?: boolean;

  created() {
    this.defaultConfig = (this.config && Object.assign(this.config, this.defaultConfig)) || this.defaultConfig;
  }

  mounted() {
    // 判断编辑器对象存不存在
    if (window.CKEDITOR) {
      this.init();
    } else {
      this.load();
    }
  }

  init() {
    const that = this;

    if (!this.randomNumber) {
      this.randomNumber =
        "ckeditor_" +
        Math.random()
          .toString(6)
          .substring(2);
    }

    this.$nextTick(() => {
      if (that.types === "inline") {
        this.instance = CKEDITOR.inline(that.randomNumber, that.defaultConfig);
      } else {
        this.instance = CKEDITOR.replace(that.randomNumber, that.defaultConfig);
      }

      this.instance.setData(this.value);

      this.instance.on("instanceReady", () => {
        this.instance.setData(this.value);
      });

      // Ckeditor change event
      this.instance.on("change", this.onChange);

      // Ckeditor mode html or source
      this.instance.on("mode", this.onMode);

      // Ckeditor blur event
      this.instance.on("blur", (evt) => {
        this.$emit("blur", evt);
      });

      // Ckeditor focus event
      this.instance.on("focus", (evt) => {
        this.$emit("focus", evt);
      });

      // Ckeditor contentDom event
      this.instance.on("contentDom", (evt) => {
        this.$emit("contentDom", evt);
      });

      // Ckeditor file upload request event
      this.instance.on("fileUploadRequest", (evt) => {
        this.$emit("fileUploadRequest", evt);
      });

      // Ckditor file upload response event
      this.instance.on("fileUploadResponse", (evt) => {
        setTimeout(() => {
          this.onChange();
        }, 0);
        this.$emit("fileUploadResponse", evt);
      });

      // Listen for instanceReady event
      if (typeof this.instanceReadyCallback !== "undefined") {
        this.instance.on("instanceReady", this.instanceReadyCallback);
      }
    });
  }

  load() {
    const jsUrl = ["../static/ckeditor/ckeditor.js", "../static/ckeditor/lang/zh-cn.js"];
    if (this.defaultConfig.language && this.defaultConfig.language === "en") {
      jsUrl.splice(jsUrl.length - 1, 1);
      jsUrl.push("../static/ckeditor/lang/en.js");
    }
    seriesLoadScripts(jsUrl, this.init);
  }

  destroy() {
    try {
      const editor = window["CKEDITOR"];
      if (editor.instances) {
        for (const instance in editor.instances) {
          if (instance) {
            instance.destroy();
          }
        }
      }
    } catch (e) {
      debug(e);
    }
  }

  onMode() {
    if (this.instance.mode === "source") {
      const editable = this.instance.editable();
      editable.attachListener(editable, "input", () => {
        this.onChange();
      });
    }
  }

  onChange() {
    const html = this.instance.getData();
    if (html !== this.value) {
      this.$emit("input", html);
    }
  }
}
</script>

