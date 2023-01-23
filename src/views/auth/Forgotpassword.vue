<template>
  <div
    :style="{
      maxWidth: '500px',
      padding: '10px',
      display: 'block',
      margin: '0 auto',
    }"
  >
    <a-form :model="formState" name="basic" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
      <a-form-item label="" name="email" :rules="[{ required: true }, { type: 'email' }]">
        <a-input v-model:value="formState.email" size="large" placeholder="Email">
          <template #prefix>
            <i class="bx bx-user" :style="{ color: 'rgba(0,0,0,.25)' }"></i>
          </template>
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-button type="primary" size="large" block html-type="submit" :loading="formState.loading">Send</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "@vue/reactivity";
import { notification } from "ant-design-vue";

import { useUserStore } from "../../stores/user";
import AuthService from "../../services/AuthServices";

const formState = reactive({
  email: "",
  loading: false,
});

const userStore = useUserStore();
const onFinish = async (values: any) => {
  try {
    if (values) {
      const res = await AuthService.forgotpassword(values.email);
      if (res) {
        notification.success({
          message: "Success",
          description: res.data.desciption,
        });
      }
    }
    //reset
    formState.email = "";
  } catch (error: any) {
    formState.loading = false;
    notification.error({
      message: "Error auth",
      description: error,
    });
  }
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
  notification["error"]({
    message: "Notification Title",
    description: "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
  });
};
</script>

<style lang="scss" scoped></style>
