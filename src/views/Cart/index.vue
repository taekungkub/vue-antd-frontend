<template>
  <div>
    <CartDrawer>
      <CardProductCart :items="cartStore.items" @delete="onDelete" />
      <template #footer>
        <Flex justify="space-between">
          <a-button type="text">Total Price: ${{ cartStore.totalPrice }} </a-button>
          <a-button type="primary" :disabled="cartStore.items.length <= 0" @click="$router.push('/checkout')">Purchese</a-button>
        </Flex>
      </template>
    </CartDrawer>
  </div>
</template>

<script setup lang="ts">
import CartDrawer from "../../components/CartDrawer.vue";
import CardProductCart from "../../components/card/CardProductCart.vue";
import { useCartStore } from "../../stores/cart";
import { ProductTy } from "../../types/ProductTy";
import Flex from "../../components/Flex.vue";
const cartStore = useCartStore();

const onDelete = (item: ProductTy) => {
  cartStore.removeItem(item);
};
</script>

<style scoped></style>
