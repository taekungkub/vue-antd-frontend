<template>
    <div class="side-setting">
        <a-drawer :visible="props.visible" class="custom-class" title="Setting" placement="right" :closable="true"
            @after-visible-change="afterVisibleChange" @close="onClose">

            <setting-item title="Theme Color">
                <div class="theme-color" v-for="(color, index) in primaryColor" :key="color" @click="onSelect(index)"
                    :style="{ background: color }">
                    {{ index }}
                </div>
            </setting-item>
            <div class="mt-12"></div>
            <a-divider />
            <setting-item title="Theme Color">

                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </setting-item>

        </a-drawer>
    </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import useTheme from "../hooks/useTheme";
import SettingItem from "./SettingItem.vue"

const { primaryColor, currentPrimary } = useTheme();


const props = defineProps({
    visible: Boolean
})

const emit = defineEmits(['close'])




const afterVisibleChange = bool => {
    console.log('visible', bool);
};

const showDrawer = () => {
};

function onSelect(index) {
    currentPrimary.value = index
    console.log(primaryColor[currentPrimary.value]);
}

const onClose = () => {
    emit('close')
};

</script>

<style lang="less" scoped>
.side-setting {
    min-height: 100%;
    background-color: @primary-color;
    padding: 24px;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;
    position: relative;

    .flex {
        display: flex;
    }

    .select-item {
        width: 80px;
    }
}

.theme-color {
    float: left;
    width: 20px;
    height: 20px;
    border-radius: 2px;
    cursor: pointer;
    margin-right: 8px;
    text-align: center;
    color: #fff;
    font-weight: 700;
}
</style>