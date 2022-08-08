import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.less";
import "antd-css-utilities/utility.min.css";
import "./assets/transition.scss";
import router from "./router";
import DashboardLayout from "./layout/DashboardLayout.vue";
import EmptyLayout from "./layout/EmptyLayout.vue";
import UserLayout from "./layout/UserLayout.vue";
import Row from "./components/Row.vue";

const globalComponent = {
  install(app) {
    app.component("admin-layout", DashboardLayout);
    app.component("empty-layout", EmptyLayout);
    app.component("user-layout", UserLayout);
    app.component("Row", Row);
  },
};

import VueApexCharts from "vue3-apexcharts";

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(globalComponent);
app.use(Antd);
app.use(VueApexCharts);

app.mount("#app");
