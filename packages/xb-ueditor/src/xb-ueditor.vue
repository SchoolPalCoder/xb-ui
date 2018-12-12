<template>
  <div>
      <div :id="randomNumber" name="content" type="text/plain" ></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import {seriesLoadScripts} from '../../../src/utils/utils';
import { debug } from 'util';

@Component
export default class XbUeditor extends Vue {

  instance: object = {};
  randomNumber: string = '';
  defaultConfig = {
        initialFrameHeight: 400,
        serverUrl: '/', // 图片视频上传地址配置
        UEDITOR_HOME_URL: './src/assets/ueditor/',
        toolbars: [
            [
                'source',
                'undo', //撤销
                'redo', //重做
                'bold', //加粗
                'italic', //斜体
                'underline', //下划线
                'strikethrough', //删除线
                'subscript', //下标
                'fontborder', //字符边框
                'superscript', //上标
                'selectall', //全选
                'horizontal', //分隔线
                'removeformat', //清除格式
                'time', //时间
                'date', //日期
                'fontsize', //字号
                'paragraph', //段落格式
                'simpleupload', //单图上传
                'link', //超链接
                'searchreplace', //查询替换
                'justifyleft', //居左对齐
                'justifyright', //居右对齐
                'justifycenter', //居中对齐
                'justifyjustify', //两端对齐
                'forecolor', //字体颜色
                'insertorderedlist', //有序列表
                'insertunorderedlist', //无序列表
                'lineheight', //行间距
                'inserttable', //插入表格
            ]
        ],
        zIndex: 10, // 编辑器层级
        charset: 'utf-8', // 编码
        autoHeightEnabled: false,
  };

  /** 编辑器配置 */
  @Prop({ default: {},  type: Object})
  config!: object;

  /** 编辑器内容 */
  @Prop({ default: "", type: String })
  content!: string;

  created(){
    // 合并配置
    this.defaultConfig = this.config && Object.assign(this.config, this.defaultConfig);
  }
  mounted(){
    // 判断编辑器对象存不存在
    if (window.UE) {
      this.initUeditor();
    } else {
      this.loadUeditorJs();
    }

  }
  beforeDestroy(){
    // 组件销毁的时候，要销毁 UEditor 实例
    if (this.instance !== null && this.instance.destroy) {
      this.instance.destroy();
    }
  }

  // 初始化编辑器
  initUeditor() {
    const that  = this;
    if (!that.randomNumber) {
        // 生成随机ID
        that.randomNumber = 'editor_' + Math.random().toString(6).substring(2);
    }
    if (JSON.stringify(this.instance) === "{}") {
      this.$nextTick(() => {
           this.instance = window.UE.getEditor(that.randomNumber, that.defaultConfig);
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
      "../../../src/assets/ueditor/lang/zh-cn/zh-cn.js"
    ];
    if(this.config.lang && this.config.lang == 'en'){
      jsUrl.splice(jsUrl.length-1,1);
      jsUrl.push("../../../src/assets/ueditor/lang/en/en.js");
    }
    const that = this;
    seriesLoadScripts(jsUrl, that.initUeditor);
  }

  // 追加内容
  addContent(text) {
      this.instance.setContent(text, true);
  }
  //设置内容
  setContent(content) {
      this.instance.setContent(content);
  }
  // 清空文本
  setEmptyContent() {
      this.instance.setContent('');
  }
  // 插入HTML内容
  insertHtml(content) {
      this.instance.execCommand('insertHtml', content);
  }
  getPlainContent(){
    return this.instance.getPlainTxt();
  }
  // 获取html源码
  getHtmlSource(){
    return this.instance.getContent();
  }
}
</script>
