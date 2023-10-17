<template>
  <a-row :gutter="[16, 24]">
    <a-col span="24" :md="8">
      <a-card :style="{ borderRadius: '8px' }">
        <a-divider orientation="left" orientation-margin="0px"> Abount Me</a-divider>
        <Flex align-items="center" :justify="'center'">
          <a-avatar :size="120" src="https://xsgames.co/randomusers/avatar.php?g=pixel" :style="{ border: '2px solid red' }" />
        </Flex>
        <div :style="{ textAlign: 'center' }">
          <h2 style="margin-top: 10px !important">{{ userStore.info.user_displayname }}</h2>
          <h2>Status: {{ !!userStore.info.is_verify ? "Active" : "No active" }}</h2>
          <h2>Role: {{ userStore.info.role_title }}</h2>
        </div>
        <a-divider orientation="left" orientation-margin="0px"> Infomation</a-divider>
      </a-card>
    </a-col>

    <a-col :span="24" :md="16">
      <a-card :style="{ borderRadius: '8px' }">
        <h1>Activity Timeline</h1>

        <a-tabs v-model:activeKey="activeKey">
          <a-tab-pane key="1" tab="Change profile">
            <a-form :model="formProfile" name="basic" autocomplete=" off" @finish="onChangeProfile" @finishFailed="onFinishFailed">
              <div class="mb-1">Displayname</div>
              <a-form-item name="user_displayname" :rules="[{ required: true }]">
                <a-input v-model:value="formProfile.user_displayname" />
              </a-form-item>
              <div class="mb-1">Telephone</div>
              <a-form-item name="user_tel" :rules="[{ required: true }]">
                <a-input v-model:value="formProfile.user_tel" />
              </a-form-item>

              <a-form-item>
                <a-button type="primary" html-type="submit">Submit</a-button>
              </a-form-item>
            </a-form>
          </a-tab-pane>
          <a-tab-pane key="2" tab="Change password" force-render>
            <a-form :model="formState" name="basic" autocomplete=" off" @finish="onChangePassword" @finishFailed="onFinishFailed">
              <div class="mb-1">Passsword</div>
              <a-form-item name="password" :rules="[{ required: true }]">
                <a-input v-model:value="formState.password" />
              </a-form-item>
              <div class="mb-1">Confirm Password</div>
              <a-form-item name="confirm_password" :rules="[{ required: true }]">
                <a-input-password v-model:value="formState.confirm_password" />
              </a-form-item>

              <a-form-item>
                <a-button type="primary" html-type="submit">Submit</a-button>
              </a-form-item>
            </a-form>
          </a-tab-pane>
          <a-tab-pane key="3" tab="Logs">
            <div :style="{ maxHeight: '300px', overflowY: 'auto' }">
              <a-timeline :style="{ marginTop: '20px' }">
                <a-timeline-item color="red" v-for="item in userStore.logList" :key="item.log_id">
                  <p>{{ item.log_description }}</p>
                  <div>
                    <p>{{ item.log_description }}</p>
                  </div>
                </a-timeline-item>
              </a-timeline>
            </div>
          </a-tab-pane>
        </a-tabs>
      </a-card>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import { ref, reactive } from "@vue/reactivity";
import { notification } from "ant-design-vue";
import { onMounted } from "vue";
import Flex from "../../components/Flex.vue";

import { useUserStore } from "../../stores/user";

const activeKey = ref("1");

const userStore = useUserStore();
const formState = reactive({
  password: "",
  confirm_password: "",
});

const formProfile = reactive({
  user_displayname: "",
  user_tel: "",
});

onMounted(() => {
  userStore.getLogUser();
  formProfile.user_displayname = userStore.info.user_displayname;
  formProfile.user_tel = userStore.info.user_tel;
});
const onChangePassword = async (values: any) => {
  userStore
    .changePassword(values.password, values.confirm_password)
    .then((word: any) => {
      notification.success({
        message: "Success",
        description: word,
      });

      formState.password = "";
      formState.confirm_password = "";
    })
    .catch((error) => {
      console.log(error);
      notification.error({
        message: "Error",
        description: error,
      });
    });
};

const onChangeProfile = (values: any) => {
  userStore
    .updateProfile(values)
    .then((word: any) => {
      notification.success({
        message: "Success",
        description: word,
      });
    })
    .catch((error) => {
      notification.error({
        message: "Error",
        description: error,
      });
    });
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
</script>

<style lang="scss" scoped></style>
