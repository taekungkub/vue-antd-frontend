<template>
  <div>
    <a-table :dataSource="orderList" :columns="columns">
      <template #bodyCell="{ text, column, record }">
        <template v-if="column.key === 'status'">
          <a-button type="primary" ghost size="small">{{ text }}</a-button>
        </template>
        <template v-if="column.key === 'actions'">
          <a-space wrap>
            <a-button type="primary" ghost size="small" @click="handleModal('view', record)">View </a-button>
            <a-button type="primary" ghost size="small" @click="handleModal('edit', record)">Edit </a-button>
            <a-button type="primary" ghost danger size="small" @click="removeOrder(record)">Cancel</a-button>
          </a-space>
        </template>
      </template>
    </a-table>

    <a-modal v-model:visible="visible" width="1000px" title="Basic Modal" @ok="visible = false">
      <a-table :dataSource="productList" :columns="columns2" :pagination="false"> </a-table>
    </a-modal>

    <a-modal v-model:visible="editVisible" width="500px" title="Basic Modal" @ok="updateStatusOrder(value1)">
      <div><a-radio-group v-model:value="value1" option-type="button" :options="plainOptions" /></div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { Modal, notification } from "ant-design-vue";
import { createVNode, onMounted, ref, watch } from "vue";
import OrderServices from "../../services/OrderServices";
import { useUserStore } from "../../stores/user";
import { OrderProductTy, OrderTy } from "../../types/OrderTy";

const orderList = ref([] as Array<OrderTy>);
const productList = ref([] as Array<OrderProductTy>);

const visible = ref(false);

const editVisible = ref(false);

const selectedRows = ref({} as OrderTy);
const value1 = ref<string>("");

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
    key: "total",
    dataIndex: "total",
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

const plainOptions = ["placed", "approved", "delivered"];
const options = [
  { label: "placed", value: "placed" },
  { label: "approved", value: "approved" },
  { label: "delivered", value: "delivered" },
];

onMounted(() => {
  getOrders();
});

async function getOrders() {
  try {
    const res = await OrderServices.getOrders();
    orderList.value = res.data;
  } catch (error) {
    console.log(error);
  }
}
async function handleModal(mode: string, item: OrderTy) {
  if (mode === "view") {
    visible.value = true;
    productList.value = item.products;
  } else if (mode === "edit") {
    editVisible.value = true;
    selectedRows.value = item;
    console.log(item);
    value1.value = item.status;
  }
}

async function updateStatusOrder(status: string) {
  try {
    const result = {
      status: status,
    } as OrderTy;

    await OrderServices.updateOrder(result, selectedRows.value.id);
    getOrders();
    editVisible.value = false;
  } catch (error) {
    console.log(error);
  }
}

async function removeOrder(record: OrderTy) {
  try {
    Modal.confirm({
      title: "Do you want to delete these items?",
      async onOk() {
        await OrderServices.removeOrder(record.id as string, record);
        getOrders();
      },
      onCancel() {},
    });
  } catch (error) {
    console.log(error);
    notification["error"]({
      message: "Error",
      description: error as string,
    });
  }
}
</script>

<style scoped></style>
