<script setup>
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "./stores/user";


const defaultLayout = "empty";
const { currentRoute } = useRouter();
const layout = computed(
  () => `${currentRoute.value.meta.layout || defaultLayout}-layout`
);

const userStore = useUserStore();

onMounted(() => {
  userStore.tryLoginUserAccount();
})
</script>



<template>
  <component :is="layout"></component>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #262626;
}

.beauty-scroll {
  scrollbar-color: #1DA57A #1DA57A;
  scrollbar-width: thin;
  -ms-overflow-style: none;
  position: relative;

  &::-webkit-scrollbar {
    width: 3px;
    height: 1px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: #1DA57A
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0);
    border-radius: 3px;
    background: #1DA57A
  }
}
</style>
