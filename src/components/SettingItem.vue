<template>
    <div class="setting-item">
        <h3 v-if="title" class="title">{{ title }}</h3>
        <slot></slot>
    </div>
</template>

<script setup>


const props = defineProps({
    title: String
})


</script>

<style lang="less" scoped>
.setting-item {
    margin-bottom: 24px;

    .title {
        font-size: 14px;
        color: black;
        line-height: 22px;
        margin-bottom: 12px;
    }
}
</style>