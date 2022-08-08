<template>
    <div class="hot-search">
        <a-row style="margin: 0 -34px">

        </a-row>
        <a-table :dataSource="searchData" :columns="columns" :pagination="{ style: { marginBottom: 0 }, pageSize: 5 }"
            size="small" rowKey="index">


            <!-- <a href="#/" slot="keyword" slot-scope="text">{{ text }}</a>
            <span slot="rang" slot-scope="text">{{ text }} %
                <a-icon type="caret-up" />
            </span> -->


            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'keyword'">
                    <a>
                        {{ record.keyword }}
                    </a>
                </template>


                <template v-if="column.key === 'range'">
                    <span>
                        {{ record.range }} %
                        <i class='bx bx-caret-up'></i>
                    </span>
                </template>
            </template>
        </a-table>
    </div>
</template>

<script setup>
import { computed } from "@vue/runtime-core"



const searchData = []
for (let i = 0; i < 50; i++) {
    searchData.push({
        index: i + 1,
        keyword: 'Kieattisak - ' + i,
        count: Math.floor(Math.random() * 1000),
        range: Math.floor(Math.random() * 100),
        status: Math.floor((Math.random() * 10) % 2)
    })
}
const columns = [
    {
        title: 'Rank',
        dataIndex: 'index',
        key: 'rank'
    },
    {
        title: 'Keyword',
        dataIndex: 'keyword',
        key: 'keyword',
        scopedSlots: { customRender: 'keyword' }
    },
    {
        title: 'Users',
        dataIndex: 'count',
        key: 'users',
        sorter: (a, b) => a.count - b.count
    },
    {
        title: 'Range',
        dataIndex: 'range',
        key: 'range',
        scopedSlots: { customRender: 'rang' }
    }
]


</script>

<style lang="less" scoped>
</style>