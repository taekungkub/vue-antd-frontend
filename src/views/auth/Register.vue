<template>
    <div class="pa-5 block mx-auto" style="max-width:500px">
        <a-form :model="formState" name="basic" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
            <a-form-item label="" name="email"
                :rules="[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Email is not a valid email' }]">
                <a-input v-model:value="formState.email" size="large" placeholder="Email">
                    <template #prefix>
                        <i class='bx bx-user ' :style="{ color: 'rgba(0,0,0,.25)' }"></i>
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item label="" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
                <a-input-password v-model:value="formState.password" size="large" placeholder="Password">
                    <template #prefix>
                        <i class='bx bx-lock-alt ' :style="{ color: 'rgba(0,0,0,.25)' }"></i>
                    </template>
                </a-input-password>
            </a-form-item>
            <a-form-item label="" name="cfpassword"
                :rules="[{ required: true, message: 'Please input your confirm password!' }]">
                <a-input-password v-model:value="formState.confirm_password" size="large"
                    placeholder="Confirm password">
                    <template #prefix>
                        <i class='bx bx-lock-alt ' :style="{ color: 'rgba(0,0,0,.25)' }"></i>
                    </template>
                </a-input-password>
            </a-form-item>
            <a-row :gutter="[16, 8]" align="middle">
                <a-col :span="24" :lg="12">
                    <a-button type="primary" size="large" block html-type="submit" :loading="formState.loading">
                        Register
                    </a-button>
                </a-col>
                <a-col :span="24" :lg="12">
                    <div class="text-center">
                        <router-link to="/login">
                            Already have an account?
                        </router-link>
                    </div>
                </a-col>
            </a-row>
        </a-form>
    </div>
</template>

<script setup>
import { reactive } from "@vue/reactivity";

import { notification } from 'ant-design-vue';


const formState = reactive({
    email: '',
    password: '',
    confirm_password: "",
    loading: false
});

const onFinish = values => {
    console.log('Success:', values);
    formState.loading = true
    setTimeout(() => {
        formState.loading = false
    }, 2000);
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