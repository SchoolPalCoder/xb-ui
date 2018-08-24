<template>
  <div>
    <Xb-collapse :code="codeText">
      <xb-button :text="text" :disabled="disabledFlag" :htmlType="htmlType"></xb-button>
    </Xb-collapse>
  </div>
</template>

<script>
import XbButton from './button/index'
import XbCollapse from './collapse/index'
export default {
  components: {
    XbButton,
    XbCollapse
  },
  data() {
    return {
      text: 'click me',
      htmlType: 'submit',
      codeText: '<xb-button :text="text"></xb-button>',
      disabledFlag: true,
    }
  }
};
</script>

<style scoped>

</style>

