<template>
  <div class="opd_section opd_section_people">
    <h3>审核人力</h3>
    <ul>
      <li>
        <strong>{{ peopleCountTotal }}</strong>
        <p>总人力（去重）</p>
      </li>
      <li>
        <strong>{{ peopleCountAvg }}</strong>
        <p>日均人力</p>
      </li>
    </ul>
    <el-row class="opd_section_chart">
      <el-col :span="12">
        <LineChart
          v-show="peopleCountLineVis"
          ref="peopleCountLine"
          titleName="日均人力"
          chartId="peopleCountLine"
          :lineData="peopleCountChartData"
        />
        <OpHistogram
          v-show="!peopleCountLineVis"
          ref="peopleCountHistogram"
          titleName="日均人力"
          chartId="peopleCountHistogram"
          :histogramData="peopleCountChartData"
        />
        <el-switch
          v-model="peopleCountLineVis"
          active-color="#3398db"
          inactive-color="#2f4554"
          active-text="折线图"
          inactive-text="柱状图"
        ></el-switch>
      </el-col>
      <el-col :span="12">
        <OpPieChart
          v-if="typeRadio !== 'all'"
          ref="peopleCountPie"
          :titleName="
            typeRadio === 'customer' ? '人力分布-客户' : '人力分布-类型'
          "
          chartId="peopleCountPie"
          :pieChartData="peopleCountPieData"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'PeoPleCountSection',

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
  data() {
    return {
      peopleCountLineVis: false,
    }
  },

  components: {
    OpPieChart: () => import('@/components/echarts/OpPieChart'),
    LineChart: () => import('@/components/echarts/LineChart'),
    OpHistogram: () => import('@/components/echarts/OpHistogram'),
  },

  watch: {
    peopleCountLineVis(newValue) {
      if (newValue) {
        this.$nextTick(() => {
          this.$refs.peopleCountLine.myChart.resize()
        })
      } else {
        this.$nextTick(() => {
          this.$refs.peopleCountHistogram.myChart.resize()
        })
      }
    },
  },

  computed: {
    peopleCount() {
      return this.operationData.people_count || {}
    },

    peopleCountTotal() {
      if (this.typeRadio === 'all') {
        return this.peopleCount.total
      }
      const orderType = Object.keys(this.peopleCountPieData)
      return orderType.reduce((acc, cur) => {
        return acc + this.peopleCountPieData[cur]
      }, 0)
    },

    peopleCountAvg() {
      if (this.typeRadio === 'all') {
        return Number(this.peopleCount.avg).toFixed(2)
      }
      const orderType = Object.keys(this.peopleCountChartData)
      const firstValue = this.peopleCountChartData[orderType[0]] || []
      const dayLength = firstValue.length || 1
      return Number(this.peopleCountTotal / dayLength).toFixed(2)
    },

    peopleCountChartData() {
      return this.handleChartDataFilter(this.peopleCount)
    },

    peopleCountPieData() {
      return this.handleChartDataFilter(this.peopleCount, true)
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
