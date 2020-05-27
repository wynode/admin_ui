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
            <span>{{ dateName }} - 上游响应统计</span>
          </div>
          <HistogramData
            ref="father"
            :chartData="chartData"
            v-loading="loading"
          />
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

    <el-row class="Mt15">
      <el-card class="box-card" style="height: 678px">
        <div slot="header" class="clearfix">
          <span>{{ dateName }}统计 - 省份访问</span>
        </div>
        <Map ref="chinaMap" :chartData="mapData" v-loading="loading3" />
        <!-- <LineData :chartData="lineChartData" mapOption="liveLineFlow" /> -->
      </el-card>
    </el-row>
  </div>
</template>

<script>
import { dateFormat } from '@/utils/dateFormat'
import { getDateData } from '@/apis/home'
import { getMapOptions, translate } from '@/utils/mappings'
import { filterFields } from './formConfig'
import { fetchMap } from '@/apis/all'

export default {
  data() {
    return {
      chartData: [],
      loading: true,
      mapData: [],
      originData: [],
      loading3: true,
      form: {
        date: new Date(),
      },
    }
  },
  components: {
    CurrentData: () => import('./CurrentData'),
    HistogramData: () => import('./HistogramData'),
    LineChart: () => import('@/components/echarts/LineChart'),
    Map: () => import('@/components/echarts/Map'),
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
        'status',
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
      let maxQps = 0
      const statusList = [
        'status10x',
        'status20x',
        'status30x',
        'status40x',
        'status50x',
      ]
      const totalChartData = this.originData.reduce((acc, cur) => {
        statusArray.forEach((key) => {
          if (key === 'qps') {
            maxQps = Math.max(cur[key], maxQps)
          } else if (key === 'status') {
            acc[key] += statusList.reduce((deepacc, deepcur) => {
              return cur[deepcur] + deepacc
            }, 0)
          } else {
            acc[key] += Number(cur[key])
          }
        })
        return acc
      }, initObj)
      const { outcomeTransfer, incomeTransfer, requestTimes } = totalChartData
      totalChartData.qps = maxQps
      totalChartData.outcomeAverageTransfer = outcomeTransfer / requestTimes
      totalChartData.incomeAverageTransfer = incomeTransfer / requestTimes

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
      this.getMapDataFn(date)
    },

    getMapDataFn(date) {
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
        if (tempArray.length) {
          this.mapData = tempArray
        } else {
          this.mapData = [{ name: '', value: '' }]
        }
        this.loading3 = false
      })
    },

    // getDateDataFn(date) {
    //   getDateData({ date }).then((data) => {
    //     this.chartData = data.result || []
    //     this.loading = false
    //   })
    // },

    ListObjectItemAdd(arrayList, start, sliceLength = 1) {
      let obj = {}
      this.liveTimeOptions.forEach((item) => {
        const key = item.value
        for (let index = 0; index < sliceLength; index++) {
          const objItem = arrayList[start + index] || {}
          const objItemValue = objItem[key] || 0
          obj[key] = obj[key] || 0 + objItemValue
        }
        // obj[key] = parseInt(obj[key] / sliceLength)
      })
      const middleArrayList = arrayList[start + Math.floor(sliceLength / 2)]
      obj.time = middleArrayList ? middleArrayList.time : arrayList[start].time
      return obj
    },

    getDateDataFn(date) {
      getDateData({ date }).then((data) => {
        // const result = data.result || []
        this.originData = data.result
        // if (result.length == 0) {
        //   for (let i = 0; i < 1000; i++) {
        //     result[i] = {}
        //   }
        // }
        // const totalLength = result.length || 0
        // const sliceLength = parseInt(totalLength / 150)
        // const pieLength = totalLength / sliceLength
        // let deputyDateData = []
        // for (let index = 0; index < pieLength; index++) {
        //   deputyDateData[index] = this.ListObjectItemAdd(
        //     result,
        //     index * sliceLength,
        //     sliceLength
        //   )
        // }
        this.loading = false
        this.chartData = this.originData
      })
    },
  },

  mounted() {
    const date = dateFormat(new Date(), 'yyMMdd')
    this.getDateDataFn(date)
    this.getMapDataFn(date)
    this.$nextTick(() => {
      window.onresize = () => {
        if (this.$refs.liveTimeLine) {
          this.$refs.liveTimeLine.myChart.resize()
          this.$refs.liveTimeLineFlow.myChart.resize()
          this.$refs.liveTimeLineAttack.myChart.resize()
        }
        if (this.$refs.chinaMap) {
          if (this.$refs.chinaMap.myChart) {
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
