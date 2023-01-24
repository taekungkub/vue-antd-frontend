<template>
  <div>
    <a-table :dataSource="orderList" :columns="columns">
      <template #bodyCell="{ text, column, record }">
        <template v-if="column.key === 'status'">
          <a-button type="primary" ghost size="small">{{ text }}</a-button>
        </template>
        <template v-if="column.key === 'actions'">
          <a-space wrap>
            <a-button type="primary" ghost size="small" @click="handleModal(record.products)">View </a-button>
            <a-button type="primary" ghost danger size="small">Cancel</a-button>
          </a-space>
        </template>
      </template>
    </a-table>

    <a-modal v-model:visible="visible" width="1000px" title="Basic Modal" @ok="visible = false">
      <a-table :dataSource="productList" :columns="columns2" :pagination="false"> </a-table>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import OrderServices from "../../services/OrderServices";
import { useUserStore } from "../../stores/user";
import { OrderProductTy, OrderTy } from "../../types/OrderTy";

const orderList = ref([] as Array<OrderTy>);
const productList = ref([] as Array<OrderProductTy>);

const visible = ref(false);

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },

  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },

  {
    title: "payment",
    key: "payment",
    dataIndex: "payment",
  },

  {
    title: "Total Price",
    key: "total_price",
    dataIndex: "total_price",
  },
  {
    title: "Date",
    key: "createdAt",
    dataIndex: "createdAt",
  },
  {
    title: "Action",
    key: "actions",
  },
];

const columns2 = [
  {
    title: "product_id",
    dataIndex: "product_id",
    key: "product_id",
  },

  {
    title: "title",
    dataIndex: "title",
    key: "title",
  },

  {
    title: "price",
    key: "price",
    dataIndex: "price",
  },

  {
    title: "quantity",
    key: "quantity",
    dataIndex: "quantity",
  },
];

const user = useUserStore();

onMounted(() => {
  getOrders();
});

async function getOrders() {
  try {
    const res = await OrderServices.getOrderUser(user.info.id);
    orderList.value = res.data;
  } catch (error) {
    console.log(error);
  }
}
async function handleModal(items: Array<any>) {
  visible.value = true;

  productList.value = items;
}
</script>

<style scoped></style>
