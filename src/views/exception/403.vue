<template>
    <a-result status="403" title="403" sub-title="Sorry, you are not authorized to access this page.">
        <template #extra>
            <a-button type="primary" @click="$router.push('/')">
                Back to home
            </a-button>
        </template>
    </a-result>
</template>
<script setup></script>

<style lang="scss" scoped>
</style>