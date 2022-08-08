<template>
    <a-card :style="{ borderRadius: '8px' }">
        <div :style="{ display: 'flex', justifyContent: 'space-between' }">
            <h2 class="mb-5">Customer</h2>
            <a-row>
                <a-col :span="24">
                    <a-input placeholder="Search" class="ml-2" />
                </a-col>
            </a-row>
        </div>
        <a-table :dataSource="dataSource" :columns="columns" :scroll="{ x: 400 }">



            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'name'">
                    <a>
                        {{ record.name }}
                    </a>
                </template>

                <template v-if="column.key === 'country'">
                    <div>
                        {{ record.country.name }}
                    </div>
                </template>


                <template v-if="column.key === 'agent'">
                    <div>
                        <img :src="`https://www.primefaces.org/primevue/demo/images/avatar/${record.representative.image}`"
                            width="32" alt="">
                        <span class="ml-3">{{ record.representative.name }}</span>
                    </div>
                </template>


                <template v-if="column.key === 'verified'">
                    <a-tag color="green" v-if="record.verified"> QUALIFIED</a-tag>
                    <a-tag color="red" v-else> UNQUALIFIED</a-tag>
                </template>

                <template v-if="column.key === 'balance'">
                    <div>${{ record.balance }} </div>
                </template>


                <template v-if="column.key === 'activity'">
                    <a-progress :percent="record.activity" :showInfo="false" />
                </template>


            </template>


        </a-table>
    </a-card>
</template>

<script setup>

import Customer from "../../config/customer.json"

const dataSource = Customer.data


const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
    },
    {
        title: 'Agent',
        dataIndex: 'agent',
        key: 'agent',
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        sorter: (a, b) => b.date.localeCompare(a.date),

    },
    {
        title: 'Balance',
        dataIndex: 'balance',
        key: 'balance',
        sorter: {
            compare: (a, b) => b.balance - a.balance,
        },
    },
    {
        title: 'Status',
        dataIndex: 'verified',
        key: 'verified',
        width: 100,
        sorter: {
            compare: (a, b) => b.verified - a.verified,
        },
    },
    {
        title: 'Activity',
        dataIndex: 'activity',
        key: 'activity',
        sorter: {
            compare: (a, b) => b.activity - a.activity,
        },
    },
];

</script>

<style lang="scss" scoped>
</style>