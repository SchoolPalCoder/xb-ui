# xbShowMore 显示更多
----

### 基础用法
文本超出显示长度，折叠起来，通过len属性显示从何处开始折叠。


::: demo
```html

 <xb-showmore 
   :len='10' 
   text='文本超出显示长度，折叠起来，通过len属性显示从何处开始折叠'>
 </xb-showmore>

```
:::

### 高级用法
文本超出显示长度，折叠起来，展开后，可以通过```allow-fold```指定是否需要收起，也可通过```show-text```设置折叠时的文案，通过```hidden-text```设置收起的文案


::: demo
```html

 <xb-showmore allow-fold
   :len='10' 
   show-text='show'
   hidden-text='hidden'
   text='文本超出显示长度，折叠起来，通过len属性显示从何处开始折叠'>
 </xb-showmore>

```
:::

## API
<table class="table">
  <thead>
    <tr>
      <th width="20%" nowrap="nowrap">参数</th>
      <th width="20%" nowrap="nowrap">说明</th>
      <th width="20%" nowrap="nowrap">类型</th>
      <th width="20%" nowrap="nowrap">可选值</th>
      <th width="20%" nowrap="nowrap">默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>len</td>
      <td>显示文本的长度</td>
      <td>Number</td>
      <td>-</td>
      <td>-1(不进行折叠)</td>
    </tr>
    <tr>
      <td>text</td>
      <td>类型</td>
      <td>String</td>
      <td>-</td>
      <td></td>
    </tr>
    <tr>
      <td>show-text</td>
      <td>折叠时需要显示文案</td>
      <td>String</td>
      <td>-</td>
      <td>显示更多</td>
    </tr>
    <tr>
      <td>hidden-text</td>
      <td>隐藏时需要显示文案</td>
      <td>String</td>
      <td>-</td>
      <td>隐藏</td>
    </tr>
  </tbody>
</table>
