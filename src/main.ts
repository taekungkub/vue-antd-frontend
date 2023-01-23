import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import Antd, { notification } from "ant-design-vue";
import "ant-design-vue/dist/antd.less";
import "./assets/transition.scss";
import router from "./router";
import DashboardLayout from "./layout/DashboardLayout.vue";
import EmptyLayout from "./layout/EmptyLayout.vue";
import UserLayout from "./layout/UserLayout.vue";

import permission from "./directives/permission";

const globalComponent = {
  install(app: any) {
    app.component("admin-layout", DashboardLayout);
    app.component("empty-layout", EmptyLayout);
    app.component("user-layout", UserLayout);
  },
};

import VueApexCharts from "vue3-apexcharts";

notification.config({
  placement: "bottomRight",
  bottom: "50px",
  duration: 3,
  rtl: false,
});

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(globalComponent);
app.use(Antd);
app.use(VueApexCharts);
app.directive("permission", permission);

app.mount("#app");
