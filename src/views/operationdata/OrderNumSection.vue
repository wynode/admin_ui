<template>
  <div class="opd_section opd_section_num">
    <h3>审核数量</h3>
    <ul>
      <li>
        <strong>{{ orderNumTotal }}</strong>
        <p>审核数量</p>
      </li>
      <li>
        <strong>{{ orderNumIllegalNum }}</strong>
        <p>违规数量</p>
      </li>
      <li>
        <strong>{{ orderNumIllegalRatio }} %</strong>
        <p>违规占比</p>
      </li>
    </ul>
    <el-row class="opd_section_chart">
      <el-col :span="12">
        <LineChart
          v-show="orderNumLineVis"
          ref="orderNumLine"
          titleName="审核量趋势"
          chartId="orderNumLine"
          :lineData="orderNumChartData"
        />
        <OpHistogram
          v-show="!orderNumLineVis"
          ref="orderNumHistogram"
          titleName="审核量趋势"
          chartId="orderNumHistogram"
          :histogramData="orderNumChartData"
        />
        <el-switch
          v-model="orderNumLineVis"
          active-color="#3398db"
          inactive-color="#2f4554"
          active-text="折线图"
          inactive-text="柱状图"
        ></el-switch>
      </el-col>
      <el-col :span="12">
        <OpPieChart
          ref="orderNumPie"
          titleName="违规类型分布"
          chartId="orderNumPie"
          :pieChartData="orderNumPieData"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'OrderNumSection',

  props: {
    operationData: {
      type: Object,
      default: () => {},
    },
    typeRadio: {
      type: String,
      default: 'all',
    },
    typeCheck: {
      type: Array,
      default: () => ['by_day'],
    },
  },

  components: {
    OpPieChart: () => import('@/components/echarts/OpPieChart'),
    LineChart: () => import('@/components/echarts/LineChart'),
    OpHistogram: () => import('@/components/echarts/OpHistogram'),
  },

  data() {
    return {
      orderNumLineVis: false,
    }
  },

  watch: {
    orderNumLineVis(newValue) {
      if (newValue) {
        this.$nextTick(() => {
          this.$refs.orderNumLine.myChart.resize()
        })
      } else {
        this.$nextTick(() => {
          this.$refs.orderNumHistogram.myChart.resize()
        })
      }
    },
  },

  computed: {
    orderNum() {
      return this.operationData.order_num || {}
    },

    orderNumChartData() {
      return this.handleChartDataFilter(this.orderNum, false)
    },

    orderNumPieData() {
      const illegalByType = this.orderNum.illegal_by_type || {}
      let pieData = {}
      Object.keys(illegalByType).forEach((item) => {
        const accNum = illegalByType[item].reduce((acc, cur) => {
          if (this.typeRadio === 'purify') {
            if (this.typeCheck.includes(cur.purifyconfig_name)) {
              return acc + cur.value
            }
          } else if (this.typeRadio === 'customer') {
            if (this.typeCheck.includes(cur.customer_name)) {
              return acc + cur.value
            }
          } else {
            return acc + cur.value
          }
          return acc
        }, 0)
        if (accNum !== 0) {
          pieData[item] = accNum
        }
      })
      return pieData
    },

    orderNumTotal() {
      return Object.keys(this.orderNumChartData).reduce((acc, cur) => {
        const deepAdd = this.orderNumChartData[cur].reduce(
          (deepacc, deepcur) => {
            return deepacc + deepcur.val
          },
          0
        )
        return acc + deepAdd
      }, 0)
    },

    orderNumIllegalNum() {
      return Object.keys(this.orderNumPieData).reduce((acc, cur) => {
        return acc + this.orderNumPieData[cur]
      }, 0)
    },

    orderNumIllegalRatio() {
      const num = (this.orderNumIllegalNum / this.orderNumTotal) * 100
      return num ? num.toFixed(2) : 0
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
