<template>

    <a-row :gutter="[16, 24]">
        <a-col :span="24" :lg="6">
            <chart-card :loading="loading" :title="'Total Sales'" total="$ 189,345">
                <template #action>
                    <a-tooltip :title="'introduce'">
                        <i class='bx bx-info-circle'></i>
                    </a-tooltip>
                </template>

                <template #footer>
                    <div>Daily Sales ￥234.56
                    </div>
                </template>
            </chart-card>
        </a-col>
        <a-col :span="24" :lg="6">
            <chart-card :loading="loading" :title="'Visits'" total="$ 189,345">
                <template #action>
                    <a-tooltip :title="'introduce'">
                        <i class='bx bx-info-circle'></i>
                    </a-tooltip>
                </template>

                <template #footer>
                    <div>Daily Visits 123,4</div>
                </template>
            </chart-card>
        </a-col>
        <a-col :span="24" :lg="6">
            <chart-card :loading="loading" :title="'Payment'" total="$ 189,345">
                <template #action>
                    <a-tooltip :title="'introduce'">
                        <i class='bx bx-info-circle'></i>
                    </a-tooltip>
                </template>

                <template #footer>
                    <div>Conversion Rate 60%

                    </div>
                </template>
            </chart-card>
        </a-col>
        <a-col :span="24" :lg="6">
            <chart-card :loading="loading" :title="'Operational Effect'" total="73%">
                <template #action>
                    <a-tooltip :title="'introduce'">
                        <i class='bx bx-info-circle'></i>
                    </a-tooltip>
                </template>

                <template #footer>
                    <div>WoW Change 12%
                    </div>
                </template>
            </chart-card>
        </a-col>


    </a-row>

    <a-row style="margin: 0 -12px">
        <a-col style="padding: 0 12px" :xl="15" :lg="24" :md="24" :sm="24" :xs="24">
            <a-card :loading="loading" :bordered="false" style="margin-top: 24px" :title="'Search'">
                <HotSearchVue />
            </a-card>
        </a-col>

        <a-col style="padding: 0 12px" :xl="9" :lg="24" :md="24" :sm="24" :xs="24">
            <a-card :loading="loading" :bordered="false" style="margin-top: 24px" :title="'Total Balance'">
                <template #extra><a href="#">
                        <a-radio-group style="margin: -12px 0">
                            <a-radio-button value="a">All</a-radio-button>
                            <a-radio-button value="b">Online</a-radio-button>
                            <a-radio-button value="c">Stores</a-radio-button>
                        </a-radio-group>
                    </a></template>


                <TotalBalanceVue />
            </a-card>
        </a-col>
    </a-row>

</template>

<script setup>
import LineChart from "../../components/charts/LineChart.vue";
import ChartCard from "../../components/card/ChartCard.vue";
import Trend from '../../components/charts/Trend.vue'
import HotSearchVue from "./HotSearch.vue";
import TotalBalanceVue from "./TotalBalance.vue";
import { ref } from "@vue/reactivity";


let loading = ref(false)


</script>

<style lang="less" scoped>
</style>