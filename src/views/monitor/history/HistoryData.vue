<template>
  <div class="history_2">
    <el-card>
      <el-form label-position="left" label-width="auto" :model="form">
        <el-form-item label="选择日期" class="Mt15">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期"
            size="small"
            @change="handleDateChange"
          ></el-date-picker>
        </el-form-item>
      </el-form>
    </el-card>

    <el-row :gutter="15" class="Mt15">
      <el-col :span="10">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ dateName }} - 数据统计</span>
          </div>
          <CurrentData :currentData="currentData" />
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-card class="box-card" style="height: 377px">
          <div slot="header" class="clearfix">
            <span>{{ dateName }} - http响应统计</span>
          </div>
          <HistogramData :chartData="chartData" v-loading="loading" />
        </el-card>
      </el-col>
    </el-row>
    <el-row class="Mt15">
      <el-card class="box-card" style="height: 378px">
        <div slot="header" class="clearfix">
          <span>{{ dateName }}统计 - 请求次数和http响应次数</span>
        </div>
        <LineChart
          v-if="chartData.length"
          ref="liveTimeLine"
          chartId="liveTimeLine"
          :chartData="chartData"
          mapOption="liveLine"
          v-loading="loading"
        />
        <div v-else class="no_data">
          暂无数据
        </div>
      </el-card>
    </el-row>

    <el-row class="Mt15">
      <el-card class="box-card" style="height: 378px">
        <div slot="header" class="clearfix">
          <span>{{ dateName }}统计 - 攻击请求拦截次数</span>
        </div>
        <LineChart
          v-if="chartData.length"
          ref="liveTimeLineAttack"
          chartId="liveTimeLineAttack"
          :chartData="chartData"
          mapOption="liveLineAttack"
          v-loading="loading"
        />
        <div v-else class="no_data">
          暂无数据
        </div>
      </el-card>
    </el-row>

    <el-row class="Mt15">
      <el-card class="box-card" style="height: 378px">
        <div slot="header" class="clearfix">
          <span>{{ dateName }}统计 - 流量</span>
        </div>
        <LineChart
          v-if="chartData.length"
          ref="liveTimeLineFlow"
          chartId="liveTimeLineFlow"
          :chartData="chartData"
          mapOption="liveLineFlow"
          v-loading="loading"
        />
        <div v-else class="no_data">
          暂无数据
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import { dateFormat } from '@/utils/dateFormat'
import { getDateData } from '@/apis/home'
import { getMapOptions, translate } from '@/utils/mappings'
import { filterFields } from './formConfig'

export default {
  data() {
    return {
      chartData: [],
      loading: true,
      form: {
        date: new Date(),
      },
    }
  },
  components: {
    CurrentData: () => import('./CurrentData'),
    HistogramData: () => import('./HistogramData'),
    LineChart: () => import('@/components/echarts/LineChart'),
  },

  computed: {
    liveTimeOptions() {
      return getMapOptions('liveTime')
    },

    filterFields() {
      return filterFields(this)
    },

    dateName() {
      const date = dateFormat(new Date(), 'MM月dd日')
      const formDate = dateFormat(this.form.date || new Date(), 'MM月dd日')
      let dateName = formDate
      if (formDate == date) {
        dateName = '今日'
      }
      return dateName || ''
    },

    currentData() {
      let chartData = {}
      const statusArray = [
        'qps',
        'requestTimes',
        'outcomeTransfer',
        'outcomeAverageTransfer',
        'incomeTransfer',
        'incomeAverageTransfer',
        'attackTimes',
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
        chartData[`${this.dateName}${translate(key, 'liveStatusDayHistory')}`] =
          totalChartData[key]
      })
      return chartData
    },
  },

  methods: {
    handleDateChange() {
      const date = dateFormat(this.form.date || new Date(), 'yyMMdd')
      this.getDateDataFn(date)
    },

    getDateDataFn(date) {
      getDateData({ date }).then((data) => {
        this.chartData = data.result || []
        this.loading = false
      })
    },
  },

  mounted() {
    const date = dateFormat(new Date(), 'yyMMdd')
    this.getDateDataFn(date)
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
}
</script>

<style lang="scss">
// .history_2 {
//   .el-card {
//     height: 378px;
//   }
// }
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
