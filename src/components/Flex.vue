<template>
  <div class="flex-container" :style="{ alignItems: props.alignItems, justifyContent: props.justify }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  justify: {
    type: String,
    default: "start",
    validator: (value: string) => ["start", "center", "space-between"].indexOf(value) !== -1,
  },
  alignItems: {
    type: String,
    default: "center",
  },
});
</script>

<style scoped>
.flex-container {
  display: flex;
}
</style>
