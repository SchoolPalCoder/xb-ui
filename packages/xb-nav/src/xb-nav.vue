
<template>
    <ul :class="getClass" :style="getStyles">
        <slot></slot>
    </ul>
</template>
<script lang="ts">
    import { Component, Prop, Mixins, Watch, Emit } from 'vue-property-decorator';
    import Emitter from "src/mixins/emitter";

    const prefixCls = 'xbui-nav';

    interface Style { width: string };

    @Component({ name: 'XbNav' })
    class XbNav extends Mixins(Emitter) {
        currentActiveName: string = '';
        // broadcast: Function =() => void;

        /* 菜单类型 */
        @Prop({
            type: String,
            default: 'vertical',
            validator(value) {
                return ['horizontal', 'vertical'].includes(value);
            },
        }) mode!: string
        /* 菜单主题 */
        @Prop({ 
            type: String,
            default: 'dark',
            validator(value) {
                return ['light', 'dark', 'primary'].includes(value);
            },
        }) theme!: string
        /* 激活菜单的name值 */
        @Prop({
            type: [String, Number],
            default: '-',
        }) activeName!: string | number
        // @Prop({ default: [] }) openNames: Array[]
        /* 手风琴模式 */
        // @Prop({ default: false }) accordion!: boolean
        /* 菜单宽度 */
        @Prop({ default: '240px' }) width!: string;

        get getClass () {
            return [
                `${prefixCls}`,
                `${prefixCls}-${this.theme}`,
                {
                    [`${prefixCls}-${this.mode}`]: this.mode,
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