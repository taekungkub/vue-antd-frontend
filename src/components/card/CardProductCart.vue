<template>
  <div>
    <a-list class="demo-loadmore-list" item-layout="horizontal" :data-source="stateAsRef">
      <template #loadMore>
        <div :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"></div>
      </template>
      <template #renderItem="{ item }">
        <a-list-item>
          <template #actions>
            <a @click="emit('delete', item)">Delete</a>
          </template>
          <a-list-item-meta>
            <template #title>
              {{ item.title }}
            </template>
            <template #avatar> <a-avatar shape="square" size="large" src="https://www.nasco.co.th/wp-content/uploads/2022/05/placeholder.png" /> </template>

            <template #description>
              <div>
                <h5>Qty: {{ item.qty }}</h5>
                <h5>Price: {{ item.price }}</h5>
                <a-input-number id="inputNumber" v-model:value="item.qty" :min="1" :max="10" />
              </div>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps({
  items: {
    type: Array,
  },
});
const emit = defineEmits(["delete"]);
const stateAsRef = ref(props.items);
</script>

<style lang="scss" scoped></style>
