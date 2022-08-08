<template>
    <a-card :style="{ borderRadius: '8px' }">
        <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }" autocomplete="off" :model="formState"
            name="validate_other" v-bind="formItemLayout" @finishFailed="onFinishFailed" @finish="onFinish">
            <a-form-item label="Title" name="title" :rules="[{ required: true, message: 'Please input your Title!' }]"
                has-feedback>
                <a-input v-model:value="formState.title" />
            </a-form-item>

            <a-form-item label="Start Date" name="startDate"
                :rules="[{ required: true, message: 'Please input your Title!' }]" has-feedback>
                <a-input-password v-model:value="formState.startDate" />
            </a-form-item>


            <a-form-item has-feedback label="Age" name="age"
                :rules="[{ required: true, message: 'Please input your age!' }]">
                <a-input-number v-model:value="formState.age" />
            </a-form-item>

            <a-form-item name="region" label="Region" has-feedback
                :rules="[{ required: true, message: 'Please select your country!' }]">
                <a-select v-model:value="formState.region">
                    <a-select-option value="shanghai">Zone one</a-select-option>
                    <a-select-option value="beijing">Zone two</a-select-option>
                </a-select>

            </a-form-item>

            <a-form-item name="type" label="Activity type"
                :rules="[{ required: true, message: 'Please input your type!' }]" has-feedback>
                <a-checkbox-group v-model:value="formState.type">
                    <a-checkbox value="1" name="type">Online</a-checkbox>
                    <a-checkbox value="2" name="type">Promotion</a-checkbox>
                    <a-checkbox value="3" name="type">Offline</a-checkbox>
                </a-checkbox-group>
            </a-form-item>



            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                <a-button type="primary" html-type="submit">Submit</a-button>
            </a-form-item>


            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                {{ formState }}
            </a-form-item>
        </a-form>


    </a-card>
</template>

<script setup>
import {
    reactive
} from 'vue';



const formState = reactive({
    title: '',
    startDate: '',
    age: undefined,
    region: '',
    type: "",
});

const onFinish = values => {
    console.log('Success:', values);
};

const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};




</script>

<style lang="scss" scoped>
</style>