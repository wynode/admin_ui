<template>
  <div>
    <OpPieChart
      ref="liveTimePie"
      titleName="审核量趋势"
      chartId="liveTimePie"
      :chartData="pieChartData"
    />
  </div>
</template>

<script>
import { translate } from '@/utils/mappings'

export default {
  name: 'DateData',
  props: {
    chartData: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    pieChartData() {
      let chartData = {}
      const statusArray = [
        'status10x',
        'status20x',
        'status30x',
        'status40x',
        'status50x',
      ]
      let initObj = {}
      statusArray.forEach((item) => {
        initObj[item] = 0
      })
      const totalChartData = this.chartData.reduce((acc, cur) => {
        statusArray.forEach((key) => {
          acc[key] += cur[key]
        })
        return acc
      }, initObj)
      statusArray.forEach((key) => {
        chartData[translate(key, 'liveTime')] = totalChartData[key]
      })
      return chartData
    },
  },

  components: {
    OpPieChart: () => import('@/components/echarts/OpPieChart'),
  },

  mounted() {
    // 控制echart根据屏幕伸缩
    this.$nextTick(() => {
      window.onresize = () => {
        if (this.$refs.liveTimePie) {
          this.$refs.liveTimePie.myChart.resize()
        }
      }
    })
  },
}
</script>
