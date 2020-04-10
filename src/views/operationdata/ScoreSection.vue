<template>
  <div class="opd_section opd_section_score">
    <h3>审核积分</h3>
    <ul>
      <li>
        <strong>{{ Number(scoreTotal).toFixed(2) }}</strong>
        <p>净支出积分</p>
      </li>
      <li>
        <strong>{{ Number(scorePurifyTotal).toFixed(2) }}</strong>
        <p>净网支出</p>
      </li>
      <li>
        <strong>{{ Number(scorePenaltyTotal).toFixed(2) }}</strong>
        <p>扣罚</p>
      </li>
    </ul>
    <el-row class="opd_section_chart">
      <el-col :span="12">
        <LineChart
          v-show="scorceLineVis"
          titleName="日均净支出积分"
          ref="scoreLine"
          chartId="scoreLine"
          :lineData="scoreChartData"
        />
        <OpHistogram
          v-show="!scorceLineVis"
          ref="scoreHistogram"
          titleName="日均净支出积分"
          chartId="scoreLineHistogram"
          :histogramData="scoreChartData"
        />
        <el-switch
          v-model="scorceLineVis"
          active-color="#3398db"
          inactive-color="#2f4554"
          active-text="折线图"
          inactive-text="柱状图"
        ></el-switch>
      </el-col>
      <el-col :span="12">
        <OpPieChart
          v-if="typeRadio !== 'all'"
          ref="scorePie"
          :titleName="
            typeRadio === 'customer' ? '积分分布-客户' : '积分分布-类型'
          "
          chartId="scorePie"
          :pieChartData="scorePieData"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ScoreSection',

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
    OpPieChart: () => import('@/components/echarts/OpPieChart'),
    LineChart: () => import('@/components/echarts/LineChart'),
    OpHistogram: () => import('@/components/echarts/OpHistogram'),
  },

  data() {
    return {
      scorceLineVis: false,
    }
  },

  watch: {
    scorceLineVis(newValue) {
      if (newValue) {
        this.$nextTick(() => {
          this.$refs.scoreLine.myChart.resize()
        })
      } else {
        this.$nextTick(() => {
          this.$refs.scoreLineHistogram.myChart.resize()
        })
      }
    },
  },

  computed: {
    score() {
      return this.operationData.score || {}
    },

    // 直线图数据
    scoreChartData() {
      const chartData =
        this.score[
          `by_day${this.typeRadio === 'all' ? '' : `_and_${this.typeRadio}`}`
        ] || {}
      return this.handleChartDataFilter(chartData, this.typeCheck)
    },

    // 饼状图数据
    scorePieData() {
      const chartData = this.score[`by_${this.typeRadio}`] || {}
      return this.handleChartDataFilter(chartData, this.typeCheck)
    },

    // 净支出积分（实际支出的）
    scoreTotal() {
      if (this.typeRadio === 'all') {
        return this.score.total
      } else {
        const chartData = this.score[`by_${this.typeRadio}`] || {}
        const chartDataFilter = this.handleChartDataFilter(
          chartData,
          this.typeCheck
        )
        return Object.keys(chartDataFilter).reduce((acc, cur) => {
          return acc + chartDataFilter[cur]
        }, 0)
      }
    },

    // 净网支出积分（理论支出的，最大的）
    scorePurifyTotal() {
      if (this.typeRadio === 'all') {
        return this.score.purify_total
      } else {
        const chartData = this.score[`purify_score_by_${this.typeRadio}`] || {}
        const chartDataFilter = this.handleChartDataFilter(
          chartData,
          this.typeCheck
        )
        return Object.keys(chartDataFilter).reduce((acc, cur) => {
          return acc + chartDataFilter[cur]
        }, 0)
      }
    },

    // 扣罚积分（等于净网支出积分-净支出积分）
    scorePenaltyTotal() {
      return Number(this.scorePurifyTotal - this.scoreTotal).toFixed(2)
    },
  },

  methods: {
    // 图表数据的计算属性方法，自变量为typeCheck，因变量为图表数据。
    handleChartDataFilter(chartData, typeCheck) {
      let chartDataFilter = {}
      Object.keys(chartData).forEach((item) => {
        if (typeCheck.includes(item)) {
          chartDataFilter[item] = chartData[item]
        }
      })
      return chartDataFilter
    },
  },
}
</script>
