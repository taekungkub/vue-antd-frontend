<template>
  <a-layout has-sider>
    <TheSidebarVue />
    <!-- <drawer @click="showSetting = !showSetting" placement="right">

      <Setting :visible="showSetting" @close="showSetting = false" />
    </drawer> -->
    <a-layout>
      <a-layout-header :class="['admin-header']" :style="{ background: 'white' }">
        <div class="admin-header-left">
          <div>
            <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
            <menu-fold-outlined v-else class="trigger " @click="() => (collapsed = !collapsed)" />
          </div>

          <div :style="{ marginLeft: '20px' }">
            <a-breadcrumb :routes="routes" v-if="!route.meta.hideBreadcrumb">
              <template #itemRender="{ route }">
                <span>
                  {{ route }}
                </span>
              </template>
            </a-breadcrumb>
          </div>
        </div>




        <div class="admin-header-right">
          <HeaderNotice />
          <span class="mx-4 mt-3" @click="toggleTheme()" :style="{ cursor: 'pointer' }">
            <a-tooltip :title="`${currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)} Mode`">
              <i class='bx bx-moon bx-sm ' v-if="currentTheme === theme.dark"> </i>
              <i class='bx bx-sun bx-sm' v-else></i>
            </a-tooltip>
          </span>
          <HeaderAvatar />
        </div>

      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">






        <router-view></router-view>

      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MailOutlined,
  SelectOutlined,
  DashboardOutlined,
  TableOutlined
} from "@ant-design/icons-vue";

import { defineComponent, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import useSidebar from "../hooks/useSidebar";
import useTheme from "../hooks/useTheme";
import TheSidebarVue from "./TheSidebar.vue";
import Drawer from "../components/Drawer.vue";
import Setting from "../components/Setting.vue";
import HeaderAvatar from "./header/HeaderAvatar.vue"
import HeaderNotice from "./header/HeaderNotice.vue"
import { useUserStore } from "../stores/user";


export default defineComponent({
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    MailOutlined,
    SelectOutlined,
    DashboardOutlined,
    TableOutlined,
    TheSidebarVue,
    Drawer,
    Setting,
    HeaderAvatar,
    HeaderNotice
  },

  setup() {

    const route = useRoute();
    const { collapsed, isMobile } = useSidebar();
    const levelList = ref("");
    const showSetting = ref(false)
    const userStore = useUserStore();


    let { theme, currentTheme, headerTheme } = useTheme();

    function toggleTheme() {
      if (currentTheme.value === theme.dark) {
        currentTheme.value = theme.light
      } else {
        currentTheme.value = theme.dark
      }
    }

    watch(route, (newVal) => {
      getRoute()
    })

    onMounted(() => {
      getRoute()
    })

    const routes = ref([])
    function getRoute() {
      const newRoute = route.path.split('/').map((v) => {
        if (v) {
          return v.charAt(0).toUpperCase() + v.slice(1);
        }
      }).filter((s) => s != null)
      routes.value = newRoute
    }


    return {
      collapsed,
      isMobile,
      route,
      levelList, theme, currentTheme, toggleTheme, showSetting, userStore, headerTheme, routes
    };
  },
});
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

  .header-item {
    color: inherit;
    padding: 0 12px;
    cursor: pointer;
    align-self: center;

    a {
      color: inherit;

      i {
        font-size: 16px;
      }
    }
  }
}
</style>