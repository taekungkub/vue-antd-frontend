<script lang="ts" setup>
import { computed, createVNode, onBeforeMount, onMounted, ref, watch } from "vue"
import { useRouter } from "vue-router"
import { useUserStore } from "./stores/user"
import useLang from "./hooks/useLang"
import { message, Modal } from "ant-design-vue"
import router from "./router"
const defaultLayout = "empty"
const { currentRoute } = useRouter()
const layout = computed(() => `${currentRoute.value.meta.layout || defaultLayout}-layout`)
const userStore = useUserStore()
const { currentLang } = useLang()

onBeforeMount(() => {
  userStore.tryAutoLogin()
})

watch(
  () => userStore.token,
  (newVal) => {
    if (!newVal) return

    userStore
      .getUserInfo()
      .then((data) => {})
      .catch((error) => {
        console.log(error)
      })
  }
)
</script>

<template>
  <div class="overlay" v-if="userStore.isLoadingUser">
    <div class="centered">Loading...</div>
  </div>
  <a-config-provider :locale="currentLang">
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
.overlay {
  position: fixed; /* Sit on top of the page content */
  display: block; /* Hidden by default */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
  z-index: 999999; /* Specify a stack order in case you're using a different order for other elements */
  cursor: pointer; /* Add a pointer on hover */
  color: white;
}

.centered {
  position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
}
</style>
