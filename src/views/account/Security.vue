<template>
    <div class="pa-5">
        <a-typography-title :level="4"> Security </a-typography-title>

        <a-list class="demo-loadmore-list" item-layout="horizontal" :data-source="data">

            <template #renderItem="{ item }">
                <a-list-item>
                    <a-list-item-meta :description="item.desc">

                        <template #title>
                            <a href="https://www.antdv.com/">{{ item.title }}</a>
                        </template>
                    </a-list-item-meta>

                    <template #actions>
                        <a>{{ item.action }} </a>
                    </template>
                </a-list-item>
            </template>
        </a-list>
    </div>


</template>

<script setup>

const data = [{
    title: 'Account Password',
    desc: 'Current password strength： : Strong',
    action: 'Modify'
}, {
    title: 'Security Phone',
    desc: 'Bound phone： : 138****8293',
    action: 'Modify'

}, {
    title: 'Security Question',
    desc: 'The security question is not set, and the security policy can effectively protect the account security',
    action: 'Set'

}, {
    title: 'Backup Email',
    desc: 'Bound Email： : ant***sign.com',
    action: 'Modify'

}, {
    title: 'MFA Device',
    desc: 'Unbound MFA device, after binding, can be confirmed twic',
    action: 'Bind'

}];

</script>

<style lang="scss" scoped>
</style>