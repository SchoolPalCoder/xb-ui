<template>
    <div>
        <xb-collapse :code="text"></xb-collapse>
    </div>
</template>

<script>
import XbCollapse from './collapse/index'
export default {
    data() {
        return {
            text: '<xb-collapse/>',
        }
    },
    components: {
        XbCollapse
    },

};
</script>

<style scoped>

</style>

