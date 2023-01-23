<template>
  <div>
    <div v-if="formState.isSuccess">
      <a-result status="success" title="Successfully Verify!"> </a-result>
    </div>
    <div v-else>
      <a-result status="error" title="Verify Failed" sub-title="Please check and modify the following information before resubmitting.">
        <template #extra>
          <a-button key="console" type="primary" @click="visible = true">Resend</a-button>
        </template>
      </a-result>
    </div>

    <a-modal v-model:visible="visible" title="Resend verify">
      <a-form :model="formState" name="basic" autocomplete="off" @finish="onResend">
        <a-form-item label="" name="email" :rules="[{ required: true, message: 'Please input your email!' }]">
          <a-input v-model:value="formState.email" size="large" placeholder="Email"> </a-input>
        </a-form-item>
        <a-button key="submit" type="primary" html-type="submit">Submit</a-button>
      </a-form>
      <template #footer> </template>
    </a-modal>
  </div>
</template>

<script setup>
import { notification } from "ant-design-vue";
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import AuthServices from "../../services/AuthServices";

const route = useRoute();
const formState = reactive({
  isSuccess: false,
  email: "",
});

const visible = ref(false);

const showModal = () => {
  visible.value = true;
};

onMounted(() => {
  onVerify();
});

async function onVerify() {
  try {
    const code = route.params.code;
    console.log("code", code);
    if (code) {
      const res = await AuthServices.verify(code);
      console.log(res);
      formState.isSuccess = true;
    }
  } catch (error) {
    console.log(error);
    formState.isSuccess = false;
  }
}

async function onResend(values) {
  try {
    if (!values) return;
    console.log("Success:", values);

    const res = await AuthServices.resendVerify(values.email);
    console.log(res);
    visible.value = false;
    notification.success({
      message: "Success",
      description: res.data.description,
    });
  } catch (error) {
    notification.error({
      message: "Error",
      description: error,
    });
  }
}
</script>

<style lang="scss" scoped>
.full {
  display: block;
  margin: 0 auto;
}
</style>
