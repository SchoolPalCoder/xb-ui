<template>
      <div v-show="isShow" class="xb-justfortry-click" @click="hide()"></div>
</template>

<script>
export default {
    name: "XbJustfortry",
    data() {
        return {
            isShow: true,
        };
    },
    methods: {
        hide() {
            this.isShow = false;
        },
    },
};
</script>
