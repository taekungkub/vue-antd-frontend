<template>
  <div>
    <CartDrawer>
      <CardProductCart :items="cartStore.items" @delete="onDelete" />
      <template #footer>
        <Flex justify="space-between">
          <a-button type="text">Total Price: ${{ cartStore.totalPrice }} </a-button>
          <a-button type="primary" :disabled="cartStore.items.length <= 0" @click="onCheckout(cartStore.items)">Checkout</a-button>
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
import { useRouter } from "vue-router";
import OrderServices from "../../services/OrderServices";
import { useUserStore } from "../../stores/user";
import { OrderTy } from "../../types/OrderTy";
import { watch } from "vue";
import { notification } from "ant-design-vue";
const cartStore = useCartStore();
const router = useRouter();
const user = useUserStore();

const onDelete = (item: ProductTy) => {
  cartStore.removeItem(item);
};

async function onCheckout(items: any) {
  try {
    // router.push('/checkout')

    await OrderServices.createOrder(items, user.info.id, "placed", "credit", cartStore.totalPrice);

    cartStore.clearItems();
  } catch (error) {
    console.log(error);
    notification["error"]({
      message: "Error",
      description: error as string,
    });
  }
}

watch(
  () => user.info.id,
  (newVal) => {
    if (!newVal) return;

    cartStore.clearItems();
  }
);
</script>

<style scoped></style>
