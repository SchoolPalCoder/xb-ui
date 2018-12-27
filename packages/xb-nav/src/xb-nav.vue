
<template>
    <ul :class="getClass" :style="getStyles">
        <slot></slot>
    </ul>
</template>
<script lang="ts">
    import { Component, Prop, Mixins, Watch, Emit } from 'vue-property-decorator';
    import { findComponentsDownward } from "src/utils/assist";
    import Emitter from "src/mixins/emitter";

    const prefixCls = 'xbui-nav';

    interface Style { width: string };

    @Component({ name: 'XbNav' })
    class XbNav extends Mixins(Emitter) {
        currentActiveName: string = '';

        /* 菜单类型 */
        @Prop({
            type: String,
            default: 'vertical', // 目前使用场景主要是 vertical
            validator(value) {
                return ['vertical', 'horizontal'].includes(value);
            },
        }) mode!: string
        /* 菜单主题 */
        @Prop({ 
            type: String,
            default: 'primary', // 目前以主色调为主
            validator(value) {
                return ['primary', 'light', 'dark'].includes(value);
            },
        }) theme!: string
        /* 激活菜单的name值 */
        @Prop({
            type: [String, Number],
            default: '-',
        }) activeName!: string | number;
        // @Prop({ 
        //     type: Array,
        //     default: [] 
        // }) openNames!: Array<string | number>[];
        @Prop({
            type: Boolean,
            default: false,
        }) collapse !: boolean;
        /* 手风琴模式 */
        // @Prop({ default: false }) accordion!: boolean
        /* 菜单宽度 */
        @Prop({ default: '240px' }) width!: string;

        get getClass () {
            console.warn(this.collapse)
            return [
                `${prefixCls}`,
                `${prefixCls}-${this.theme}`,
                {
                    [`${prefixCls}-${this.mode}`]: this.mode,
                    [`${prefixCls}-collapse`]: this.collapse,
                },
            ];
        }

        get getStyles() {
            const width = this.width;

            // 垂直方向设置默认宽度
            if(this.mode === 'vertical') {
                const style: Style = {
                    width: !~width.indexOf('px') ?  `${width}px` : width,
                };
    
                return style;
            }
        }

        /* ------- Watch 监听值变化 ------- */
        // 监听子级点击的当前值传递给当前外面菜单组件使用。
        // 将外部传入的默认高亮值传入到子组件，设置对应item高亮。
        @Watch('currentActiveName', { immediate: true })
        updateCurrentActiveName(name: string) {
            if(name == null) {
                this.currentActiveName = '-1';
            }
            this.broadcast('XbNavItem', 'on-update-active-name', name);
        }

        // 监听外部传入的默认高亮值
        @Watch('activeName', { immediate: true })
        updateActiveName(value: string) {
            if (value != null) {
                this.currentActiveName = value;
            }
        }

        // @Watch('collapse', { immediate: true })
        // updateCollapse(value: boolean) {
        //     this.collapse = value;
        // }

        // Emit 事件分发
        @Emit()
        onSelect(name: string) {
            return name
        }
        // Methods
        @Emit()
        handleEmitSelectEvent (name: string) {
            this.$emit('on-update-active-name', name);
        }
        // Lifecycle
        mounted() {
            this.$on('on-menu-item-select', (name: string) => {
                this.currentActiveName = name;
                this.onSelect(name);
            });
        }
    }

    export default XbNav;
</script>