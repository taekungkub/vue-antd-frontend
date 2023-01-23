<template>
  <div>
    <a-badge class="notice-badge" :count="cartStore.rawItems.length" :style="{ cursor: 'pointer' }" @click="cartStore.toggleShowCart">
      <ShoppingCartOutlined :style="{ fontSize: '22px' }" />
    </a-badge>
  </div>
</template>

<script lang="ts" setup>
import { ShoppingCartOutlined } from "@ant-design/icons-vue";
import { useCartStore } from "../../stores/cart";

const cartStore = useCartStore();
</script>

<style lang="less" scoped>
.notice-badge {
  color: inherit;
}

.dropdown-tabs {
  background-color: white;
  box-shadow: 0 2px 8px @shadow-color;
  border-radius: 6px;

  .tab-pane {
    padding: 0 24px 12px;
    min-height: 250px;
  }
}
</style>
