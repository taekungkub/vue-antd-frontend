<template>
  <div class="pa-5 block mx-auto" style="max-width:500px">
    <a-form :model="formState" name="basic" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
      <a-form-item label="" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
        <a-input v-model:value="formState.username" size="large" placeholder="Account">
          <template #prefix>
            <i class='bx bx-user ' :style="{ color: 'rgba(0,0,0,.25)' }"></i>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item label="" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
        <a-input-password v-model:value="formState.password" size="large" placeholder="password">
          <template #prefix>
            <i class='bx bx-lock-alt ' :style="{ color: 'rgba(0,0,0,.25)' }"></i>
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item name="remember">
        <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
        <div style="float:right">
          <router-link to="/forgotpassword">Forgot password?</router-link>
        </div>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" size="large" block html-type="submit" :loading="formState.loading">Login</a-button>
      </a-form-item>
      <div class="block mx-auto text-center">
        <span class="mr-2">Or</span>
        <router-link class=" register" to="/register">Sign up</router-link>
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

<script setup>
import { reactive } from "@vue/reactivity";
import { notification } from 'ant-design-vue';
import router from "../../router";
import UserServices from "../../services/UserServices";
import { useUserStore } from "../../stores/user";

const formState = reactive({
  username: '',
  password: '',
  remember: true,
  loading: false
});


const userStore = useUserStore();
const onFinish = async values => {
  try {
    const res = await UserServices.login(values.username, values.password);
    if (res) {
      formState.loading = true
      setTimeout(() => {
        formState.loading = false;
        userStore.login(res)
        router.push('/dashboard')

        notification.success({
          message: 'Success',
          description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        });
      }, 2000);
    }

  } catch (error) {
    notification.error({
      message: 'Error auth',
      description: 'Username or Password is invalid',
    });

  }
};

const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
  notification['error']({
    message: 'Notification Title',
    description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
  });
};
</script>

<style lang="scss" scoped>
</style>