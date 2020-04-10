<template>
  <div class="opd_section opd_section_time">
    <h3>
      审核时效
    </h3>
    <div class="time_title">
      <p>总平均时效（分钟）</p>
      <strong>{{ orderTimeAvg }}</strong>
    </div>
    <el-row class="opd_section_chart">
      <el-col :span="12">
        <LineChart
          v-show="orderTimeLineVis"
          ref="orderTimeLine"
          titleName="日平均时效"
          chartId="orderTimeLine"
          :lineData="orderTimeChartData"
        />
        <OpHistogram
          v-show="!orderTimeLineVis"
          ref="orderTimeHistogram"
          titleName="日平均时效"
          chartId="orderTimeHistogram"
          :histogramData="orderTimeChartData"
        />
        <el-switch
          v-model="orderTimeLineVis"
          active-color="#3398db"
          inactive-color="#2f4554"
          active-text="折线图"
          inactive-text="柱状图"
        ></el-switch>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'OrderTimeSection',

  props: {
    operationData: {
      type: Object,
      default: () => {},
    },
    typeRadio: {
      type: String,
      default: '',
    },
    typeCheck: {
      type: Array,
      default: () => [],
    },
  },

  components: {
    LineChart: () => import('@/components/echarts/LineChart'),
    OpHistogram: () => import('@/components/echarts/OpHistogram'),
  },

  data() {
    return {
      orderTimeLineVis: false,
    }
  },

  watch: {
    orderTimeLineVis(newValue) {
      if (newValue) {
        this.$nextTick(() => {
          this.$refs.orderTimeLine.myChart.resize()
        })
      } else {
        this.$nextTick(() => {
          this.$refs.orderTimeHistogram.myChart.resize()
        })
      }
    },
  },

  computed: {
    orderTime() {
      return this.operationData.order_time || {}
    },

    orderTimeChartData() {
      return this.handleChartDataFilter(this.orderTime)
    },

    orderTimeAvg() {
      const orderType = Object.keys(this.orderTimeChartData)
      const firstValue = this.orderTimeChartData[orderType[0]] || []
      const dayLength = firstValue.length || 1
      const accNum = orderType.reduce((acc, cur) => {
        return (
          acc +
          this.orderTimeChartData[cur].reduce((deepacc, deepcur) => {
            return deepacc + deepcur.val
          }, 0)
        )
      }, 0)
      return orderType.length
        ? Number(accNum / (orderType.length * dayLength) / 60).toFixed(2)
        : 0
    },
  },

  methods: {
    // 图表数据的计算属性方法，自变量为this.typeCheck，因变量为图表数据。
    handleChartDataFilter(originData, pie) {
      let chartData = {}
      if (pie) {
        chartData = originData[`by_${this.typeRadio}`] || {}
      } else {
        chartData =
          originData[
            `by_day${this.typeRadio === 'all' ? '' : `_and_${this.typeRadio}`}`
          ] || {}
      }
      let chartDataFilter = {}
      Object.keys(chartData).forEach((item) => {
        if (this.typeCheck.includes(item)) {
          chartDataFilter[item] = chartData[item]
        }
      })
      return chartDataFilter
    },
  },
}
</script>
