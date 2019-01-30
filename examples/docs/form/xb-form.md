# xb-form

---

# 概述

# 示例

## 基础用法

<template>
  <xb-form ref="formInline" :model="formInline" :rules="ruleInline" inline>
    <xb-form-item prop="text">
      <input type="text" v-model="formInline.text">
    </xb-form-item>
    <xb-form-item>
      <xb-button @click="submit('formInline')">提交</xb-button>
    </xb-form-item>
  </xb-form>
</template>
<script>
  module.exports = {
    data() {
      return {
        formInline: {
          checked: false,
          firstNum: 0,
          text: ''
        },
        ruleInline: {
          text: [
            { required: true, message: 'text is required', trigger: 'blur' },
            { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submit(name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
                alert('Success!');
            } else {
                alert('Fail!');
            }
        })
      }
    }
  }
</script>

## 作者列表

| 作者 | 更新时间                    | 主要修改点 |
| :--- | :-------------------------- | :--------- |
| 海良 | 2019 年 1 月 30 日 13:14:00 | 搭建组件   |
