<template>
    <div>
        Your roles: [ {{ user.role }} ]


        <div>
            Switch roles:
            <a-switch v-model:checked="checked" checked-children="admin" un-checked-children="editor" />
        </div>
    </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
import { useUserStore } from "../../stores/user";

const user = useUserStore();
const checked = ref(false);

onMounted(() => {


    if (user.role === 'admin') {
        checked.value = true
    } else {
        checked.value = false
    }
})

watch(checked, (newVal) => {

    if (newVal) {
        user.updateRole('admin')
    } else {
        user.updateRole('editor')

    }
})


</script>

<style lang="scss" scoped>
</style>