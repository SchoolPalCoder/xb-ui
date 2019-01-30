# xb-popup-window 消息弹框

---

# 概述

提供消息弹框，用于消息提示、确认消息和提交内容

# 示例

## 基础用法

使用 `v-model` 实现双向绑定,控制属性 `value` 来显示 / 隐藏对话框</br>
可通过 `title` 设置标题，`on-ok` 触发确定事件、`on-cancel` 触发取消事件

<xb-button type="default" @click="click">点击</xb-button>
<xb-popup-window v-model="modal" title="标题" @on-ok="ok" @on-cancel="cancel"><div>自定义内容</div></xb-popup-window>

```js
<xb-button type="default" @click="click">点击</xb-button>
<xb-popup-window v-model="modal" title="标题" @on-ok="ok" @on-cancel="cancel"><div>自定义内容</div></xb-popup-window>
<script>
  export default {
    data () {
        return {
          modal: false,
        }
    },
    methods: {
      ok () {
        this.$message.info({
          text:'OK提示',
          duration:'20000',
          closable:true
        });
        this.modal = false;
      },
      cancel () {
        this.$message.info({
          text:'cancel提示',
          duration:'20000',
          closable:true
        });
        this.modal = false;
      },
      click () {
        this.modal = true;
      }
    }
  }
</script>
```

## 设置宽度、按钮文案、右上角关闭按钮控制显示、点击遮罩层关闭弹框、不带标题栏

有一些属性可以自定义弹框操作: `width`、`ok-text` 、`cancel-text`、 `closable`、 `maskClosable`

<xb-button type="default" @click="click1">设置宽度、按钮文案</xb-button>
<xb-button type="default" @click="click7">右上角关闭按钮控制显示、点击遮罩层关闭弹框</xb-button>
<xb-button type="default" @click="click2">不带标题栏</xb-button>
<xb-popup-window v-model="modal1" title="自定义标题" @on-ok="ok1" @on-cancel="cancel1" width="800" ok-text="自定义确定按钮文案" cancel-text="自定义取消按钮文案"><div>自定义内容</div></xb-popup-window>
<xb-popup-window v-model="modal7" title="自定义标题" :closable="closable" :maskClosable="maskClosable" @on-ok="ok7" @on-cancel="cancel7"><div>自定义内容</div></xb-popup-window>
<xb-popup-window v-model="modal2" @on-ok="ok2" @on-cancel="cancel2"><div>自定义内容</div></xb-popup-window>

```js
<xb-button type="default" @click="click1">设置宽度、按钮文案</xb-button>
<xb-button type="default" @click="click7">右上角关闭按钮控制显示、点击遮罩层关闭弹框</xb-button>
<xb-button type="default" @click="click2">不带标题栏</xb-button>
<xb-popup-window v-model="modal1" title="自定义标题" @on-ok="ok1" @on-cancel="cancel1" width="800" ok-text="自定义确定按钮文案" cancel-text="自定义取消按钮文案"><div>自定义内容</div></xb-popup-window>
<xb-popup-window v-model="modal7" title="自定义标题" :closable="closable" :maskClosable="maskClosable" @on-ok="ok7" @on-cancel="cancel7"><div>自定义内容</div></xb-popup-window>
<xb-popup-window v-model="modal2" @on-ok="ok2" @on-cancel="cancel2"><div>自定义内容</div></xb-popup-window>
<script>
  export default {
    data () {
        return {
          modal1: false,
          closable:false,
          modal2:false,
          maskClosable:false,
          modal7:false,
        }
    },
    methods: {
      ok1 () {
        this.modal1 = false;
      },
      cancel1 () {
        this.modal1 = false;
      },
      click1 () {
        this.modal1 = true;
      },
      ok2 () {
        this.modal2 = false;
      },
      cancel2 () {
        this.modal2 = false;
      },
      click2 () {
        this.modal2 = true;
      },
      ok7 () {
        this.modal7 = false;
      },
      cancel7 () {
        this.modal7 = false;
      },
      click7 () {
        this.modal7 = true;
      }
    }
  }
</script>
```

