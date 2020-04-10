<template>
  <div>
    <div class="cpd_top">
      <ul class="cpd_top_ul">
        <li class="cpd_top_li">
          <strong>{{ checkPointData.all_success_count }}</strong>
          <p>通关数</p>
        </li>
        <li class="cpd_top_li">
          <strong>{{ checkPointData.all_ranking }}</strong>
          <p>冲关星</p>
        </li>
        <li class="cpd_top_li">
          <strong>{{ checkPointData.succ_rate }}</strong>
          <p>答题正确率</p>
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
              <h3>通关数</h3>
              <p>
                近
                <span>{{ days }}</span>
                日新通过
                <span>{{ successDays.total_count }}</span>
                关
              </p>
            </div>
            <Histogram
              ref="success_count"
              chartId="success_count"
              chartName="通关数"
              :histogramData="checkPointData.success_count_stat"
            />
          </div>
        </el-col>
        <el-col :span="11" :offset="2">
          <div class="cpd_chart">
            <div class="cpd_chart_top">
              <h3>冲关星</h3>
              <p>
                近
                <span>{{ days }}</span>
                日新增
                <span>{{ checkPointDays.total_count }}</span>
                冲关星
              </p>
            </div>
            <Histogram
              ref="check_point"
              chartId="check_point"
              chartName="冲关星"
              :histogramData="checkPointData.check_point_score_stat"
            />
          </div>
        </el-col>
      </el-row>
      <el-row class="Mt20">
        <el-col :span="11">
          <div class="cpd_chart">
            <div class="cpd_chart_top">
              <h3>答题类型</h3>
              <p>
                近
                <span>{{ days }}</span>
                日作答
                <span>{{ categoryDays.total_count }}</span>
                题
              </p>
            </div>
            <pieChart
              ref="question_category"
              chartId="question_category"
              :pieChartData="checkPointData.question_category_stat"
            />
          </div>
        </el-col>
        <el-col :span="11" :offset="2">
          <div class="cpd_chart">
            <div class="cpd_chart_top">
              <h3>答题正确率</h3>
              <p>
                近
                <span>{{ days }}</span>
                日答题正确率
                <span>
                  {{ Number(correctDays.total_rate * 100).toFixed(2) }} %
                </span>
              </p>
            </div>
            <Histogram
              ref="correct_rate"
              chartName="答题正确率"
              chartId="correct_rate"
              :histogramData="checkPointData.correct_rate_stat"
            />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { fetchCheckPointData } from '@/apis/users.js'
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
    async fetchCheckPointDataFn() {
      const { id } = this.$route.params
      const data = await fetchCheckPointData(id, {
        start_day: dateFormat(this.daysPick[0], 'yyyy-MM-dd'),
        end_day: dateFormat(this.daysPick[1], 'yyyy-MM-dd'),
      })
      this.checkPointData = data
      this.successDays = data.success_count_stat.days_total
      this.checkPointDays = data.check_point_score_stat.days_total
      this.categoryDays = data.question_category_stat.days_total
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
      this.fetchCheckPointDataFn()
    },

    handleTimePickChange() {
      this.handleDayPick()
    },
  },

  mounted() {
    this.$nextTick(() => {
      window.onresize = () => {
        this.$refs.success_count.myChart.resize()
        this.$refs.check_point.myChart.resize()
        this.$refs.correct_rate.myChart.resize()
        this.$refs.question_category.myChart.resize()
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
