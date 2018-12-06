# xb-ueditor 编辑器

集成百度编辑器。

## 基础用法

基础的编辑器用法。

<div class="demo-ueditor">
  <div style="margin-bottom:15px">
    <xb-button type="default" @click="handle('clear')">清空内容</xb-button>
    <xb-button type="default" @click="handle('add','123123')">追加内容</xb-button>
    <xb-button type="default" @click="handle('insert','<div>html代码</div>')">插入html</xb-button>
    <xb-button type="default" @click="handle('','纯文本内容')">插入内容</xb-button>
    <xb-button type="default" @click="handle('get','html')">获取html代码</xb-button>
    <xb-button type="default" @click="handle('get','')">获取纯文本内容</xb-button>
  </div>
  <p>{{this.htmlCnt}}</p>
  <div>
    <xb-ueditor ref="editor" @ready="editorReady" v-model="content" :config="config"></xb-ueditor>
  </div>
</div>


<script>
export default {
  data(){
    return{
      content: '123123123',
      config: {
        initialFrameHeight: 500,
        lang: 'zh-cn',
      },
      instance:'',
      htmlCnt:''
    }
  },
  methods: {
    //初始化编辑器
    editorReady (instance) {
        const that = this;
        this.instance = instance;
        instance.setContent(this.content);
        instance.addListener('contentChange', () => {
            this.content = instance.getContent();
        });
    },
    handle(type,txt){
      if(type == 'clear'){
        this.$refs.editor.setEmptyContent('');
      }else if(type == 'add'){
        this.$refs.editor.addContent(txt,true);
      }else if(type == 'insert'){
        this.$refs.editor.insertHtml(txt)
      }else if(type == 'get'){
        if(txt == 'html'){
          this.htmlCnt = this.$refs.editor.getHtmlSource();
        }else{
          this.htmlCnt = this.$refs.editor.getPlainContent();
        }
      }else{
        this.$refs.editor.setContent(txt)
      }
    }
  }
}
</script>

## 参数表 1
| 参数名   | 参数说明   | 类型   | 可选值   | 默认值   |
| :------- | :--------- | :----- | -------- | :------- |
| ready | 编辑器加载完毕的回调方法 | 方法 | 无 | 无 |
| config | 编辑器相关配置 | 对象 | 参考编辑器的相关配置 | 中文 |
