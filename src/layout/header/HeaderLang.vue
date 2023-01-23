<template>
  <a-dropdown>
    <div style="cursor: pointer">
      {{ selectedLang?.title }}
    </div>

    <template #overlay>
      <a-menu v-model:selectedKeys="selectedKeys">
        <a-menu-item v-for="item in langList" :key="item.id" @click="onSelectedLang(item)">
          <span>{{ item.title }}</span>
        </a-menu-item>
        <a-menu-divider />
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import useLang from "../../hooks/useLang";
interface LangTy {
  id: number;
  title: string;
  value: any;
}

const { langList, currentLang } = useLang();

const selectedKeys = ref<any>([]);
const selectedLang = ref<LangTy>();

onMounted(() => {
  //active dropdown
  selectedLang.value = langList.find((el: LangTy) => currentLang.value.locale === el.value.locale) as LangTy;
  selectedKeys.value = [selectedLang.value.id];
});

const onSelectedLang = (item: LangTy) => {
  currentLang.value = item.value;
  selectedKeys.value = [item.id];
  selectedLang.value = langList.find((el: LangTy) => currentLang.value.locale === el.value.locale) as LangTy;
};
</script>
<style lang="less" scoped></style>
