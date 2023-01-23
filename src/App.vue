<script lang="ts" setup>
import { computed, onBeforeMount, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "./stores/user";
import useLang from "./hooks/useLang";
const defaultLayout = "empty";
const { currentRoute } = useRouter();
const layout = computed(() => `${currentRoute.value.meta.layout || defaultLayout}-layout`);
const userStore = useUserStore();
const { currentLang } = useLang();

onBeforeMount(() => {
  userStore.tryAutoLogin();
});

watch(
  () => userStore.token,
  (newVal) => {
    if (!newVal) return;
    userStore.getUserInfo();
  }
);
</script>

<template>
  <a-config-provider :locale="currentLang">
    {}
    <component :is="layout"></component>
  </a-config-provider>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #262626;
}

h1,
h2,
h3,
h4,
h5,
h6,
.h1,
.h2,
.h3,
.h4,
.h5,
.h6 {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}

.beauty-scroll {
  scrollbar-color: #1da57a #1da57a;
  scrollbar-width: thin;
  -ms-overflow-style: none;
  position: relative;

  &::-webkit-scrollbar {
    width: 3px;
    height: 1px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: #1da57a;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0);
    border-radius: 3px;
    background: #1da57a;
  }
}
</style>
