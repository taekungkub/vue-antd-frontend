<template>
    <div :style="{ background: 'white', borderRadius: '8px' }" class="py-5 ">
        <a-row>
            <a-col :span="24" :lg="4" class="account-setting-left">
                <a-menu v-model:selectedKeys="selectedKeys" :mode="mode" theme="light" :style="{ border: '0' }">
                    <a-menu-item key="/account/setting/base">
                        <router-link to="/account/setting/base">
                            Base
                        </router-link>
                    </a-menu-item>
                    <a-menu-item key="/account/setting/security">
                        <router-link to="/account/setting/security">
                            Security
                        </router-link>
                    </a-menu-item>
                    <a-menu-item key="/account/setting/custom">
                        <router-link to="/account/setting/custom">
                            Custom
                        </router-link>
                    </a-menu-item>
                    <a-menu-item key="/account/setting/notification">
                        <router-link to="/account/setting/notification">
                            Notification
                        </router-link>
                    </a-menu-item>
                </a-menu>
            </a-col>
            <a-col :span="24" :lg="20">
                <div :class="[isMobile ? 'mt-5' : '', 'px-5']"></div>
                <router-view></router-view>
            </a-col>
        </a-row>
    </div>
</template>
<script setup>
import { ref } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import useSidebar from "../../hooks/useSidebar";


const { isMobile } = useSidebar();



const selectedKeys = ref([])
const route = useRoute();
const mode = ref("vertical")

watch(isMobile, (newVal) => {
    updateMenu();
})

watch(route, (newVal) => {
    updateRoute()
})

onMounted(() => {
    updateRoute()
    updateMenu();

})

function updateRoute() {
    selectedKeys.value = [route.fullPath]
}

function updateMenu() {
    if (!isMobile.value) {
        mode.value = "inline"
    } else {
        mode.value = "horizontal"

    }
}
</script>

<style lang="scss" scoped>
.account-setting-left {
    border-right: 1px solid rgb(232, 232, 232);
}

.ant-menu {
    padding-left: 0;

}
</style>