<template>
  <div class="home">
    <el-row :gutter="15">
      <el-col :span="10">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>实时状态</span>
          </div>
          <CurrentData :currentData="currentData" />
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>上游响应统计</span>
          </div>
          <HistogramData :chartData="histogramChartData" v-loading="loading1" />
        </el-card>
      </el-col>
    </el-row>
    <el-row class="Mt15">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>近一小时统计 - 请求次数和http响应次数</span>
        </div>
        <LineChart
          v-if="lineChartData.length"
          ref="liveTimeLine"
          chartId="liveTimeLine"
          :chartData="lineChartData"
          mapOption="liveLine"
          v-loading="loading2"
        />
        <div v-else class="no_data">
          暂无数据
        </div>
      </el-card>
    </el-row>

    <el-row class="Mt15">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>近一小时统计 - 攻击请求拦截次数</span>
        </div>
        <LineChart
          v-if="lineChartData.length"
          ref="liveTimeLineAttack"
          chartId="liveTimeLineAttack"
          :chartData="lineChartData"
          mapOption="liveLineAttack"
          v-loading="loading2"
        />
        <div v-else class="no_data">
          暂无数据
        </div>
      </el-card>
    </el-row>

    <el-row class="Mt15">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>近一小时统计 - 流量</span>
        </div>
        <LineChart
          v-if="lineChartData.length"
          ref="liveTimeLineFlow"
          chartId="liveTimeLineFlow"
          :chartData="lineChartData"
          mapOption="liveLineFlow"
          v-loading="loading2"
        />
        <div v-else class="no_data">
          暂无数据
        </div>
        <!-- <LineData :chartData="lineChartData" mapOption="liveLineFlow" /> -->
      </el-card>
    </el-row>
  </div>
</template>

<script>
import { dateFormat } from '@/utils/dateFormat'
import { getDateData, getCurrentData } from '@/apis/home'
import { getMapOptions } from '@/utils/mappings'
import { subHours } from 'date-fns'

export default {
  data() {
    return {
      lineChartData: [],
      histogramChartData: [],
      loading1: true,
      loading2: true,
      currentData: {},
      interval: '',
    }
  },
  components: {
    CurrentData: () => import('./CurrentData'),
    // LineData: () => import('./LineData'),
    HistogramData: () => import('./HistogramData'),
    LineChart: () => import('@/components/echarts/LineChart'),
  },

  computed: {
    liveTimeOptions() {
      return getMapOptions('liveTime')
    },
  },

  methods: {
    getDateDataFn() {
      const date = dateFormat(new Date(), 'yyMMdd')
      getDateData({ date }).then((data) => {
        this.histogramChartData = data.result || []
        this.loading1 = false
      })
    },

    getTimeDataFn() {
      const date = dateFormat(new Date(), 'yyMMdd')
      const time = new Date()
      const startTime = dateFormat(subHours(time, 1), 'yyyy-MM-dd HH:mm:ss')
      const endTime = dateFormat(time, 'yyyy-MM-dd HH:mm:ss')
      getDateData({ date, startTime, endTime }).then((data) => {
        this.lineChartData = data.result || []
        this.loading2 = false
      })
    },

    getCurrentDataFn() {
      getCurrentData().then((data) => {
        this.currentData = data.result
      })
    },
  },

  mounted() {
    this.getCurrentDataFn()
    this.getDateDataFn()
    this.getTimeDataFn()
    const that = this
    this.interval = setInterval(function() {
      that.getCurrentDataFn()
    }, 3000)
    this.$nextTick(() => {
      window.onresize = () => {
        if (this.$refs.liveTimeLine) {
          this.$refs.liveTimeLine.myChart.resize()
          this.$refs.liveTimeLineFlow.myChart.resize()
          this.$refs.liveTimeLineAttack.myChart.resize()
        }
      }
    })
  },

  destroyed() {
    clearInterval(this.interval)
  },
}
</script>

<style lang="scss">
.home {
  .el-card {
    height: 378px;
  }
}
.date_data_switch_ul {
  float: right;
  display: flex;
  align-items: center;
  height: 20px;
  li {
    margin-right: 10px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #e2e2e2;
    &:hover {
      cursor: pointer;
      background-color: #999;
    }
  }
  .isChoice {
    background-color: #999;
  }
}
.no_data {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 120px;
}
</style>
