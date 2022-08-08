<template>

  <a-row :gutter="[16, 24]">
    <a-col span="24" :md="8">
      <a-card :style="{ borderRadius: '8px' }">
        <a-divider orientation="left" orientation-margin="0px">
          Abount Me</a-divider>
        <div class="d-flex  justify-center items-center">
          <a-avatar :size="120" src="https://joeschmoe.io/api/v1/random" :style="{ border: '2px solid red' }" />
        </div>
        <div class="text-center mt-2">
          <h1 class=" ">Kieattisak Suaprit</h1>
          <p>Status:Active</p>
          <p>Role:Developer</p>
        </div>
        <a-divider orientation="left" orientation-margin="0px">
          Education</a-divider>
        <p>
          JS in Computer Science from the University of Technology

        </p>
        <a-divider orientation="left" orientation-margin="0px">
          Skills</a-divider>
        <div>Vue</div>
        <a-progress :percent="80" strokeColor="#1DA57A" />
        <div>Javascript</div>
        <a-progress :percent="80" />
        <div>Tailwind</div>
        <a-progress :percent="60" />
        <div>Flutter</div>
        <a-progress :percent="40" strokeColor="#1DA57A" />
      </a-card>
    </a-col>

    <a-col :span="24" :md="16">
      <a-card :style="{ borderRadius: '8px', }">
        <h1>Activity Timeline</h1>

        <a-tabs v-model:activeKey="activeKey">
          <a-tab-pane key="1" tab="Timeline">
            <a-timeline>
              <a-timeline-item color="green">Create a services site 2015-09-01</a-timeline-item>
              <a-timeline-item color="green">Create a services site 2015-09-01</a-timeline-item>
              <a-timeline-item color="red">
                <p>2015-09-01</p>
                <div :style="{ borderRadius: '8px', padding: '20px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }">
                  <h1>Update Github template</h1>
                  <p>
                    PanJiaChen committed 2019/4/20 20:46</p>
                </div>
              </a-timeline-item>
              <a-timeline-item>
                <p>Technical testing 1</p>
                <p>Technical testing 2</p>
                <p>Technical testing 3 2015-09-01</p>
              </a-timeline-item>
              <a-timeline-item color="gray">
                <p>Technical testing 1</p>
                <p>Technical testing 2</p>
                <p>Technical testing 3 2015-09-01</p>
              </a-timeline-item>
              <a-timeline-item color="gray">
                <p>Technical testing 1</p>
                <p>Technical testing 2</p>
                <p>Technical testing 3 2015-09-01</p>
              </a-timeline-item>
              <a-timeline-item color="#00CCFF">

                <p>Custom color testing</p>
              </a-timeline-item>
            </a-timeline>
          </a-tab-pane>
          <a-tab-pane key="2" tab="Account" force-render>
            <a-form :model="formState" name="basic" autocomplete=" off" @finish="onFinish"
              @finishFailed="onFinishFailed">
              <div class="mb-1">Username</div>
              <a-form-item name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
                <a-input v-model:value="formState.username" />
              </a-form-item>
              <div class="mb-1">Password</div>
              <a-form-item name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
                <a-input-password v-model:value="formState.password" />
              </a-form-item>


              <a-form-item>
                <a-button type="primary" html-type="submit">Submit</a-button>
              </a-form-item>
            </a-form>
          </a-tab-pane>

        </a-tabs>

      </a-card>
    </a-col>
  </a-row>
</template>

<script setup>
import { ref, reactive } from "@vue/reactivity";

const activeKey = ref("1");

const formState = reactive({
  username: '',
  password: '',
  remember: true,
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