<template>
  <a-dropdown :trigger="['click']">
    <template #overlay>
      <div>
        <a-tabs class="dropdown-tabs" centered :style="{ width: '297px' }">
          <a-tab-pane tab="Notification" key="1">
            <a-list class="tab-pane">
              <a-list-item>
                <a-list-item-meta title="你收到了 14 份新周报" description="一年前">
                  <template #avatar>
                    <a-avatar style="background-color: white" src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png" />
                  </template>
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-list-item-meta title="你推荐的 曲妮妮 已通过第三轮面试" description="一年前">
                  <template #avatar>
                    <a-avatar style="background-color: white" src="https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png" />
                  </template>
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-list-item-meta title="这种模板可以区分多种通知类型" description="一年前">
                  <template #avatar>
                    <a-avatar style="background-color: white" src="https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png" />
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-tab-pane>
          <a-tab-pane tab="Message" key="2">
            <a-list class="tab-pane"></a-list>
          </a-tab-pane>
          <a-tab-pane tab="To do" key="3">
            <a-list class="tab-pane"></a-list>
          </a-tab-pane>
        </a-tabs>
      </div>
    </template>
    <a-badge class="notice-badge" count="12" :style="{ cursor: 'pointer' }">
      <BellOutlined :style="{ fontSize: '22px' }" />
    </a-badge>
  </a-dropdown>
</template>

<script lang="ts" setup>
import { BellOutlined } from "@ant-design/icons-vue";
</script>

<style lang="less" scoped>
.notice-badge {
  color: inherit;
}

.dropdown-tabs {
  background-color: white;
  box-shadow: 0 2px 8px @shadow-color;
  border-radius: 6px;

  .tab-pane {
    padding: 0 24px 12px;
    min-height: 250px;
  }
}
</style>
