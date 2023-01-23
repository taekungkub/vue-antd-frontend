import { ref } from "vue";

const collapsed = ref(false);
const isMobile = ref(undefined);

export default function useSidebar() {
  return {
    collapsed,
    isMobile,
  };
}
