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
          <HistogramData
            ref="father"
            :chartData="histogramChartData"
            v-loading="loading1"
          />
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

    <el-row class="Mt15">
      <el-card class="box-card" style="height: 678px">
        <div slot="header" class="clearfix">
          <span>当天 - 省份访问</span>
        </div>
        <Map ref="chinaMap" :chartData="mapData" v-loading="loading3" />
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
import { fetchMap } from '@/apis/all'

export default {
  data() {
    return {
      lineChartData: [],
      histogramChartData: [],
      mapData: [],
      loading1: true,
      loading2: true,
      loading3: true,
      currentData: {},
      interval: '',
    }
  },
  components: {
    CurrentData: () => import('./CurrentData'),
    // LineData: () => import('./LineData'),
    HistogramData: () => import('./HistogramData'),
    LineChart: () => import('@/components/echarts/LineChart'),
    Map: () => import('@/components/echarts/Map'),
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

    getMapDataFn() {
      const date = dateFormat(new Date(), 'yyMMdd')
      fetchMap({ date }).then((data) => {
        let tempArray =
          data.result.list.reduce((acc, cur) => {
            let accTemp = acc
            if (cur.provinceName) {
              const isThree =
                cur.provinceName.includes('内蒙古') ||
                cur.provinceName.includes('黑龙江')
              accTemp.push({
                name: cur.provinceName.slice(0, isThree ? 3 : 2),
                value: Number(cur.accessNum),
              })
            } else {
              return acc
            }
            return accTemp
          }, []) || []
        tempArray.sort((a, b) => b.value - a.value)
        this.mapData = tempArray
        this.loading3 = false
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
    this.getMapDataFn()
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
          if (this.$refs.chinaMap) {
            this.$refs.chinaMap.myChart.resize()
          }
        }
        if (this.$refs.father) {
          if (this.$refs.father.$refs.liveTimePie) {
            this.$refs.father.$refs.liveTimePie.myChart.resize()
          }
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
