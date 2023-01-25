<template>
  <a-layout has-sider>
    <TheSidebarVue />
    <Cart />
    <a-layout>
      <a-layout-header :class="['admin-header']" :style="{ background: 'white' }">
        <div class="admin-header-left">
          <div>
            <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
            <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
          </div>

          <div :style="{ marginLeft: '20px' }">
            <a-breadcrumb v-if="!route.meta.hideBreadcrumb">
              <a-breadcrumb-item>{{ route.meta.name }}</a-breadcrumb-item>
            </a-breadcrumb>
          </div>
        </div>

        <div class="admin-header-right">
          <a-space align="center" size="middle">
            <HeaderCart />
            <HeaderNotice />
            <HeaderLang />
            <span @click="toggleTheme()" :style="{ cursor: 'pointer' }">
              <a-tooltip :title="`${currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)} Mode`">
                <FireOutlined :style="{ fontSize: '22px' }" v-if="currentTheme === theme.dark" />
                <StarOutlined :style="{ fontSize: '22px' }" v-else />
              </a-tooltip>
            </span>
            <HeaderAvatar />
          </a-space>
        </div>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer style="text-align: center"> Ant Design ©2018 Created by Ant UED </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MailOutlined,
  SelectOutlined,
  DashboardOutlined,
  TableOutlined,
} from "@ant-design/icons-vue";

import { useRoute } from "vue-router";
import useSidebar from "../hooks/useSidebar";
import useTheme from "../hooks/useTheme";
import TheSidebarVue from "./TheSidebar.vue";

import HeaderAvatar from "./header/HeaderAvatar.vue";
import HeaderNotice from "./header/HeaderNotice.vue";
import HeaderLang from "./header/HeaderLang.vue";
import HeaderCart from "./header/HeaderCart.vue";
import Cart from "../views/Cart/index.vue";

import { FireOutlined, StarOutlined } from "@ant-design/icons-vue";

const route = useRoute();
const { collapsed } = useSidebar();
let { theme, currentTheme } = useTheme();

function toggleTheme() {
  if (currentTheme.value === theme.dark) {
    currentTheme.value = theme.light;
  } else {
    currentTheme.value = theme.dark;
  }
}
</script>
<style lang="less" scoped>
.admin-header {
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
}

.admin-header-left {
  margin-left: 25px;
  margin-right: 25px;
  float: left;
  display: flex;
  color: inherit;
  align-items: center;
}

.admin-header-right {
  float: right;
  display: flex;
  color: inherit;
  align-items: center;
  margin-left: 25px;
  margin-right: 25px;
}
</style>
