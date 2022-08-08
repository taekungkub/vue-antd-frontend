<template>
    <a-row :justify="justify" :align="align">
        <slot></slot>
    </a-row>
</template>

<script setup>

const props = defineProps({
    justify: {
        type: String,
        validator: (value) => ["start", "center", "space-around", "space-between"].indexOf(value) !== -1,
    },
    align: {
        type: String,
        validator: (value) => ["top", "middle", "bottom"].indexOf(value) !== -1,
    }
})

</script>

<style lang="scss" scoped>
</style>