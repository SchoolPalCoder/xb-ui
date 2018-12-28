<template>
  <div>
    <textarea
      :name="name"
      :id="id"
      :value="value"
      :types="types"
      :config="config"
      :disabled="readOnlyMode">
    </textarea>
  </div>
</template>


<script lang="ts">
//import "../static/ckeditor/ckeditor.js";
import {seriesLoadScripts} from '../../../src/utils/utils';
import { Component, Prop, Watch, Mixins, Vue } from "vue-property-decorator";
import Locale from "../../../src/mixins/locale";
import XbIcon from "../../xb-icon";
const prefixCls = "xbui-ckeditor";
import { debug } from 'util';

let inc = new Date().getTime();

const defaultConfig = {
      height: 300,
      basePath: "http://127.0.0.1:8086/static/ckeditor/"
};

@Component({

  name: "XbCkeditor" ,
  components: {
    XbIcon
  }
})
export default class XbCkeditor extends Mixins(Locale) {
  prefixCls: string = prefixCls;
  instanceValue: string = '';

   // 编辑器名称
  @Prop({type: String, default: () => `editor-${++inc}`})
  name?: string;

  // 编辑器内容
  @Prop({type: String})
  value?: string;

   // 编辑器 ID
  @Prop({type: String, default: () => `editor-${inc}`})
  id?: string;

  // 编辑器样式类型
   @Prop({type: String, default: () => `classic`})
  types?: string;

  // 编辑器配置
  @Prop({ default: () => {
      return defaultConfig;
  },  type: Object})
  config?: object;

  // 编辑器加载后的回调方法
  @Prop({type: Function})
  instanceReadyCallback!: () => void;

  // 是否可编辑
  @Prop({type: Boolean, default: false})
  readOnlyMode?: boolean;


  initUeditor() {
    window.CKEDITOR_BASEPATH  = "http://127.0.0.1:8086/static/ckeditor";
    CKEDITOR.basePath  = "http://127.0.0.1:8086/static/ckeditor/";

    if (typeof CKEDITOR === 'undefined') {

      console.log('CKEDITOR is missing (http://ckeditor.com/)');
    } else {

      if (this.types === 'inline') {
        CKEDITOR.inline(this.id, this.config);
      } else {
        CKEDITOR.replace(this.id, this.config);
      }

      this.instance.setData(this.value);

      this.instance.on('instanceReady', () => {
        this.instance.setData(this.value);
      });

      // Ckeditor change event
      this.instance.on('change', this.onChange);

      // Ckeditor mode html or source
      this.instance.on('mode', this.onMode);

      // Ckeditor blur event
      this.instance.on('blur', (evt) => {
        this.$emit('blur', evt);
      });

      // Ckeditor focus event
      this.instance.on('focus', (evt) => {
          this.$emit('focus', evt);
      });

      // Ckeditor contentDom event
      this.instance.on('contentDom', (evt) => {
        this.$emit('contentDom', evt);
      });

      // Ckeditor dialog definition event
      CKEDITOR.on('dialogDefinition', (evt) => {
          this.$emit('dialogDefinition', evt);
      });

      // Ckeditor file upload request event
      this.instance.on('fileUploadRequest', (evt) => {
          this.$emit('fileUploadRequest', evt);
      });

      // Ckditor file upload response event
      this.instance.on('fileUploadResponse', (evt) => {
          setTimeout(() => {
            this.onChange();
          }, 0);
          this.$emit('fileUploadResponse', evt);
      });

      // Listen for instanceReady event
      if (typeof this.instanceReadyCallback !== 'undefined') {
        this.instance.on('instanceReady', this.instanceReadyCallback);
      }

    }
  }

  mounted(){

     seriesLoadScripts(['../static/ckeditor/ckeditor.js'], this.initUeditor);




  }
   get instance(){
    return CKEDITOR.instances[this.id];
  }

  update(val) {
    if (this.instanceValue !== val) {
      this.instance.setData(val, { internal: false });
    }
  }

  destroy() {
      try {
        const editor = window['CKEDITOR'];
        if (editor.instances) {
          for (const instance in editor.instances) {
            if ( instance ) {
              instance.destroy();
            }
          }
        }
      } catch (e) {
        debug(e);
      }
  }

  onMode() {
    if (this.instance.mode === 'source') {
      const editable = this.instance.editable();
      editable.attachListener(editable, 'input', () => {
        this.onChange();
      });
    }
  }

  onChange() {
    const html = this.instance.getData();
    if (html !== this.value) {
      this.$emit('input', html);
      this.instanceValue = html;
    }
  }


}
</script>

