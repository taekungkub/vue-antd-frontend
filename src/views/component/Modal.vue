<template>
    <a-button type="primary" @click="editProfileModal = true">EditProfileModal</a-button>

    <a-modal v-model:visible="editProfileModal" title="Basic Modal"
        :okButtonProps="{ htmlType: 'submit', type: 'link' }">
        <a-form :layout="formState.layout" :model="formState" @finish="onFinish" @finishFailed="onFinishFailed">
            <a-row :span="24" :gutter="[12, 12]">
                <a-col :span="24" :lg="12">
                    <a-form-item label="Firstname" name="firstname"
                        :rules="[{ required: true, message: 'Please input your username!' }]">
                        <a-input v-model:value="formState.firstname" />
                    </a-form-item>
                </a-col>
                <a-col :span="24" :lg="12">
                    <a-form-item label="Lastname" name="lastname"
                        :rules="[{ required: true, message: 'Please input your username!' }]">
                        <a-input v-model:value="formState.lastname" />
                    </a-form-item>
                </a-col>
            </a-row>

        </a-form>

    </a-modal>
</template>

<script setup>
import { ref, reactive, toRaw } from "@vue/reactivity";
import { Form } from 'ant-design-vue';
const useForm = Form.useForm;

const formState = reactive({
    layout: 'vertical',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    province: ''
});

const {
    validate,
} = useForm(formState);


const editProfileModal = ref(false)

const onSubmitEditProfile = () => {
    validate().then(() => {
        console.log('submit!', toRaw(formState));
        editProfileModal.value = false

    }).catch(err => {
        console.log('error', err);
    });
};

const onFinish = async values => {
    console.log('Success:', values);

};

const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);

};
</script>

<style lang="scss" scoped>
</style>