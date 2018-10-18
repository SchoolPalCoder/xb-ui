<style>
.dome-alert .xb-alert:not(:first-child){
  margin-top: 10px;
}
</style>

<script>
 export default {
    methods: {
      hello() {
        alert('Hello World!');
      }
    }
  }
</script>

# xbAlert 警告 #

----
用于页面中展示重要的提示信息。

### 基本用法 ###

页面中的非浮层元素，不会自动消失。


::: demo

```html

<div>
  <xb-alert type="success">成功提示的文案</xb-alert>
  <xb-alert type="info">消息提示的文案</xb-alert>
  <xb-alert type="warning" title="警告提示的文案"></xb-alert>
  <xb-alert type="error" title="错误提示的文案"></xb-alert>
</div>

```
:::

### 带有 icon


::: demo
```html

<div>
  <xb-alert type="success" xb-icon>成功提示的文案</xb-alert>
  <xb-alert type="info" xb-icon>消息提示的文案</xb-alert>
  <xb-alert type="warning" xb-icon>警告提示的文案</xb-alert>
  <xb-alert type="error" xb-icon>错误提示的文案</xb-alert>
</div>

```
:::

### 文字居中


::: demo
```html

<div>
  <xb-alert type="success" center xb-icon>成功提示的文案</xb-alert>
  <xb-alert type="info" center xb-icon>消息提示的文案</xb-alert>
  <xb-alert type="warning" center xb-icon>警告提示的文案</xb-alert>
  <xb-alert type="error" center xb-icon>错误提示的文案</xb-alert>
</div>

```
:::

### 自定义关闭按钮

::: demo
```html

<div class="dome-alert demo-block">
  <xb-alert type="success" :closable="false">不可关闭的 alert</xb-alert>
  <xb-alert type="info" close-text="知道了">自定义关闭的 alert</xb-alert>
  <xb-alert type="warning" @close="hello">设置了回调的 alert</xb-alert>
</div>

```
:::


::: demo
```html

<div class="dome-alert demo-block">
  <xb-alert type="success"
           description="这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。 黑灰化肥会挥发发灰黑化肥黑灰……">带辅助性文字介绍</xb-alert>
  <xb-alert type="info" xb-icon
           description="这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。 黑灰化肥会挥发发灰黑化肥黑灰……">带有 icon 和辅助性文字介绍</xb-alert>
</div>

```
:::

### Attributes
<table class="table">
  <thead>
    <tr>
      <th width="25%">参数</th>
      <th width="25%">说明</th>
      <th width="25%">类型</th>
      <th width="25%">可选值</th>
      <th width="25%">默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>title</td>
      <td>标题，必选参数。也可通过默认 slot 传入</td>
      <td>string</td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td>type</td>
      <td>辅助性文字</td>
      <td>String</td>
      <td>success/warning/info/error|	info</td>
      <td>-</td>
    </tr>
    <tr>
      <td>description</td>
      <td>辅助性文字</td>
      <td>string</td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td>closable</td>
      <td>是否可关闭</td>
      <td>Boolean</td>
      <td>-</td>
      <td>true</td>
    </tr>
    <tr>
      <td>center</td>
      <td>文字是否居中</td>
      <td>Boolean</td>
      <td>-</td>
      <td>true</td>
    </tr>
    <tr>
      <td>close-text</td>
      <td>关闭按钮自定义文本</td>
      <td>string</td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td>shoxb-icon</td>
      <td>是否显示图标</td>
      <td>Boolean</td>
      <td>-</td>
      <td>false</td>
    </tr>
  </tbody>
</table>

### xbEvent
| 事件名称      | 说明       | 回调参数    |
|------------- |----------- |---------  |
|close         |关闭alert时触发的事件| —  |

