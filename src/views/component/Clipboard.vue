<template>
    <br />
    <a-input-group compact>
        <a-input v-model:value="value19" style="width: calc(100% - 400px)" />
        <a-button type="primary" @click="onCopy">
            <template #icon>
                <PaperClipOutlined />
            </template>
            Copy
        </a-button>
    </a-input-group>
    <br />
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { PaperClipOutlined } from "@ant-design/icons-vue"
import { message } from 'ant-design-vue';


const value19 = ref('https://github.com/PanJiaChen/vue-element-admin');

const onCopy = () => {
    message.success({
        content: () => "Copy successfully",
    });
};


</script>

<style lang="scss" >
</style>