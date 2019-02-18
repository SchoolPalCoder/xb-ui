# xb-table

---

<template>
    <xb-Table :columns="columns1" :data="data1"></xb-Table>
</template>

<script>
    module.exports = {
        data () {
            return {
                columns1: [
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
            }
        }
    }
</script>

```js
<template>
    <xb-table :columns="columns1" :data="data1"></xb-table>
</template>
<script>
    export default {
        data () {
            return {
                columns1: [
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
            }
        }
    }
</script>
```

<div class="api"><div class="anchor"><!----> <h2 id="API">API</h2> <!----> <!----> <!----> <!---->  <a href="#API">#</a></div> <div class="anchor"><!----> <!----> <h3 id="Table_props">Table props</h3> <!----> <!----> <!---->  <a href="#Table_props">#</a></div> <table><thead><tr><th>属性</th> <th>说明</th> <th>类型</th> <th>默认值</th></tr></thead> <tbody><tr><td>data</td> <td>显示的结构化数据，其中，字段 cellClassName 用于设置任意单元格的样式名称，因此数据不能使用该字段，详见示例<strong>特定样式</strong>。</td> <td>Array</td> <td>[]</td></tr> <tr><td>columns</td> <td>表格列的配置描述，具体项见后文</td> <td>Array</td> <td>[]</td></tr> <tr><td>stripe</td> <td>是否显示间隔斑马纹</td> <td>Boolean</td> <td>false</td></tr> <tr><td>border</td> <td>是否显示纵向边框</td> <td>Boolean</td> <td>false</td></tr> <tr><td>show-header</td> <td>是否显示表头</td> <td>Boolean</td> <td>true</td></tr> <tr><td>width</td> <td>表格宽度，单位 px</td> <td>Number | String</td> <td>自动</td></tr> <tr><td>height</td> <td>表格高度，单位 px，设置后，如果表格内容大于此值，会固定表头</td> <td>Number | String</td> <td>-</td></tr> <tr><td>loading</td> <td>表格是否加载中</td> <td>Boolean</td> <td>false</td></tr> <tr><td>disabled-hover</td> <td>禁用鼠标悬停时的高亮</td> <td>Boolean</td> <td>false</td></tr> <tr><td>highlight-row</td> <td>是否支持高亮选中的行，即单选</td> <td>Boolean</td> <td>false</td></tr> <tr><td>row-class-name</td> <td>
                            行的 className 的回调方法，传入参数：
                            <ul><li><code>row</code>：当前行数据</li> <li><code>index</code>：当前行的索引</li></ul></td> <td>Function</td> <td>-</td></tr> <tr><td>size</td> <td>表格尺寸，可选值为 <code>large</code>、<code>small</code>、<code>default</code> 或者不填</td> <td>String</td> <td>-</td></tr> <tr><td>no-data-text</td> <td>数据为空时显示的提示内容</td> <td>String</td> <td>暂无数据</td></tr> <tr><td>no-filtered-data-text</td> <td>筛选数据为空时显示的提示内容</td> <td>String</td> <td>暂无筛选结果</td></tr></tbody></table> <div class="anchor"><!----> <!----> <h3 id="Table_events">Table events</h3> <!----> <!----> <!---->  <a href="#Table_events">#</a></div> <table><thead><tr><th>事件名</th> <th>说明</th> <th>返回值</th></tr></thead> <tbody><tr><td>on-current-change</td> <td>开启 <code>highlight-row</code> 后有效，当表格的当前行发生变化的时候会触发</td> <td><ul><li><code>currentRow</code>：当前高亮行的数据</li> <li><code>oldCurrentRow</code>：上一次高亮的数据</li></ul></td></tr> <tr><td>on-select</td> <td>在多选模式下有效，选中某一项时触发</td> <td><ul><li><code>selection</code>：已选项数据</li> <li><code>row</code>：刚选择的项数据</li></ul></td></tr> <tr><td>on-select-cancel</td> <td>在多选模式下有效，取消选中某一项时触发</td> <td><ul><li><code>selection</code>：已选项数据</li> <li><code>row</code>：取消选择的项数据</li></ul></td></tr> <tr><td>on-select-all</td> <td>在多选模式下有效，点击全选时触发</td> <td><ul><li><code>selection</code>：已选项数据</li></ul></td></tr> <tr><td>on-select-all-cancel</td> <td>在多选模式下有效，点击取消全选时触发</td> <td><ul><li><code>selection</code>：已选项数据</li></ul></td></tr> <tr><td>on-selection-change</td> <td>在多选模式下有效，只要选中项发生变化时就会触发</td> <td><ul><li><code>selection</code>：已选项数据</li></ul></td></tr> <tr><td>on-sort-change</td> <td>排序时有效，当点击排序时触发</td> <td><ul><li><code>column</code>：当前列数据</li> <li><code>key</code>：排序依据的指标</li> <li><code>order</code>：排序的顺序，值为 <code>asc</code> 或 <code>desc</code></li></ul></td></tr> <tr><td>on-filter-change</td> <td>筛选时有效，筛选条件发生变化时触发</td> <td>当前列数据</td></tr> <tr><td>on-row-click</td> <td>单击某一行时触发</td> <td><ul><li>当前行的数据</li> <li>index</li></ul></td></tr> <tr><td>on-row-dblclick</td> <td>双击某一行时触发</td> <td><ul><li>当前行的数据</li> <li>index</li></ul></td></tr> <tr><td>on-expand</td> <td>展开或收起某一行时触发</td> <td><ul><li><code>row</code>：当前行的数据</li> <li><code>status</code>：当前的状态</li></ul></td></tr></tbody></table> <div class="anchor"><!----> <!----> <h3 id="Table_slot">Table slot</h3> <!----> <!----> <!---->  <a href="#Table_slot">#</a></div> <table><thead><tr><th>名称</th> <th>说明</th></tr></thead> <tbody><tr><td>header</td> <td>表头</td></tr> <tr><td>footer</td> <td>页脚</td></tr> <tr><td>loading</td> <td>加载中</td></tr></tbody></table> <div class="anchor"><!----> <!----> <h3 id="Table_methods">Table methods</h3> <!----> <!----> <!---->  <a href="#Table_methods">#</a></div> <table><thead><tr><th>方法名</th> <th>说明</th> <th>参数</th></tr></thead> <tbody><tr><td>exportCsv</td> <td>
                            将数据导出为 <code>.csv</code> 文件，说明：
                            <ul><li>支持IE9~IE11、Edge、Chrome、Safari、Firefox 全系列浏览器。</li> <li>IE9、Safari 需要手动修改后缀名为 <code>.csv</code>。</li> <li>IE9暂时只支持英文，中文会显示为乱码。</li></ul></td> <td>
                            params(Object):
                            <ul><li><strong>filename</strong>
                                    文件名，默认为 table.csv
                                </li> <li><strong>original</strong>
                                    是否导出为原始数据，默认为 true
                                </li> <li><strong>noHeader</strong>
                                    不显示表头，默认为 false
                                </li> <li><strong>columns</strong>
                                    自定义导出的列数据
                                </li> <li><strong>data</strong>
                                    自定义导出的行数据
                                </li> <li><strong>callback</strong>
                                    添加此函数后，不会下载，而是返回数据
                                </li> <li><strong>separator</strong>
                                    数据分隔符，默认是逗号(,)
                                </li> <li><strong>quoted</strong>
                                    每项数据是否加引号，默认为 false
                                </li></ul>
                            说明：columns 和 data 需同时声明，声明后将导出指定的数据，建议列数据有自定义render时，可以根据需求自定义导出内容
                        </td></tr> <tr><td>clearCurrentRow</td> <td>清除高亮项，仅在开启 <code>highlight-row</code> 时可用</td> <td>无</td></tr></tbody></table> <div class="anchor"><!----> <!----> <h3 id="column">column</h3> <!----> <!----> <!---->  <a href="#column">#</a></div> <p>列描述数据对象，是 columns 中的一项</p> <table><thead><tr><th>属性</th> <th>说明</th> <th>类型</th> <th>默认值</th></tr></thead> <tbody><tr><td>type</td> <td>列类型，可选值为 index、selection、expand、html</td> <td>String</td> <td>-</td></tr> <tr><td>title</td> <td>列头显示文字</td> <td>String</td> <td>#</td></tr> <tr><td>key</td> <td>对应列内容的字段名</td> <td>String</td> <td>-</td></tr> <tr><td>width</td> <td>列宽</td> <td>Number</td> <td>-</td></tr> <tr><td>minWidth</td> <td>最小列宽</td> <td>Number</td> <td>-</td></tr> <tr><td>maxWidth</td> <td>最大列宽</td> <td>Number</td> <td>-</td></tr> <tr><td>align</td> <td>对齐方式，可选值为 <code>left</code> 左对齐、<code>right</code> 右对齐和 <code>center</code> 居中对齐</td> <td>String</td> <td>left</td></tr> <tr><td>className</td> <td>列的样式名称</td> <td>String</td> <td>-</td></tr> <tr><td>fixed</td> <td>列是否固定在左侧或者右侧，可选值为 <code>left</code> 左侧和 <code>right</code> 右侧</td> <td>String</td> <td>-</td></tr> <tr><td>ellipsis</td> <td>开启后，文本将不换行，超出部分显示为省略号</td> <td>Boolean</td> <td>false</td></tr> <tr><td>tooltip</td> <td>开启后，文本将不换行，超出部分显示为省略号，并用 Tooltip 组件显示完整内容</td> <td>Boolean</td> <td>false</td></tr> <tr><td>render</td> <td>自定义渲染列，使用 Vue 的 Render 函数。传入两个参数，第一个是 h，第二个为对象，包含 row、column 和 index，分别指当前行数据，当前列数据，当前行索引，详见示例。<span><a href="https://segmentfault.com/l/1500000008892728" target="_blank"><i class="ivu-icon ivu-icon-social-youtube-outline"></i> <span> 学习 Render 函数的内容</span></a> <!----> <!----></span></td> <td>Function</td> <td>-</td></tr> <tr><td>renderHeader</td> <td>自定义列头显示内容，使用 Vue 的 Render 函数。传入两个参数，第一个是 h，第二个为对象，包含 <code>column</code> 和 <code>index</code>，分别为当前列数据和当前列索引。</td> <td>Function</td> <td>-</td></tr> <tr><td>indexMethod</td> <td>type 为 index 时可用，自定义序号</td> <td>Function，参数 row 为当前行内容</td> <td>-</td></tr> <tr><td>sortable</td> <td>对应列是否可以排序，如果设置为 <code>custom</code>，则代表用户希望远程排序，需要监听 Table 的 on-sort-change 事件</td> <td>Boolean | 'custom'</td> <td>false</td></tr> <tr><td>sortMethod</td> <td>自定义排序使用的方法，接收三个参数 a 、 b 和 type，当设置 <code>sortable: true</code> 时有效。type 值为 asc 和 desc</td> <td>Function</td> <td>-</td></tr> <tr><td>sortType</td> <td>设置初始化排序。值为 asc 和 desc</td> <td>String</td> <td>-</td></tr> <tr><td>filters</td> <td>过滤数据的选项，格式为数组，数组中每项包含 <code>label</code> 和 <code>value</code> 属性，使用过滤，必须同时配置 filterMethod</td> <td>Array</td> <td>-</td></tr> <tr><td>filterMethod</td> <td>数据过滤使用的方法，如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示</td> <td>Function</td> <td>-</td></tr> <tr><td>filterMultiple</td> <td>数据过滤的选项是否多选</td> <td>Boolean</td> <td>true</td></tr> <tr><td>filteredValue</td> <td>在初始化时使用过滤，数组，值为需要过滤的 value 集合</td> <td>Array</td> <td>-</td></tr> <tr><td>filterRemote</td> <td>使用远程过滤</td> <td>Function</td> <td>-</td></tr> <tr><td>children</td> <td>表头分组</td> <td>Array</td> <td>-</td></tr></tbody></table></div>

## 作者列表

| 作者 | 更新时间                    | 主要修改点 |
| :--- | :-------------------------- | :--------- |
| 少波 | 2019 年 1 月 30 日 13:14:00 | 搭建组件   |
