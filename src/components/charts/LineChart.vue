<template>
    <div>
        <div id="chart">
            <apexchart type="area" width="100%" height="auto" :options="chartOptions" :series="series"></apexchart>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            series: [{
                name: 'series1',
                data: [180, 175, 275, 140, 205, 190, 295]
            }],
            chartOptions: {
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
                    width: 2,

                },
                colors: ["#71dd37"],

                fill: {
                    type: "gradient",
                    gradient: {
                        shadeIntensity: 1,
                        inverseColors: false,
                        opacityFrom: 0.5,
                        opacityTo: 1,
                        stops: [0, 70, 0],
                    },
                },

                xaxis: {
                    type: 'category',
                    categories: [1, 2, 3, 4, 5, 6, 7],
                    show: false,
                    labels: {
                        show: false
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
                    padding: {
                        top: -40,
                        right: 0,
                        bottom: -20,
                        left: 0
                    },
                }
                ,
                tooltip: {
                    x: {
                        format: 'dd/MM/yy HH:mm'
                    },
                },
            },
        }
    },
}
</script>

<style lang="scss" scoped>
</style>