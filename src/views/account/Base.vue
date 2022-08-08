<template>
    <div class="pa-5">
        <a-typography-title :level="4"> Base </a-typography-title>
        <a-row>
            <a-col :span="24" :lg="{ span: 12, order: 1 }" :order="2">
                <a-form :layout="formState.layout" :model="formState" @finishFailed="onFinishFailed" @finish="onFinish"
                    :validate-messages="validateMessages">
                    <a-form-item name="email" label="Email" :wrapper-col="wrapperCol"
                        :rules="[{ required: true, type: 'email' }]">
                        <a-input v-model:value="formState.email" />
                    </a-form-item>
                    <a-form-item name="nickname" label="Nickname" :wrapper-col="wrapperCol"
                        :rules="[{ required: true }]">
                        <a-input v-model:value="formState.nickname" />
                    </a-form-item>
                    <a-form-item name="desc" label="Personal profile" :wrapper-col="wrapperCol"
                        :rules="[{ required: true }]">
                        <a-textarea v-model:value="formState.desc" />
                    </a-form-item>
                    <a-form-item name="country" label="Country/Region" has-feedback :wrapper-col="wrapperCol"
                        :rules="[{ required: true }]">
                        <a-select v-model:value="formState.country" placeholder="Please select a country">
                            <a-select-option value="china">China</a-select-option>
                            <a-select-option value="usa">U.S.A</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item name="province" label="Province" has-feedback :wrapper-col="wrapperCol"
                        :rules="[{ required: true }]">
                        <a-select v-model:value="formState.province" placeholder="Please select a Province">
                            <a-select-option value="bangkok">Bangkok</a-select-option>
                            <a-select-option value="nontaburee">Nontaburee</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item name="street_address" label="Street Address" :wrapper-col="wrapperCol"
                        :rules="[{ required: true }]">
                        <a-input v-model:value="formState.street_address" />
                    </a-form-item>
                    <a-form-item name="phone_number" label="Phone Number" :wrapper-col="wrapperCol"
                        :rules="[{ required: true, validator: checkPhoneNumber },]">
                        <a-input v-model:value="formState.phone_number" />
                    </a-form-item>
                    <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
                        <a-button type="primary" html-type="submit">Update Infomation</a-button>
                    </a-form-item>
                </a-form>
            </a-col>
            <a-col :span="24" :lg="{ span: 12, order: 2 }" :order="1">
                <a-avatar :size="150" src="https://joeschmoe.io/api/v1/random"
                    :style="{ border: '2px solid red', marginBottom: '12px' }" />
                <a-form-item name="fileList" label="" extra="longgggggggggggggggggggggggggggggggggg">
                    <a-upload v-model:fileList="formState.fileList" name="logo" action="/upload.do" list-type="picture">
                        <a-button>
                            <template #icon>
                                <i class='bx bx-upload mr-5'></i>
                            </template>
                            Change
                        </a-button>
                    </a-upload>
                </a-form-item>
            </a-col>
        </a-row>
    </div>


</template>

<script setup>
import { computed, reactive } from 'vue';


const wrapperCol = { offset: 0, span: 24, lg: 20 }


const formState = reactive({
    layout: 'vertical',
    email: '',
    nickname: '',
    desc: '',
    country: '',
    province: '',
    street_address: '',
    phone_number: '',
    image: ''
});
const formItemLayout = computed(() => {
    const {
        layout,
    } = formState;
    return layout === 'horizontal' ? {
        labelCol: {
            span: 10,
        },
        wrapperCol: {
            span: 14,
        },
    } : {};
});
const buttonItemLayout = computed(() => {
    const {
        layout,
    } = formState;
    return layout === 'horizontal' ? {
        wrapperCol: {
            span: 14,
            offset: 4,
        },
    } : {};
});



const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

const checkPhoneNumber = (_, value) => {
    if (!value) {
        return Promise.reject(new Error('${label} is required!'));
    }
    else if (value > 0) {
        return Promise.resolve();
    }
    return Promise.reject(new Error('Phone Number must be greater than zero!'));
};




const onFinish = values => {
    console.log('Success:', values);
};

const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};

</script>

<style lang="scss" scoped>
</style>