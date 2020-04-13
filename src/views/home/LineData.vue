<template>
  <div>
    <LineChart
      ref="liveTimeLine"
      titleName="审核量趋势"
      chartId="liveTimeLine"
      :chartData="chartData"
      :mapOption="mapOption"
    />
  </div>
</template>

<script>
export default {
  name: 'LineData',

  props: {
    chartData: {
      type: Array,
      default: () => [],
    },
    mapOption: {
      type: String,
      default: 'liveLine',
    },
  },

  components: {
    LineChart: () => import('@/components/echarts/LineChart'),
  },

  mounted() {
    // 控制echart根据屏幕伸缩
    this.$nextTick(() => {
      window.onresize = () => {
        if (this.$refs.liveTimeLine) {
          this.$refs.liveTimeLine.myChart.resize()
        }
      }
    })
  },
}
</script>