## 自定义头部和底部、底部隐藏

可以通过 `slot` 自定义头部和底部</br>
通过 `footerHide` 隐藏底部

<xb-button type="default" @click="click3">自定义头部和底部</xb-button>
<xb-button type="default" @click="click6">底部不显示</xb-button>
<xb-popup-window v-model="modal3"><div slot="header" style="text-align:center"><xb-icon type="warning-circle"></xb-icon>是否删除</div><div>自定义内容</div><div slot="footer" style="text-align:center"><xb-button type="default" @click="cancel3">自定义按钮</xb-button></div></xb-popup-window>
<xb-popup-window v-model="modal6" title="标题" :footer-hide="footerHide"><div>自定义内容</div></xb-popup-window>

```js
<xb-button type="default" @click="click3">自定义头部和底部</xb-button>
<xb-button type="default" @click="click6">底部不显示</xb-button>
<xb-popup-window v-model="modal3"><div slot="header" style="text-align:center"><xb-icon type="warning-circle"></xb-icon>是否删除</div><div>自定义内容</div><div slot="footer" style="text-align:center"><xb-button type="default" @click="cancel3">自定义按钮</xb-button></div></xb-popup-window>
<xb-popup-window v-model="modal6" title="标题" :footer-hide="footerHide"><div>自定义内容</div></xb-popup-window>

<script>
  export default {
    data () {
        return {
          modal3: false,
          modal6:false,
          footerHide:true
        }
    },
    methods: {
      cancel3 () {
        this.modal3 = false;
      },
      ok3 () {
        this.modal3 = false;
      },
      click3 () {
        this.modal3 = true;
      }
    }
  }
</script>
```

## 自定义样式

可以通过 `style` 或者 `className` 对弹框做自定义样式

<xb-button type="default" @click="click4">通过 style 自定义样式</xb-button>
<xb-button type="default" @click="click5">通过 className 自定义样式</xb-button>
<xb-popup-window v-model="modal4" title="标题" :styles="{top: '20px',color:'red'}" @on-ok="ok4" @on-cancel="cancel4">自定义内容</xb-popup-window>
<xb-popup-window v-model="modal5" title="标题" class-name="addClass" @on-ok="ok5" @on-cancel="cancel5">自定义内容</xb-popup-window>

<style>
  .addClass{
    width:100px;
    top:50%
  }
</style>

```js
<xb-button type="default" @click="click4">通过 style 自定义样式</xb-button>
<xb-button type="default" @click="click5">通过 className 自定义样式</xb-button>
<xb-popup-window v-model="modal4" title="标题" :styles="{top: '20px',color:'red'}" @on-ok="ok4" @on-cancel="cancel4">自定义内容</xb-popup-window>
<xb-popup-window v-model="modal5" title="标题" class-name="addClass" @on-ok="ok5" @on-cancel="cancel5">自定义内容</xb-popup-window>

<style>
  .addClass{
    width:100px;
    top:50%
  }
</style>
<script>
  export default {
    data () {
        return {
          modal4: false,
          modal5: false
        }
    },
    methods: {
      click4 () {
        this.modal4 = true;
      },
      click5 () {
        this.modal5 = true;
      },
      ok4 () {
        this.modal4 = false;
      },
      cancel4 () {
        this.modal4 = false;
      },
      ok5 () {
        this.modal5 = false;
      },
      cancel5 () {
        this.modal5 = false;
      }
    }
  }
</script>
```

## 设置页面是否可以滚动

通过 `scrollable` 属性设置页面是否可以滚动。默认是不滚动

<xb-button type="default" @click="click8">设置页面是否可以滚动</xb-button>
<xb-popup-window v-model="modal8" title="标题" @on-ok="ok8" @on-cancel="cancel8" scrollable="scrollable">自定义内容</xb-popup-window>

