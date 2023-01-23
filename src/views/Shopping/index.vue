<template>
  <div>
    <a-row :gutter="[16, 16]">
      <a-col :span="12" :lg="8" :xl="6" v-for="(item, index) in productList" :key="index">
        <CardProduct @add="onAddCart(item)">
          <div>{{ item.title }}</div>
          <div>{{ item.metaTitle }}</div>

          <template #description>
            <div>Stock {{ item.quantity }}</div>
            <div>${{ item.price }}</div>
          </template>
        </CardProduct>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { message } from "ant-design-vue";
import CardProduct from "../../components/card/CardProduct.vue";
import CartDrawer from "../../components/CartDrawer.vue";
import useProduct from "../../hooks/useProduct";
import { useCartStore } from "../../stores/cart";
import CardProductCart from "../../components/card/CardProductCart.vue";
import { ProductTy } from "../../types/ProductTy";

const { productList } = useProduct();
const cartStore = useCartStore();
const getFakeData = () => `https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo`;

const dataList = [
  { qty: 1, gender: "female", name: { title: "Ms", first: "Sedef", last: "Aybar" }, email: "sedef.aybar@example.com", nat: "TR" },
  { qty: 2, gender: "female", name: { title: "Ms", first: "Lina", last: "Roomer" }, email: "lina.roomer@example.com", nat: "NL" },
  { qty: 3, gender: "female", name: { title: "Miss", first: "Sirene", last: "Pereira" }, email: "sirene.pereira@example.com", nat: "BR" },
  { qty: 4, gender: "female", name: { title: "Mrs", first: "Mila", last: "Jakovljević" }, email: "mila.jakovljevic@example.com", nat: "RS" },
  { qty: 5, gender: "male", name: { title: "Mr", first: "Gligorije", last: "Kovač" }, email: "gligorije.kovac@example.com", nat: "RS" },
];

const onAddCart = (item: ProductTy) => {
  cartStore.addItem(item);
  message.info("Added to cart");
};
</script>

<style scoped></style>
