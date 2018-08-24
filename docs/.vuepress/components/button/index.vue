<template>
    <div>
        <button :type="htmlType" class="defaultClass" :disabled="disabled" @click="handleClick">
            {{text}}
        </button>
    </div>
</template>

<script>
import { oneOf } from '../../../utils/assist';
export default {
    name: 'XbButton',
    props: {
        disabled: Boolean,
        text: String,
        htmlType: {
            default: 'button',
            validator(value) {
                return oneOf(value, ['button', 'submit', 'reset']);
            }
        }
    },
    methods: {
        handleClick(event) {
            this.$emit('click', event);
        }
    },
};
</script>

<style scoped>
.defaultClass {
    padding: 5px 10px;
    border: 1px solid rgb(91, 138, 249);
    background: rgba(91, 138, 249, 1);
    border-radius: 3px;
    border: 0;
    color: white;
    cursor: pointer;
}
</style>