```js
<xb-button type="default" @click="click8">设置页面是否可以滚动</xb-button>
<xb-popup-window v-model="modal8" title="标题" @on-ok="ok8" @on-cancel="cancel8" scrollable="scrollable">自定义内容</xb-popup-window>
export default {
  data () {
      return {
        modal8: false,
        scrollable:true
      }
  },
  methods: {
    cancel8 () {
      this.modal8 = false;
    },
    ok8 () {
      this.modal8 = false;
    },
    click6 () {
      this.modal8 = true;
    }
  }
}
```

## 参数表

### xb-popup-window props

| 参数名       | 参数说明                                     | 类型           | 可选值 | 默认值 |
| ------------ | -------------------------------------------- | -------------- | ------ | ------ |
| value        | 使用 v-model 双向绑定数据,控制弹框的显示隐藏 | Boolean        | ——     | false  |
| maskClosable | 点击遮罩层关闭弹窗                           | Boolean        | ——     | true   |
| closable     | 控制右上角关闭按钮是否显示                   | Boolean        | ——     | true   |
| title        | 设置标题文案                                 | String         | ——     | ——     |
| width        | 设置弹框的宽度                               | Number, String | ——     | 520px  |
| ok-text      | 设置确定按钮文案                             | String         | ——     | ——     |
| cancel-text  | 设置取消按钮文案                             | String         | ——     | ——     |
| styles       | 可以通过 style 设置弹框样式                  | Object         | ——     | ——     |
| class-name   | 可以通过 class 增加类名设置弹框样式          | String         | ——     | ——     |
| footer-hide  | 设置底部是否隐藏                             | Boolean        | ——     | false  |
| scrollable   | 设置页面是否可以滚动                         | Boolean        | ——     | false  |

### xb-popup-window events

| 事件名    | 说明           | 返回值 |
| --------- | -------------- | ------ |
| on-ok     | 点击确定的回调 | 无     |
| on-cancel | 点击取消的回调 | 无     |

### xb-popup-window slot

| 名称   | 说明                 |
| ------ | -------------------- |
| header | 自定义页头           |
| footer | 自定义页脚           |
| close  | 自定义右上角关闭按钮 |
| 无     | 自定义主体内容       |

<script>
  export default {
    data () {
        return {
          modal: false,
          modal1: false,
          closable:false,
          modal2:false,
          modal3:false,
          modal4:false,
          modal5:false,
          footerHide:true,
          modal6:false,
          maskClosable:false,
          modal7:false,
          scrollable:true,
          modal8:false,
        }
    },
    methods: {
      ok () {
        this.$message.info({
          text:'OK提示',
          duration:'20000',
          closable:true
        });
        this.modal = false;
      },
      cancel () {
        this.$message.info({
          text:'cancel提示',
          duration:'20000',
          closable:true
        });
        this.modal = false;
      },
      click () {
        this.modal = true;
      },
      ok1 () {
        this.modal1 = false;
      },
      cancel1 () {
        this.modal1 = false;
      },
      click1 () {
        this.modal1 = true;
      },
      ok2 () {
        this.modal2 = false;
      },
      cancel2 () {
        this.modal2 = false;
      },
      click2 () {
        this.modal2 = true;
      },
      cancel3 () {
        this.modal3 = false;
      },
      click3 () {
        this.modal3 = true;
      },
      click4 () {
        this.modal4 = true;
      },
      click5 () {
        this.modal5 = true;
      },
      ok4 () {
        this.modal4 = false;
      },
      cancel4 () {
        this.modal4 = false;
      },
      ok5 () {
        this.modal5 = false;
      },
      cancel5 () {
        this.modal5 = false;
      },
      click6 () {
        this.modal6 = true;
      },
      ok7 () {
        this.modal7 = false;
      },
      cancel7 () {
        this.modal7 = false;
      },
      click7 () {
        this.modal7 = true;
      },
      ok8 () {
        this.modal8 = false;
      },
      cancel8 () {
        this.modal8 = false;
      },
      click8 () {
        this.modal8 = true;
      },
    }
  }
</script>

## 作者列表

| 作者 | 更新时间                    | 主要修改点 |
| :--- | :-------------------------- | :--------- |
| 安然 | 2019 年 1 月 30 日 13:14:00 | 搭建组件   |
