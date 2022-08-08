import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import useTheme from "./src/hooks/useTheme";
const { getThemeVariables } = require("ant-design-vue/dist/theme");

const pathResolve = (pathStr) => {
  return path.resolve(__dirname, pathStr);
};
// https://vitejs.dev/config/

const { modifyVars } = useTheme();
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      less: {
        // modifyVars: {
        //   "@primary-color": "#1DA57A",
        //   "@link-color": "#1DA57A",
        //   "border-radius-base": "4px",
        //   "@dropdown-vertical-padding": "8px",
        // },
        additionalData: [`@import '@/assets/less/myTheme.less';`],

        modifyVars: {
          ...getThemeVariables({
            dark: false,
          }),
          ...modifyVars(),
        },

        javascriptEnabled: true,
      },
    },
  },
  alias: {
    "@": pathResolve("./src"),
    "~": pathResolve("./node_modules"),
  },
});
