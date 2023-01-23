import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
// import useTheme from "./src/hooks/useTheme";
const { getThemeVariables } = require("ant-design-vue/dist/theme");

// const { modifyVars } = useTheme();
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          "primary-color": " #1DA57A",
          "link-color": "#1890ff",
          "success-color": "#52c41a",
          "warning-color": "#faad14",
          "error-color": "#f5222d",
          "font-size-base": "14px",
          "heading-color": " rgba(0, 0, 0, 0.85)",
          "text-color": "rgba(0, 0, 0, 0.85)",
          "text-color-secondary": "rgba(0, 0, 0, 0.45)",
          "disabled-color": "rgba(0, 0, 0, 0.25)",
          "border-radius-base": "4px",
          "border-color-base": "#d9d9d9",
          "box-shadow-base": "0 2px 8px rgba(0, 0, 0, 0.15)",

          "dropdown-vertical-padding": "8px",
          "base-bg-color": "rgba(0, 0, 0, 0.45)",
          "shadow-color": "rgba(0, 0, 0, 0.45)",
          "@text-color-second": "rgba(0, 0, 0, 0.45)",
        },

        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./node_modules"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
