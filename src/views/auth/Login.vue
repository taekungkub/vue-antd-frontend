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
      <a-form-item label="" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
        <a-input v-model:value="formState.username" size="large" placeholder="Account">
          <template #prefix>
            <i class="bx bx-user" :style="{ color: 'rgba(0,0,0,.25)' }"></i>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item label="" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
        <a-input-password v-model:value="formState.password" size="large" placeholder="password">
          <template #prefix>
            <i class="bx bx-lock-alt" :style="{ color: 'rgba(0,0,0,.25)' }"></i>
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item name="remember">
        <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
        <div style="float: right">
          <router-link to="/forgotpassword">Forgot password?</router-link>
        </div>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" size="large" block html-type="submit" :loading="formState.loading">Login</a-button>
      </a-form-item>
      <div
        :style="{
          maxWidth: '500px',
          padding: '10px',
          display: 'block',
          margin: '0 auto',
          textAlign: 'center',
        }"
      >
        <span :style="{ marginRight: '2px' }">Or</span>
        <router-link class="register" to="/register">Sign up</router-link>
      </div>
    </a-form>
    <!-- <a-row justify="start">
      <a-space align="center">
        <span>OR</span>
        <a-button type="link">Sign up</a-button>
      </a-space>
    </a-row> -->
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "@vue/reactivity";
import { notification } from "ant-design-vue";
import { onMounted, watchEffect } from "vue";
import { useRouter } from "vue-router";
import AuthServices from "../../services/AuthServices";
import { useUserStore } from "../../stores/user";

const router = useRouter();

const formState = reactive({
  username: "",
  password: "",
  remember: false,
  loading: false,
});

onMounted(() => {
  const rememberMe = JSON.parse(localStorage.getItem("remember") || "");
  if (rememberMe) {
    formState.username = rememberMe.username;
    formState.password = rememberMe.password;
    formState.remember = rememberMe.remember;
  }
});

const userStore = useUserStore();
const onFinish = async (values: any) => {
  formState.loading = true;
  userStore
    .login(values.username, values.password)
    .then(() => {
      if (formState.remember) {
        window.localStorage.setItem(
          "remember",
          JSON.stringify({
            username: formState.username,
            password: formState.password,
            remember: formState.remember,
          })
        );
      } else {
        window.localStorage.removeItem("remember");
      }

      router.push("/");
      formState.loading = false;
      notification.success({
        message: "Success",
        description: "Login successfully",
      });
    })
    .catch((error) => {
      console.log(error);
      formState.loading = false;

      notification.error({
        message: "Error auth",
        description: error,
      });
    });
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
