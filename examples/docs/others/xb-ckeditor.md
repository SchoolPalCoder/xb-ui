# xb-ckeditor

集成CKeditor编辑器

----

<template>
  <xb-ckeditor
      v-model="content"
      :id="'id'"
      :types="types"
      :config="config"
      :readOnlyMode="readOnlyMode"
      :instanceReadyCallback="instanceReady"
      @blur="onBlur($event)"
      @focus="onFocus($event)"
      @contentDom="onContentDom($event)"
      @fileUploadRequest="onFileUploadRequest($event)"
      @fileUploadResponse="onFileUploadResponse($event)" >
      </xb-ckeditor>

</template>

<script>
export default {
  data() {
    return {
      content: '内容',
      id: 'ckeditor1',
      types: 'classic',
      readOnlyMode: false,
      config: {
        language: 'en',
      }
    };
  },
  methods: {
    instanceReady(){
      console.log("实例初始化完毕")
    },
    onBlur(evt) {
      console.log(evt);
    },
    onFocus(evt) {
      console.log(evt);
    },
    onContentDom(evt) {
      console.log(evt);
    },
    onFileUploadRequest(evt) {
      console.log(evt);
    },
    onFileUploadResponse(evt) {
      console.log(evt);
    }
  }
};
</script>

---

示例代码：

```js

<template>
  <xb-ckeditor
      v-model="content"
      :id="'id'"
      :types="types"
      :config="config"
      :readOnlyMode="flag"
      :instanceReadyCallback="instanceReady"
      @blur="onBlur($event)"
      @focus="onFocus($event)"
      @contentDom="onContentDom($event)"
      @fileUploadRequest="onFileUploadRequest($event)"
      @fileUploadResponse="onFileUploadResponse($event)" >
      </xb-ckeditor>

</template>

<script>
export default {
  data() {
    return {
      content: '内容',
      id: 'ckeditor1',
      types: 'classic',
      flag: false,
      config: {
        language: 'en',
      }
    };
  },
  methods: {
    instanceReady(){
      console.log("实例初始化完毕")
    },
    onBlur(evt) {
      console.log(evt);
    },
    onFocus(evt) {
      console.log(evt);
    },
    onContentDom(evt) {
      console.log(evt);
    },
    onFileUploadRequest(evt) {
      console.log(evt);
    },
    onFileUploadResponse(evt) {
      console.log(evt);
    }
  }
};
</script>
```

## 参数表
| 参数名    |         参数说明      |   类型   |  可选值   | 默认值         |
| :------- | :------------------- | :-----  | -------- | :----------   |
| id       | 组件id               |   String  | 无       | ckeditor_随机数 |
| types    | 编辑器类型            |   String  | classic，inline| classic |
| config   | 编辑器相关配置         |   Object    | 参考编辑器的相关配置，language: 'en'即为英文 | 中文 |
| readOnlyMode | 编辑器模式 |  Boolean   | true 编辑模式, false 只读模式 | true |
| instanceReadyCallback | 编辑器初始化完成回调函数 | Function | - | - |
| @blur | 焦点消失事件 | - | - | - |
| @focus | 获取焦点事件 | - | - | - |
| @contentDom | 编辑器内容（DOM结构）就绪时，触发事件 | - | - | - |
| @fileUploadRequest | 文件上传发送请求时，触发事件 | - | - | - |
| @fileUploadResponse | 文件上传接收请求是，触发事件 | - | - | - |
