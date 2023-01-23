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
      <a-form-item
        label=""
        name="email"
        :rules="[
          { required: true, message: 'Please input your email!' },
          { type: 'email', message: 'Email is not a valid email' },
        ]"
      >
        <a-input v-model:value="formState.email" size="large" placeholder="Email">
          <template #prefix>
            <i class="bx bx-user" :style="{ color: 'rgba(0,0,0,.25)' }"></i>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item label="" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
        <a-input-password v-model:value="formState.password" size="large" placeholder="Password">
          <template #prefix>
            <i class="bx bx-lock-alt" :style="{ color: 'rgba(0,0,0,.25)' }"></i>
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item label="" name="confirm_password" :rules="[{ required: true, message: 'Please input your confirm password!' }]">
        <a-input-password v-model:value="formState.confirm_password" size="large" placeholder="Confirm password">
          <template #prefix>
            <i class="bx bx-lock-alt" :style="{ color: 'rgba(0,0,0,.25)' }"></i>
          </template>
        </a-input-password>
      </a-form-item>
      <a-row :gutter="[16, 8]" align="middle">
        <a-col :span="24" :lg="12">
          <a-button type="primary" size="large" block html-type="submit" :loading="formState.loading"> Register </a-button>
        </a-col>
        <a-col :span="24" :lg="12">
          <div class="text-center">
            <router-link to="/login"> Already have an account? </router-link>
          </div>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script setup>
import { reactive } from "@vue/reactivity";

import { notification } from "ant-design-vue";
import AuthServices from "../../services/AuthServices";

const formState = reactive({
  email: "",
  password: "",
  confirm_password: "",
  loading: false,
});

const onFinish = async (values) => {
  try {
    formState.loading = true;

    console.log("Success:", values);
    const res = await AuthServices.register(formState.email, formState.password, formState.confirm_password);
    console.log(res);
    notification.success({
      message: "Success",
      description: res.data.description,
    });
    formState.loading = false;
    //reset
    formState.email = "";
    formState.password = "";
    formState.confirm_password = "";
  } catch (error) {
    formState.loading = false;
    console.log(error);
    notification["error"]({
      message: "Register Error",
      description: error,
    });
  }
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
  notification["error"]({
    message: "Register Error",
  });
};
</script>

<style lang="scss" scoped></style>
