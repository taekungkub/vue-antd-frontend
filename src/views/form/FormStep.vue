<template>
    <a-card :style="{ borderRadius: '8px' }">

        <a-steps :current="current">
            <a-step v-for="item in steps" :key="item.title" :title="item.title" />
        </a-steps>

        <div class="steps-content">
            <a-form :model="formState" name="basic" :label-col="{ span: 9 }" :wrapper-col="{ span: 8 }"
                autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed" v-if="current === 0">
                <a-form-item label="Payment account" name="payment_account"
                    :rules="[{ required: true, message: 'Please input your account!' }]">
                    <a-input v-model:value="formState.payment_account" />
                </a-form-item>

                <a-form-item label="Collection account" name="collection_account">
                    <a-input v-model:value="formState.collection_account" />
                </a-form-item>


                <a-form-item label="Name" name="name" :rules="[{ required: true, message: 'Please input your name!' }]">
                    <a-input v-model:value="formState.name" />
                </a-form-item>



                <a-form-item label="Transfer amount" name="amount"
                    :rules="[{ required: true, message: 'Please input your amount!' }]">
                    <a-input v-model:value="formState.amount">
                        <template #prefix>
                            <dollar-outlined />
                        </template>
                    </a-input>
                </a-form-item>


            </a-form>

            <div v-if="current === 1">
                <a-alert
                    description="After confirming the transfer, the funds will be directly transferred into the other party's account and cannot be returned."
                    type="warning" :style="{ maxWidth: '500px', margin: '0 auto', marginBottom: '24px' }" />
                <a-form :label-col="{ span: 9 }" :wrapper-col="{ span: 8 }">
                    <a-form-item label="Payment account" name="payment_account">
                        {{ formState.payment_account }}
                    </a-form-item>
                    <a-form-item label="Collection account">
                        {{ formState.collection_account }}
                    </a-form-item>
                    <a-form-item label="Name">
                        {{ formState.name }}
                    </a-form-item>
                    <a-form-item label="Tranfer amount">
                        {{ formState.amount }}
                    </a-form-item>
                </a-form>
            </div>
            <div v-if="current === 2">
                <div style="max-width: 500px; margin: 40px auto 0; text-align: center">
                    <check-circle-outlined :style="{ fontSize: '4rem', color: '#52c41a' }" />
                    <a-typography-title :level="2" class="mt-5"> Payment successful</a-typography-title>

                </div>
            </div>
        </div>



        <a-form-item :wrapper-col="{ offset: 9, span: 9 }">
            <div class="steps-action">
                <a-button v-if="current < steps.length - 1" type="primary" @click="next">Next</a-button>
                <a-button v-if="current == steps.length - 1" type="primary"
                    @click="message.success('Processing complete!')">
                    Done
                </a-button>
                <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">Previous</a-button>
            </div>
        </a-form-item>


    </a-card>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import { message } from 'ant-design-vue';
import { DollarOutlined, CheckCircleOutlined } from "@ant-design/icons-vue";

const steps = [{
    title: 'Fill transfer information',
    content: 'First-content',
}, {
    title: 'Confirm transfer information',
    content: 'Second-content',
}, {
    title: 'Complete',
    content: 'Last-content',
}];

const current = ref(0);

const next = () => {
    current.value++;
};

const prev = () => {
    current.value--;
};

const formState = reactive({
    payment_account: 'kieattisak.sup@gmail.com',
    name: 'Tae',
    amount: 5000,
    collection_account: "test@example.com",
});

</script>

<style lang="less" scoped>
.steps-content {
    border-radius: 6px;
    min-height: 200px;
    padding-top: 40px;
}

.steps-action {
    margin-top: 10px
}



[data-theme='dark'] .steps-content {
    background-color: #2f2f2f;
    border: 1px dashed #404040;
}
</style>