import { computed, ref } from "vue";
import en from "ant-design-vue/es/locale/en_US";
import th from "ant-design-vue/es/locale/th_TH";

const currentLang = ref(en);

export default function useLang() {
  const langList = [
    {
      id: 1,
      title: "English",
      value: en,
    },
    {
      id: 2,
      title: "Thai",
      value: th,
    },
  ];

  return { currentLang, langList };
}
