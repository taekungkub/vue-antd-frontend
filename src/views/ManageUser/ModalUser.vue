<template>
  <div>
    <a-button type="primary" @click="showModal" class="mb-5" v-if="props.action === 'add'">
      {{ props.label }}
    </a-button>

    <a-button type="primary" ghost size="small" @click="showModal" v-if="props.action === 'edit'">
      {{ props.label }}
    </a-button>

    <a-modal v-model:visible="visible" :title="props.title" @ok="handleOk" :footer="null">
      <a-form :model="formState.user" ref="formRef" name="basic" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
        <div v-if="props.action === 'add'">
          <a-form-item label="" name="user_email" :rules="[{ required: true }, { type: 'email' }]">
            <a-input v-model:value="formState.user.user_email" size="large" placeholder="Email">
              <template #prefix>
                <i class="bx bx-user" :style="{ color: 'rgba(0,0,0,.25)' }"></i>
              </template>
            </a-input>
          </a-form-item>
          <a-form-item label="" name="user_password" :rules="[{ required: true }]">
            <a-input-password v-model:value="formState.user.user_password" size="large" placeholder="password">
              <template #prefix>
                <i class="bx bx-lock-alt" :style="{ color: 'rgba(0,0,0,.25)' }"></i>
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item label="" name="user_confirm_password" :rules="[{ required: true }]">
            <a-input-password v-model:value="formState.user.user_confirm_password" size="large" placeholder="password">
              <template #prefix>
                <i class="bx bx-lock-alt" :style="{ color: 'rgba(0,0,0,.25)' }"></i>
              </template>
            </a-input-password>
          </a-form-item>
        </div>

        <a-form-item label="" name="user_displayname" :rules="[{ required: true }]">
          <a-input v-model:value="formState.user.user_displayname" size="large" placeholder="Displayname"> </a-input>
        </a-form-item>

        <a-form-item label="" name="user_tel" :rules="[{ required: true }]">
          <a-input v-model:value.number="formState.user.user_tel" size="large" placeholder="Tel"> </a-input>
        </a-form-item>

        <a-form-item name="is_verify">
          <a-checkbox v-model:checked="formState.user.is_verify">Is Verify</a-checkbox>
        </a-form-item>

        <a-form-item label="Roles" name="role_id">
          <a-radio-group v-model:value="formState.user.role_id">
            <a-radio value="1">Admin</a-radio>
            <a-radio value="2">Staff</a-radio>
            <a-radio value="3">User</a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" size="large" block html-type="submit" :loading="formState.loading">Submit</a-button>
        </a-form-item>
        <div class="block mx-auto text-center" @click="handleOk">
          <div class="register" to="/register">Cancel</div>
        </div>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { notification, FormInstance } from "ant-design-vue";
import { reactive, ref } from "vue";
import UserServices from "../../services/UserServices";
import { UserTy, FormAddUserTy } from "../../types/UserTy";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    validator: (value: string) => ["add", "edit"].includes(value),
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  item: {
    type: Object as () => UserTy,
    required: false,
  },
});

const emit = defineEmits(["success"]);

const formState = reactive({
  user: {} as FormAddUserTy,
  loading: false,
});

const formRef = ref<FormInstance>();

const visible = ref<boolean>(false);

const showModal = () => {
  visible.value = true;
  if (props.item) {
    formState.user.user_displayname = props.item.user_displayname;
    formState.user.user_tel = props.item.user_tel;
    formState.user.is_verify = props.item.is_verify ? true : false;
    formState.user.role_id = String(props.item.role_id);
  }
};

const handleOk = (e: MouseEvent) => {
  console.log(e);
  visible.value = false;
};

const onFinish = async (values: any) => {
  try {
    if (props.action === "add") {
      // add new user
      const res = await UserServices.createuser(formState.user);
      if (res.data) {
        notification.success({
          message: "Success",
          description: "Add user successfully",
        });
        emit("success");
        formRef.value?.resetFields();
        visible.value = false;
      }
    } else if (props.action === "edit") {
      const res = await UserServices.updateUser(
        {
          user_displayname: formState.user.user_displayname,
          user_tel: formState.user.user_tel,
          is_verify: formState.user.is_verify,
          role_id: formState.user.role_id,
        } as UserTy,
        props.item?.id
      );
      if (res) {
        notification.success({
          message: "Success",
          description: "Edit user successfully",
        });
        emit("success");
        formRef.value?.resetFields();
        visible.value = false;
      }
    }
  } catch (error: any) {
    console.log(error);
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
    message: "Form is invalid",
  });
};
</script>

<style scoped></style>
