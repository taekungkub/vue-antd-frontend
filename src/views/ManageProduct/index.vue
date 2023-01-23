<template>
  <div>
    <a-card :style="{ borderRadius: '8px' }">
      <div :style="{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px' }">
        <h2 class="mb-5">Products</h2>
      </div>

      <router-link to="/manage-product/add">
        <a-button type="primary" class="mb-5">Add Product</a-button>
      </router-link>

      <a-button type="primary" :disabled="!hasSelected" danger ghost class="ml-5" @click="onRemoveSelected()"> Remove </a-button>

      <a-table
        :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }"
        :dataSource="productMapkey"
        :columns="columns"
        :scroll="{ x: 400 }"
      >
        <template #bodyCell="{ column, record }">
          <div v-if="column.key === 'action'">
            <a-space wrap>
              <a-button type="primary" size="small" ghost @click="$router.push(`/manage-product/add/${record.id}`)"> Edit</a-button>
              <a-button type="primary" size="small" ghost danger v-permission="ROLE_PERMISSION.PAGE.MANAGE_PRODUCT.DELETE" @click="onRemoveSelected(record.id)">
                Delete</a-button
              >
            </a-space>
          </div>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "@vue/reactivity";
import { message, Modal } from "ant-design-vue";
import { reactive } from "vue";
import useRolePermission from "../../config/useRolePermission";
import useProduct from "../../hooks/useProduct";
import ProductServices from "../../services/ProductServices";
const { ROLE_PERMISSION } = useRolePermission();
const { onGetProduct, productList } = useProduct();

const state = reactive<{
  selectedRowKeys: Array<string | number>;
  loading: boolean;
}>({
  selectedRowKeys: [],
  loading: false,
});

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },

  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
  },

  {
    title: "Actions",
    dataIndex: "action",
    key: "action",
  },
];

const hasSelected = computed(() => state.selectedRowKeys.length > 0);

const productMapkey = computed(() => {
  return productList.value.map((v: any) => {
    return Object.assign(
      {},
      {
        key: v.id,
        ...v,
      }
    );
  });
});

const onSelectChange = (selectedRowKeys: any) => {
  state.selectedRowKeys = selectedRowKeys;
};

async function onRemoveSelected(id?: string) {
  try {
    Modal.confirm({
      title: "Are you sure delete this product?",
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        removeProduct();
      },
      onCancel() {
        console.log("Cancel");
      },
    });

    const removeProduct = () => {
      let count = 0;
      const items = !id ? state.selectedRowKeys : [id];
      items.forEach(async (v: any) => {
        const res = await Promise.all([ProductServices.deleteProduct(v)]);

        if (res) {
          count++;
          if (count === items.length) {
            onGetProduct();
          }
        }
      });
    };
  } catch (error: any) {
    console.log(error);
    message.error(error.message);
  }
}
</script>

<style lang="scss" scoped></style>
