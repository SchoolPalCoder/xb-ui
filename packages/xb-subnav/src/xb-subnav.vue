<template>
    <li :class="classes" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
        <div :class="[prefixCls + '-subnav-title']" @click.stop="handleClick">
            <slot name="title"></slot>
            <Icon type="arrow-down" :class="[prefixCls + '-subnav-title-icon']" />
        </div>
        <transition name="slide-up">
            <ul :class="[prefixCls]" v-show="opened"><slot></slot></ul>
        </transition>
    </li>
</template>

<script lang="ts">
    import { Component, Prop, Mixins } from "vue-property-decorator";
    import Emitter from "src/mixins/emitter";
    import Icon from '../../xb-icon';

    const prefixCls = 'xbui-nav';

    @Component({ 
        name: "XbSubnav",
        components: { Icon },
    })
    class XbSubnav extends Mixins(Emitter) {
        prefixCls: string = prefixCls;
        opened: boolean = false;
        active: boolean = false;

        get classes() {
            const subnavPrefixCls = `${prefixCls}-subnav`;
            return [
                subnavPrefixCls,
                {
                    [`${prefixCls}-opened`]: this.opened,
                    [`${prefixCls}-child-item-active`]: this.active,
                }
            ]
        }

        handleMouseEnter() {}
        handleMouseLeave() {}
        handleClick() {
            const opened = this.opened;

            this.opened = !opened;
        }

        mounted() {
             this.$on('on-menu-item-select', (name) => {
                this.dispatch('XbNav', 'on-menu-item-select', name);
            });
        }
    }

    export default XbSubnav;
    
</script>