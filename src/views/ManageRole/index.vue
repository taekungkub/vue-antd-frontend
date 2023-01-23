<template>
  <div>
    <a-card :style="{ borderRadius: '8px' }">
      <div :style="{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px' }">
        <h2 class="mb-5">Roles</h2>
      </div>

      <a-table :dataSource="roleList" :columns="columns" :scroll="{ x: 400 }"> </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import useRolePermission from "../../config/useRolePermission";
import RoleServices from "../../services/RoleServices";

const formState = reactive({
  roleList: [
    {
      id: 1,
      title: "Admin",
      description: "Super Administrator. Have access to view all pages.",
    },
    {
      id: 2,
      title: "Staff",
      description: "Normal Editor. Can see all pages except permission page.",
    },
  ],
});

const columns = [
  {
    title: "Id",
    dataIndex: "role_id",
    key: "role_id",
  },
  {
    title: "Title",
    dataIndex: "role_title",
    key: "role_title",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
];
const { ROLE_PERMISSION } = useRolePermission();

const roleList = ref([]);

onMounted(() => {
  getRoles();
});

async function getRoles() {
  const res = await RoleServices.getAllRoles();
  roleList.value = res.data;
}
</script>

<style lang="scss" scoped></style>
