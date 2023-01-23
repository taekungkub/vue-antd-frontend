<template>
  <div>
    <a-card hoverable class="card_product">
      <template #cover>
        <img alt="example" src="https://www.nasco.co.th/wp-content/uploads/2022/05/placeholder.png" />
      </template>
      <a-card-meta>
        <template #title> <slot></slot> </template>
        <template #description>
          <slot name="description"></slot>
        </template>
      </a-card-meta>
      <div class="footer-up">
        <a-row :gutter="16">
          <a-col :span="12"> <a-button type="primary" block @click="emit('buy')">Buy</a-button> </a-col>
          <a-col :span="12"> <a-button type="primary" block @click="emit('add')">Add to cart</a-button> </a-col>
        </a-row>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
  },
  desc: {
    type: String,
  },
});

const emit = defineEmits(["buy", "add"]);
</script>

<style lang="scss" scoped>
.card_product {
  position: relative;
  overflow: hidden;

  img {
    transition: 200ms ease-in-out;
  }
}
.footer-up {
  position: absolute;
  z-index: 2;
  opacity: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  bottom: -20px;
  transition: all 200ms ease-in-out;
  width: 100%;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  padding: 0 10px;
}
.card_product:hover {
  .footer-up {
    opacity: 1;
    bottom: 0px;
  }
  img {
    transform: scale(1.1);
  }
}
</style>
