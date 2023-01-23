import { ref, reactive, watch, onMounted } from "vue";

let ROLE_PERMISSION = reactive({
  PAGE: {
    MANAGE_USER: {
      CAN_SEE: ["admin"],
      ADD: ["admin"],
      EDIT: ["admin"],
      DELETE: ["admin"],
    },
    MANAGE_PRODUCT: {
      CAN_SEE: ["admin"],
      ADD: ["admin", "staff"],
      EDIT: ["admin", "staff"],
      DELETE: ["admin"],
    },
    MANAGE_ORDER: {
      CAN_SEE: ["admin", "staff"],
    },
    MANAGE_ROLE: {
      CAN_SEE: ["admin"],
    },
  },
});

export default function useRolePermission() {
  return {
    ROLE_PERMISSION,
  };
}
