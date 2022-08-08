<template>
    <div :class="[!collapsed && isMobile ? 'overlay' : '']" @click="collapsed = true"></div>
    <a-layout-sider v-model:collapsed="collapsed" breakpoint="lg" :collapsed-width="!isMobile ? 60 : 0" :trigger="null"
        :theme="currentTheme" @collapse="onCollapse" @breakpoint="onBreakpoint"
        :class="['side-menu', 'beauty-scroll', isMobile ? 'sidebar-fixed' : 'sidebar-noFixed']">
        <a-menu v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" :theme="currentTheme" mode="inline"
            v-for="item in myMenus" :key="item.path">
            <a-menu-item :key="item.path" v-if="!item.children">
                <router-link :to="item.path">
                    <component :is="item.icon"></component>
                    <span>{{ item.title }} </span>
                </router-link>
            </a-menu-item>
            <a-sub-menu :key="item.path" :title="item.title" v-if="item.children">
                <template #icon>
                    <component :is="item.icon"></component>
                </template>
                <a-menu-item v-for="subItem in item.children" :key="subItem.path">
                    <router-link :to="subItem.path">
                        {{ subItem.title }}
                    </router-link>
                </a-menu-item>
            </a-sub-menu>
        </a-menu>
    </a-layout-sider>
</template>

<script setup>
import {
    UserOutlined,
    FireOutlined,
    MailOutlined,
    SelectOutlined,
    DashboardOutlined,
    TableOutlined,
    LockOutlined,
    WarningOutlined

} from "@ant-design/icons-vue";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import useSidebar from '../hooks/useSidebar';
import useTheme from "../hooks/useTheme";

const { collapsed, isMobile } = useSidebar();
const route = useRoute();
const { currentTheme } = useTheme();

const selectedKeys = ref(['']);
const openKeys = ref([]);

const myMenus = ref([
    { path: '/dashboard', title: 'Dashboard', icon: DashboardOutlined },
    { path: '/profile', title: 'Profile', icon: UserOutlined },
    {
        path: '/form', title: 'Form', icon: SelectOutlined,
        children: [
            { path: '/form/basic', title: 'Basic' },
            { path: '/form/step', title: 'Step' },
        ]
    },
    {
        path: '/table', title: 'Table', icon: TableOutlined,
        children: [
            { path: '/table/basic', title: 'Table Basic' },
        ]
    },
    {
        path: '/auth', title: 'Authentication', icon: MailOutlined,
        children: [
            { path: '/login', title: 'Login' },
            { path: '/register', title: 'Register' },

        ]
    },

    {
        path: '/permission', title: 'Permission', icon: LockOutlined,
        children: [
            { path: '/permission/page', title: 'Page' },
            { path: '/permission/directive', title: 'Directive' },

        ]
    },
    {
        path: '/exception', title: 'Exception', icon: WarningOutlined,
        children: [
            { path: '/exception/403', title: '403' },
            { path: '/exception/404', title: '404' },

        ]
    },
    {
        path: '/component', title: 'Component', icon: FireOutlined,
        children: [
            { path: '/component/modal', title: 'Modal' },
            { path: '/component/clipboard', title: 'Clipboard' },

        ]
    }
])



const onCollapse = (collapsed, type) => {
};

onMounted(() => {
    updateMenu();
});

watch(route, (newVal) => {
    updateMenu();
});

const onBreakpoint = (broken) => {
    if (broken) {
        isMobile.value = true
    } else {
        isMobile.value = false
    }
};

function updateMenu() {
    selectedKeys.value = [route.fullPath]
    const menu = route.fullPath.split('/')
    if (menu.length >= 3) {
        openKeys.value = [`/${[menu[1]]}`]
    } else {
        openKeys.value = []
    }
}


</script>

<style lang="scss" scoped>
.sidebar-fixed {
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    bottom: 0;
    overflow-y: auto
}

.sidebar-noFixed {
    overflow: auto;
    height: 100vh;
    position: sticky;
    top: 0;
    left: 0;
}

.overlay {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    transition: all 0.5s;
    z-index: 100;
}

.shadow {
    box-shadow: 2px 0 6px rgba(0, 21, 41, .35);
}



.side-menu {
    min-height: 100vh;
    overflow-y: auto;
    z-index: 1000;

    .logo {
        height: 64px;
        position: relative;
        line-height: 64px;
        padding-left: 24px;
        -webkit-transition: all .3s;
        transition: all .3s;
        overflow: hidden;

        &.light {
            background-color: #fff;

            h1 {
                color: red
            }
        }

        h1 {
            color: #fff;
            font-size: 14px;
            margin: 0 0 0 12px;
            display: inline-block;
            vertical-align: middle;
        }

        img {
            width: 32px;
            vertical-align: middle;
        }
    }
}
</style>