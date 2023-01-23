<template>
  <div>
    <h1>For admin , staff</h1>

    <div v-permission="['admin']">see if admin</div>
    <div v-permission="['staff']">see if staff</div>
    <div v-permission="['admin', 'staff']">see if admin ,staff</div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
