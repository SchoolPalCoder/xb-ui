# xbLimit 限制输入域
----
### 基础用法
xbLimit 可以控制用户输入的字符数，```placeholder``` 指定初始输入的提示文案

::: demo
```html

<xb-limit v-mode="content" :max-len="10" placeholder="最多输入10个字符"></xb-limit>

```
:::


### 裁剪超出字符
如果超过了限制的字符数，超过部分进行裁剪


::: demo
```html

<xb-limit v-mode="content" :max-len="10" placeholder="最多输入10个字符" is-cut></xb-limit>

```
:::

### 列高
通过 ```rows``` 属性指定```limit```的高度


:::demo
```html

<xb-limit :max-len="10" :rows="3" placeholder="最多输入10个字符"></xb-limit>

```
:::

<script>
export default {
  data() {
    return {
      content: ''
    };
  }
}
</script>


## API


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
      <td>rows</td>
      <td>列高</td>
      <td>Number</td>
      <td>-</td>
      <td>4</td>
    </tr>
    <tr>
      <td>max-len</td>
      <td>Number</td>
      <td>最大长度限制</td>
      <td>-</td>
      <td>false</td>
    </tr>
    <tr>
      <td>is-cut</td>
      <td>超出字符是否裁剪</td>
      <td>Boolean</td>
      <td>-</td>
      <td>false</td>
    </tr>
    <tr>
      <td>placeholder</td>
      <td>输入时需要显示的提示文案</td>
      <td>String</td>
      <td>-</td>
      <td>请输入内容</td>
    </tr>
  </tbody>
</table>
## xbLimit 事件

| 事件名称      | 说明          | 返回值  |
|---------- |-------------- |---------- |
| overText | 超出限制长度触发 | content |
|change   | 在 Input 值改变时触发| value |
