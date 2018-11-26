# xb-message-tips 气泡提示

## 基础用法

基础的按钮用法。

<div class="demo-button">
  <div>
    <xb-button @click="showTips">显示普通提示</xb-button>
    <xb-button @click="showSuccess">显示成功提示</xb-button>
    <xb-button @click="showError">显示错误提示</xb-button>
    <xb-button @click="showWarning">显示警告提示</xb-button>
  </div>
</div>

```js

<xb-button on-click="showTips">显示普通提示</xb-button>;
<xb-button on-click="showSuccess">显示成功提示</xb-button>;
<xb-button on-click="showError">显示错误提示</xb-button>;
<xb-button on-click="showWarning">显示警告提示</xb-button>;

<script>
    export default {
        data () {
            return {

            }
        },
        methods:{
          showTips(){
            this.$message.info({
              text:'我是一个快乐的提示',
              duration:'20000',
              closable:true
            });
          },
          showSuccess(){
            this.$message.success({
              text:'我是一个成功提示',
              duration:'2000'
            });
          },
          showError(){
            this.$message.error({
              text:'我是一个错误的提示',
              duration:'2000'
            });
          },
          showWarning(){
            this.$message.warning({
              text:'我是一个警告的提示',
              duration:'2000'
            });
          }
        }
    }
</script>
```

<script>
    export default {
        data () {
            return {

            }
        },
        methods:{
          showTips(){
            console.log(this.$message)
            this.$message.info({
              text:'我是一个快乐的提示',
              duration:'20000',
              closable:true
            });
          },
          showSuccess(){
            this.$message.success({
              text:'我是一个成功提示',
              duration:'2000'
            });
          },
          showError(){
            this.$message.error({
              text:'我是一个错误的提示',
              duration:'2000'
            });
          },
          showWarning(){
            this.$message.warning({
              text:'我是一个警告的提示',
              duration:'2000'
            });
          }
        }
    }
</script>

## API

通过直接调用以下方法来使用组件：

this.\$message.info(config)

this.\$message.success(config)

this.\$message.warning(config)

this.\$message.error(config)

config 内容

| 属性     | 说明                     | 类型    | 默认值 |
| :------- | :----------------------- | :------ | :----- |
| text     | 提示文案修改             | String  | -      |
| duration | 自动关闭的延时，单位毫秒 | Number  | 2000   |
| closable | 是否显示关闭按钮         | Boolean | false  |
