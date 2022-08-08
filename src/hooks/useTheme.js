import { computed, ref, watch } from "vue";

const ANTD = {
  primary: {
    color: "#1DA57A",
    info: "#1890ff",
    warning: "#faad14",
    success: "#52c41a",
    error: "#f5222d",
  },
};
const primaryColor = [ANTD.primary.color, ANTD.primary.info, ANTD.primary.warning, ANTD.primary.success, ANTD.primary.error];

let theme = {
  dark: "dark",
  light: "light",
};
let currentPrimary = ref(0);
let currentTheme = ref(theme.dark);

export default function useTheme() {
  function modifyVars() {
    return {
      "@primary-color": primaryColor[currentPrimary.value],
      "@link-color": primaryColor[currentPrimary.value],
      "border-radius-base": "6px",
      "@dropdown-vertical-padding": "8px",
      "@base-bg-color": "#fff",
      "@shadow-color": "rgba(0, 0, 0, .45)",
      "@text-color-second": "rgba(0, 0, 0, .45)",
      "@border-color-base": "#d9d9d9",
      "@header-bg-color-dark": "#141414",
    };
  }

  watch(currentPrimary, (newVal) => {
    modifyVars();
  });

  const headerTheme = computed(() => {
    if (currentTheme.value === theme.dark) {
      return theme.dark;
    }

    return currentTheme.value;
  });

  return {
    modifyVars,
    primaryColor,
    theme,
    currentPrimary,
    currentTheme,
    headerTheme,
  };
}
