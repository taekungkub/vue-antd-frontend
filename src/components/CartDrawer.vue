<template>
  <div>
    <a-drawer title="Cart" placement="right" v-model:visible="cartStore.isShowCart" :width="400" :body-style="{ paddingBottom: '80px' }" @close="onClose">
      <slot></slot>
      <template #footer> <slot name="footer"></slot> </template>
    </a-drawer>
  </div>
</template>

<script lang="ts" setup>
import { useCartStore } from "../stores/cart";
import CardProductCart from "./card/CardProductCart.vue";
const cartStore = useCartStore();

const onClose = () => {};
</script>

<style lang="scss" scoped></style>
