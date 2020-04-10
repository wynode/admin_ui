<template>
  <div>
    <div class="cpd_top">
      <ul class="cpd_top_ul">
        <li class="cpd_top_li">
          <strong>{{ checkPointData.score_total }}</strong>
          <p>净网积分</p>
        </li>
        <li class="cpd_top_li">
          <strong>{{ checkPointData.all_purify_count }}</strong>
          <p>净网总数</p>
        </li>
        <li class="cpd_top_li">
          <strong>
            {{ Number(checkPointData.total_succ_rate).toFixed(2) }}%
          </strong>
          <p>准确率</p>
        </li>
      </ul>
    </div>
    <div class="cpd_timepick">
      <el-button
        plain
        size="mini"
        class="time_seven_day"
        :class="{ seven_day_active: sevenDayActive }"
        @click="handleDayPick(7)"
      >
        7日
      </el-button>
      <el-button
        plain
        size="mini"
        class="time_thirty_day"
        :class="{ thirty_day_active: thirtyDayActive }"
        @click="handleDayPick(30)"
      >
        30日
      </el-button>
      <el-date-picker
        v-model="daysPick"
        size="mini"
        type="daterange"
        @change="handleTimePickChange"
        class="time_timepicker"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
    </div>
    <div>
      <el-row>
        <el-col :span="11">
          <div class="cpd_chart">
            <div class="cpd_chart_top">
              <h3>净网积分</h3>
              <p>
                近
                <span>{{ days }}</span>
                日新增
                <span>{{ successDays.total_count }}</span>
                积分
              </p>
            </div>
            <Histogram
              ref="score_stat"
              chartId="score_stat"
              chartName="通关数"
              :histogramData="checkPointData.score_stat"
            />
          </div>
        </el-col>
        <el-col :span="11" :offset="2">
          <div class="cpd_chart">
            <div class="cpd_chart_top">
              <h3>净网数量</h3>
              <p>
                近
                <span>{{ days }}</span>
                日净网
                <span>{{ checkPointDays.total_count }}</span>
                条
              </p>
            </div>
            <Histogram
              ref="purify_count_stat"
              chartId="purify_count_stat"
              chartName="冲关星"
              :histogramData="checkPointData.purify_count_stat"
            />
          </div>
        </el-col>
      </el-row>
      <el-row class="Mt20">
        <el-col :span="11">
          <div class="cpd_chart">
            <div class="cpd_chart_top">
              <h3>违规类型</h3>
              <p>
                近
                <span>{{ days }}</span>
                日净化
                <span>{{ categoryDays.total_count }}</span>
                条违规
              </p>
            </div>
            <pieChart
              ref="purify_category_stat"
              chartId="purify_category_stat"
              pieDataName="purifyCategoryStat"
              :pieChartData="checkPointData.purify_category_stat"
            />
          </div>
        </el-col>
        <el-col :span="11" :offset="2">
          <div class="cpd_chart">
            <div class="cpd_chart_top">
              <h3>准确率</h3>
              <p>
                近
                <span>{{ days }}</span>
                日准确率
                <span>{{ Number(correctDays.total_rate).toFixed(2) }} %</span>
              </p>
            </div>
            <Histogram
              ref="correct_rate"
              chartName="答题正确率"
              chartId="correct_rate_x"
              :histogramData="checkPointData.correct_rate_stat"
            />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { fetchPurifyData } from '@/apis/users.js'
import { dateFormat } from '@/utils/dateFormat'
import { subDays } from 'date-fns'

export default {
  name: 'CheckPointData',
  components: {
    Histogram: () => import('@/components/echarts/Histogram'),
    PieChart: () => import('@/components/echarts/PieChart'),
  },

  data() {
    return {
      checkPointData: {},
      successDays: {},
      checkPointDays: {},
      categoryDays: {},
      correctDays: {},
      days: '',
      daysPick: [],
      sevenDayActive: false,
      thirtyDayActive: false,
    }
  },

  methods: {
    async fetchPurifyDataFn() {
      const { id } = this.$route.params
      const data = await fetchPurifyData(id, {
        start_day: dateFormat(this.daysPick[0], 'yyyy-MM-dd'),
        end_day: dateFormat(this.daysPick[1], 'yyyy-MM-dd'),
      })
      this.checkPointData = data
      this.successDays = data.score_stat.days_total
      this.checkPointDays = data.purify_count_stat.days_total
      this.categoryDays = data.purify_category_stat.days_total
      this.correctDays = data.correct_rate_stat.days_total
      this.days = data.days
    },

    handleDayPick(day) {
      if (day) {
        this.daysPick = []
        this.$set(this.daysPick, 1, new Date())
        this.$set(this.daysPick, 0, subDays(new Date(), day))
        this.sevenDayActive = day === 7 ? true : false
        this.thirtyDayActive = day === 30 ? true : false
      } else {
        this.sevenDayActive = false
        this.thirtyDayActive = false
      }
      if (!this.daysPick) {
        return this.handleDayPick(7)
      }
      this.fetchPurifyDataFn()
    },

    handleTimePickChange() {
      this.handleDayPick()
    },
  },

  mounted() {
    this.$nextTick(() => {
      window.onresize = () => {
        this.$refs.score_stat.myChart.resize()
        this.$refs.purify_count_stat.myChart.resize()
        this.$refs.correct_rate.myChart.resize()
        this.$refs.purify_category_stat.myChart.resize()
      }
    })
    this.handleDayPick(7)
  },
}
</script>

<style lang="scss">
.cpd_top {
  text-align: center;
  .cpd_top_ul {
    display: flex;
    margin: 0 auto;
    width: 80%;
    margin-top: 4px;
    .cpd_top_li {
      position: relative;
      width: 33%;
      strong {
        font-weight: bold;
        font-size: 20px;
        color: #333;
      }
      p {
        color: #333;
        font-weight: 500;
        font-size: 14px;
      }
      &::after {
        content: '';
        position: absolute;
        top: 10px;
        right: 0;
        width: 0;
        height: 30px;
        border: 1px solid #ccc;
      }
      &:last-child {
        &::after {
          border: 0;
        }
      }
    }
  }
}
.cpd_chart {
  padding: 20px 30px;
  .cpd_chart_top {
    h3 {
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 4px;
      color: #333;
    }
    p {
      color: #999;
      span {
        font-weight: bold;
        color: #333;
      }
    }
  }
}

.cpd_timepick {
  display: flex;
  align-items: center;
  margin-left: 30px;
  margin-top: 50px;
  margin-bottom: 4px;
  .time_seven_day {
    border-radius: 0;
  }
  .time_thirty_day {
    margin: 0;
    border-radius: 0;
  }
  .time_timepicker {
    border-radius: 0;
  }
  .seven_day_active {
    border-color: #845bea;
    color: #845bea;
  }
  .thirty_day_active {
    border-color: #845bea;
    color: #845bea;
  }
}
</style>
