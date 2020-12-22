<template lang="">
    <div>
        <div class="chart" >
        <v-chart ref="child" :options="option"  />
        </div>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                option: {
                    title: {
                        text: '近一周订单数量'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        type: 'category',
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    legend: {
                        show: true,
                        data: [{
                            name: '近一周订单数量',

                        }]
                    },
                    series: [{
                        name: '近一周订单数量',
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line'
                    }],
                    color: [
                        'red'
                    ]
                },
            }
        },
    }
</script>
<style lang="">
    .echarts {
        width: 100%;
        height: 100%;
    }
    
    .chart {
        width: 1000px;
    }
</style>