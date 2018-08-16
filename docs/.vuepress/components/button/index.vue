<template>
    <div>
        <button>{{text}}</button>
    </div>
</template>

<script>
export default {
    name: 'XbButton',
    props: ['text'],
    mounted() {
        console.log(this.text);
    }
};
</script>

<style scoped>

</style>

