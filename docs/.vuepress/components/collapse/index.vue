<template>
    <div>
        <div class="sourceBox">
            <div class="demoBox">
                <slot></slot>
            </div>
            <div v-if="isShowCode" class="codeBox">{{code}}</div>
        </div>
        <div @click="show()" class="btnBox">{{showText}}</div>

    </div>
</template>

<script>
export default {
    name: 'XbCollapse',
    props: ['code'],
    data() {
        return {
            isShowCode: true,
            showText: '收起',
        }
    },
    methods: {
        show() {
            this.isShowCode = !this.isShowCode;
            this.showText = this.isShowCode ? '收起' : '展开'
        }
    }
};
</script>

<style scoped>
.sourceBox {
    border: 1px solid #ebebeb;
    border-radius: 3px;
    transition: .2s;
}

.demoBox {
    padding: 20px;
}

.btnBox {
    border: 1px solid #eaeefb;
    height: 44px;
    line-height: 44px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    margin-top: -1px;
    cursor: pointer;
}

.codeBox {
    background-color: #fafafa;
    border-top: 1px solid #eaeefb;
    overflow: hidden;
    height: 0;
    transition: height .2s;
    padding: 20px;
}
</style>

