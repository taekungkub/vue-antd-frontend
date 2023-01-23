<template>
  <div :class="[!collapsed && isMobile ? 'overlay' : '']" @click="collapsed = true"></div>
  <a-layout-sider
    v-model:collapsed="collapsed"
    breakpoint="lg"
    :collapsed-width="!isMobile ? 60 : 0"
    :trigger="null"
    :theme="currentTheme"
    @collapse="onCollapse"
    @breakpoint="onBreakpoint"
    :class="['side-menu', 'beauty-scroll', isMobile ? 'sidebar-fixed' : 'sidebar-noFixed']"
  >
    <a-menu v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" :theme="currentTheme" mode="inline" v-for="item in myMenus" :key="item.path">
      <div v-if="item.roles && item.roles.includes(userStore.role)">
        <a-menu-item :key="item.path" v-if="!item.children">
          <router-link :to="item.path">
            <component :is="item.icon"></component>
            <span>{{ item.title }} </span>
          </router-link>
        </a-menu-item>
      </div>
      <div v-if="!item.roles">
        <a-menu-item :key="item.path" v-if="!item.children">
          <router-link :to="item.path">
            <component :is="item.icon"></component>
            <span>{{ item.title }} </span>
          </router-link>
        </a-menu-item>
      </div>

      <a-sub-menu :key="item.path" :title="item.title" v-if="item.children && item.roles?.includes(userStore.role)">
        <template #icon>
          <component :is="item.icon"></component>
        </template>

        <div v-for="subItem in item.children">
          <a-menu-item :key="subItem.path" v-if="subItem.roles.includes(userStore.role)">
            <router-link :to="subItem.path">
              {{ subItem.title }}
            </router-link>
          </a-menu-item>
        </div>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts" setup>
import {
  UserOutlined,
  FireOutlined,
  MailOutlined,
  SelectOutlined,
  DashboardOutlined,
  TableOutlined,
  LockOutlined,
  WarningOutlined,
  ShopOutlined,
} from "@ant-design/icons-vue";
import { computed, onMounted, ref, toRefs, watch } from "vue";
import { useRoute } from "vue-router";
import useSidebar from "../hooks/useSidebar";
import useTheme from "../hooks/useTheme";
import { useUserStore } from "../stores/user";
import useRolePermission from "../config/useRolePermission";
const { collapsed, isMobile }: any = useSidebar();
const route = useRoute();
const { currentTheme } = useTheme();

const selectedKeys = ref([""]);
const openKeys = ref<Array<any>>([]);
const userStore = useUserStore();
const { ROLE_PERMISSION } = useRolePermission();

// const myMenus = ref([
//   { path: "/dashboard", title: "Dashboard", icon: DashboardOutlined },
//   { path: "/profile", title: "Profile", icon: UserOutlined },
//   { path: "/manage-user", title: eiei.value, icon: FireOutlined, roles: eiei.value },
//   { path: "/manage-role", title: "Manage Role", icon: FireOutlined, roles: ["admin"] },
//   { path: "/manage-product", title: "Manage Product", icon: TableOutlined, roles: ["admin", "staff"] },
//   {
//     path: "/permission",
//     title: "Permisstion",
//     icon: SelectOutlined,
//     children: [
//       { path: "/permission/admin", title: "Admin", roles: ["admin"] },
//       { path: "/permission/staff", title: "Staff", roles: ["admin", "staff"] },
//     ],
//   },
// ]);

const myMenus = computed(() => {
  return [
    { path: "/dashboard", title: "Dashboard", icon: DashboardOutlined },
    { path: "/profile", title: "Profile", icon: UserOutlined },
    { path: "/shop", title: "Shop", icon: ShopOutlined },

    { path: "/manage-user", title: "Manage User", icon: FireOutlined, roles: ROLE_PERMISSION.PAGE.MANAGE_USER.CAN_SEE },
    { path: "/manage-role", title: "Manage Role", icon: FireOutlined, roles: ROLE_PERMISSION.PAGE.MANAGE_ROLE.CAN_SEE },

    {
      path: "/manage-product",
      title: "Product",
      icon: TableOutlined,
      roles: ROLE_PERMISSION.PAGE.MANAGE_PRODUCT.CAN_SEE,
      children: [{ path: "/manage-product/index", title: "Manage Product", roles: ROLE_PERMISSION.PAGE.MANAGE_PRODUCT.CAN_SEE }],
    },

    {
      path: "/manage-order",
      title: "Order",
      icon: TableOutlined,
      roles: ROLE_PERMISSION.PAGE.MANAGE_ORDER.CAN_SEE,

      children: [
        { path: "/manage-order/index", title: "Manage Order", roles: ROLE_PERMISSION.PAGE.MANAGE_ORDER.CAN_SEE },
        { path: "/manage-order/add", title: "Add Order", roles: ROLE_PERMISSION.PAGE.MANAGE_ORDER.CAN_SEE },
      ],
    },

    {
      path: "/permission",
      title: "Permisstion",
      icon: SelectOutlined,
      children: [
        { path: "/permission/admin", title: "Admin", roles: ["admin"] },
        { path: "/permission/staff", title: "Staff", roles: ["admin", "staff"] },
      ],
    },
  ];
});

const onCollapse = (collapsed: any, type: any) => {};

onMounted(() => {
  updateMenu();
});

watch(route, (newVal) => {
  updateMenu();
});

const onBreakpoint = (broken: any) => {
  if (broken) {
    isMobile.value = true;
  } else {
    isMobile.value = false;
  }
};

function updateMenu() {
  selectedKeys.value = [route.fullPath];
  const menu = route.fullPath.split("/");
  if (menu.length >= 3) {
    openKeys.value = [`/${[menu[1]]}`];
  } else {
    openKeys.value = [];
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
  overflow-y: auto;
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
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
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
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    overflow: hidden;

    &.light {
      background-color: #fff;

      h1 {
        color: red;
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
