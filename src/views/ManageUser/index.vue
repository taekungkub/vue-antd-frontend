<template>
  <a-card :style="{ borderRadius: '8px' }">
    <div :style="{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px' }">
      <h2 class="mb-5">Customer</h2>
      <a-row>
        <a-col :span="24">
          <a-input placeholder="Search" class="ml-2" v-model:value="searchQuery" />
        </a-col>
      </a-row>
    </div>

    <ModalUser label="Add" title="Add User" action="add" @success="onGetAllUsers" />

    <a-table :dataSource="filterUsers" :columns="columns" :scroll="{ x: 400 }">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <a>
            {{ record.name }}
          </a>
        </template>

        <template v-if="column.key === 'user_displayname'">
          <Flex alignItems="end">
            <img src="https://joeschmoe.io/api/v1/random" width="24" alt="" />

            <span class="ml-3">{{ record.user_displayname ? record.user_displayname : "-" }}</span>
          </Flex>
        </template>

        <template v-if="column.key === 'user_tel'">
          <span class="ml-3">{{ record.user_tel ? record.user_tel : "-" }}</span>
        </template>

        <template v-if="column.key === 'role_title'">
          <span class="ml-3">{{ record.role_title ? record.role_title : "-" }}</span>
        </template>

        <template v-if="column.key === 'is_verify'">
          <a-tag color="green" v-if="record.is_verify"> VERIFIED</a-tag>
          <a-tag color="red" v-else> UNVERIFIED</a-tag>
        </template>

        <template v-if="column.key === 'actions'">
          <a-space wrap>
            <ModalUser label="Edit" :title="`Edit ${record.user_email}`" action="edit" @success="onGetAllUsers" :item="record" />
            <a-button type="primary" ghost danger size="small" @click="showDeleteModal(record.id)">Delete</a-button>
          </a-space>
        </template>
      </template>
    </a-table>
  </a-card>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import UserServices from "../../services/UserServices";
import Flex from "../../components/Flex.vue";
import { computed } from "@vue/reactivity";
import { UserTy } from "../../types/UserTy";
import ModalUser from "./ModalUser.vue";
import { Modal, notification } from "ant-design-vue";
import { useUserStore } from "../../stores/user";

const formState = reactive({
  userList: [],
});

const searchQuery = ref("");
const userStore = useUserStore();
onMounted(() => {
  onGetAllUsers();
});

const filterUsers = computed(() => {
  if (!formState.userList) return [];

  if (searchQuery.value) {
    const result = formState.userList.filter((item: UserTy) => {
      let searchByName = item.user_displayname.toLowerCase().match(searchQuery.value.toLowerCase());

      if (searchByName) {
        return searchByName;
      }
    });

    return result.filter((el: any) => el.id != userStore.info.id);
  }
  return formState.userList.filter((el: any) => el.id != userStore.info.id);
});
async function onGetAllUsers() {
  const res = await UserServices.getAllUser();

  if (res.data) {
    formState.userList = res.data;
  }
}

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Email",
    dataIndex: "user_email",
    key: "user_email",
  },

  {
    title: "Displayname",
    dataIndex: "user_displayname",
    key: "user_displayname",
  },

  {
    title: "Telephone",
    dataIndex: "user_tel",
    key: "user_tel",
  },

  {
    title: "Role",
    dataIndex: "role_title",
    key: "role_title",
  },

  {
    title: "Status",
    dataIndex: "is_verify",
    key: "is_verify",
    width: 100,
    sorter: {
      compare: (a: any, b: any) => a.is_verify - b.is_verify,
    },
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
  },
];

async function showDeleteModal(userId: string) {
  Modal.confirm({
    title: `Do you Want to delete these users id ${userId}?`,
    async onOk() {
      try {
        const res = await UserServices.removeUser(userId);
        if (res) {
          onGetAllUsers();
          notification.success({
            message: "Success",
            description: "Delete user successfully",
          });
        }
      } catch (error: any) {
        console.log(error);
      }
    },
    onCancel() {
      console.log("Cancel");
    },
  });
}
</script>

<style lang="scss" scoped></style>
