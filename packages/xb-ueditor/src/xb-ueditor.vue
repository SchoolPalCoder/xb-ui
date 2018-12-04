<template>
  <div>
      <div :id="randomNumber" name="content" type="text/plain"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import {seriesLoadScripts} from '../../../src/utils/utils';

@Component
export default class XbUeditor extends Vue {

  instance:Object = null;
  randomNumber:string = '';

  /** 编辑器配置 */
  @Prop({ default: ()=>{} })
  config!: Object;

  /** 编辑器内容 */
  @Prop({ default: "" })
  content!: string;

  /** 编辑器ID
  @Prop({ default: '' })
  randomNumber!: string;*/

  /** 编辑器对象
  @Prop({ default: null })
  instance!: Object;*/


  mounted(){
    //判断编辑器对象存不存在
    if(window.UE){
      console.log('已经初始化');
      this.initUeditor();
    }else{
       console.log('未初始化');
      this.loadUeditorJs();
    }

  }
  beforeDestroy(){
    // 组件销毁的时候，要销毁 UEditor 实例
    if (this.instance !== null && this.instance.destroy) {
      this.instance.destroy();
    }
  }

  //初始化编辑器
  initUeditor(){
    const that  =this;
    if(!that.randomNumber){
        //生成随机ID
        that.randomNumber = 'editor_' + Math.random().toString(6).substring(2);
    }
    if(!this.instance){
      this.$nextTick(()=>{
           this.instance = window.UE.getEditor(that.randomNumber, that.config);
              console.log(UE);
           // 绑定事件，当 UEditor 初始化完成后，将编辑器实例通过自定义的 ready 事件交出去
            this.instance.addListener('ready', () => {
              this.$emit('ready', this.instance);

            });
      })
    }


  }
  loadUeditorJs(){
    let jsUrl = [
      "../../../src/assets/ueditor/ueditor.config.js",
      "../../../src/assets/ueditor/ueditor.all.min.js",
      "../../../src/assets/ueditor/lang/zh-cn/zh-cn.js",
      "../../../src/assets/ueditor/lang/en/en.js",
    ];
    let that = this;
    seriesLoadScripts(jsUrl,that.initUeditor);
  }

  //追加内容
  setContent(text) {
      this.instance.setContent(text, true);
  }
  addContent(content) {
      this.instance.setContent(content);
  }
  //清空文本
  setEmptyContent() {
      this.instance.setContent('');
  }
  //插入HTML内容
  insertHtml(content) {
      this.instance.execCommand('insertHtml', content);
  }

}
</script>
