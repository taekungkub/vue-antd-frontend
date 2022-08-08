<template>
    <apexchart type="area" width="100%" height="auto" :options="chartOptions" :series="series"></apexchart>
    <a-divider></a-divider>
    <div>
        You have done 57.6% more sales. <br>
        Check your new badge in your profile.
    </div>
</template>

<script setup>

const series = [{
    name: 'series1',
    data: [137, 210, 160, 275, 205, 315, 485]
}];
const chartOptions = {
    chart: {
        type: 'area',
        toolbar: {
            show: false,
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth',
        width: 3,

    },
    colors: ["#ffab00"],

    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 1,
            stops: [20, 100],
        },
    },

    xaxis: {
        type: 'category',
        categories: ["Jan", "Feb", "Mar", 'Apr', "May", "Jun", "Jul"],
        show: true,
        labels: {
            show: true
        },
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        },
        tooltip: {
            enabled: false,

        },

    },
    yaxis: {

        show: false,
        labels: {
            show: false
        },
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        }

    },
    grid: {
        show: false,

        // padding: {
        //     top: 0,
        //     right: 0,
        //     bottom: 0,
        //     left: 0
        // },
    }
    ,
    tooltip: {
        x: {
            format: 'dd/MM/yy HH:mm'
        },
    },
};



</script>

<style lang="scss" scoped>
</style>