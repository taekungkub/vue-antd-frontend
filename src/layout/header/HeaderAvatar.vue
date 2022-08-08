<template>
    <a-dropdown>
        <div class="header-avatar" style="cursor: pointer">

            <a-avatar class="avatar" size="small" shape="circle" src="https://joeschmoe.io/api/v1/random"
                :style="{ border: '2px solid red' }" />

            <span class="name">Tae</span>
        </div>

        <template #overlay>
            <a-menu :class="['avatar-menu']">
                <a-menu-item>
                    <router-link to="/profile">
                        <i class='bx bx-user' style="margin-right: 12px;"></i>
                        <span>Profile</span>
                    </router-link>
                </a-menu-item>
                <a-menu-item>
                    <router-link to="/account/setting">
                        <i class='bx bx-cog' style="margin-right: 12px;"></i>
                        <span>Setting</span>
                    </router-link>

                </a-menu-item>
                <a-menu-divider />
                <a-menu-item @click="showPromiseConfirm()">

                    <i class="bx bx-log-out" style="margin-right: 12px;"></i>
                    <span>Logout</span>



                </a-menu-item>
            </a-menu>
        </template>


    </a-dropdown>
</template>

<script setup>
import { useUserStore } from "../../stores/user";
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { createVNode } from 'vue';
import { Modal } from 'ant-design-vue';
import router from "../../router";

const user = useUserStore();

function showPromiseConfirm() {
    Modal.confirm({
        title: 'Message',
        icon: createVNode(ExclamationCircleOutlined),
        content: 'Are you sure you would like to logout?',

        async onOk() {
            try {
                return await new Promise((resolve, reject) => {
                    setTimeout(() => {
                        user.logout()
                        router.push("/login")
                        resolve()
                    }, 2000);
                });
            } catch {
                return console.log('Oops errors!');
            }
        },

        onCancel() { },
    })
}

</script>

<style lang="less">
.header-avatar {
    display: inline-flex;

    .avatar,
    .name {
        align-self: center;
    }

    .avatar {
        margin-right: 8px;
    }

    .name {
        font-weight: 500;
    }
}

.avatar-menu {
    width: 150px;
}
</style>