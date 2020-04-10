<template>
  <div class="operation_data">
    <div class="opd_top">
      <ul class="opd_top_ul">
        <li>
          <p>待审核量</p>
          <strong>{{ operationDataTotal.to_audit_count }}</strong>
          条
        </li>
        <li>
          <p>审核总量</p>
          <strong>{{ operationDataTotal.has_audit_count }}</strong>
          条
        </li>
        <li>
          <p>入库总量</p>
          <strong>{{ operationDataTotal.total_count }}</strong>
          条
        </li>
        <li>
          <p>违规占比</p>
          <strong>{{ illegalRatio }} %</strong>
        </li>
      </ul>
    </div>
    <div class="opd_select" :class="{ audit_title_fixed: isFixed }">
      <div class="opd_timepick">
        <el-radio-group v-model="statDay" size="mini" @change="handleDayPick">
          <el-radio-button :label="1">昨天</el-radio-button>
          <el-radio-button :label="7">近7天</el-radio-button>
          <el-radio-button :label="15">近15天</el-radio-button>
          <el-radio-button :label="30">近30天</el-radio-button>
        </el-radio-group>
        <el-date-picker
          v-model="daysPick"
          size="mini"
          type="daterange"
          @change="handleDayPick"
          class="time_timepicker"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>
      <div class="opd_typepick">
        <el-radio-group
          v-model="typeRadio"
          @change="handleTypeRadioChange"
          class="opd_typepick_radio"
        >
          <el-radio label="all">所有</el-radio>
          <el-radio label="customer">按客户</el-radio>
          <el-radio label="purify">按类型</el-radio>
        </el-radio-group>
        <el-checkbox-group v-model="typeCheck" class="opd_typepick_check">
          <el-checkbox
            v-for="item in typeCheckList"
            :key="item"
            :label="item"
          ></el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="opd_main">
      <OrderNumSection
        ref="orderNum"
        :operationData="operationData"
        :typeRadio="typeRadio"
        :typeCheck="typeCheck"
      />
      <OrderTimeSection
        ref="orderTime"
        :operationData="operationData"
        :typeRadio="typeRadio"
        :typeCheck="typeCheck"
      />
      <PeopleCountSection
        ref="peopleCount"
        :operationData="operationData"
        :typeRadio="typeRadio"
        :typeCheck="typeCheck"
      />
      <ScoreSection
        ref="score"
        :operationData="operationData"
        :typeRadio="typeRadio"
        :typeCheck="typeCheck"
      />
    </div>
  </div>
</template>

<script>
import {
  fetchOperationData,
  fetchOperationDataTotal,
} from '@/apis/operationdata'
import { dateFormat } from '@/utils/dateFormat'
import { subDays } from 'date-fns'

export default {
  components: {
    OrderNumSection: () => import('./OrderNumSection.vue'),
    OrderTimeSection: () => import('./OrderTimeSection.vue'),
    PeopleCountSection: () => import('./PeopleCountSection.vue'),
    ScoreSection: () => import('./ScoreSection.vue'),
  },

  data() {
    return {
      operationDataTotal: {},
      operationData: {},
      statDay: 7,
      typeRadio: 'all',
      typeCheck: ['by_day'],
      typeCheckList: [],
      daysPick: [],
      isFixed: false,
    }
  },

  computed: {
    orderNum() {
      return this.operationData.order_num || {}
    },
    illegalRatio() {
      const { illegal_count, has_audit_count } = this.operationDataTotal
      const num = (illegal_count / has_audit_count) * 100
      return num ? num.toFixed(2) : 0
    },
  },

  methods: {
    // 获取所有图表的数据
    fetchOperationDataFn() {
      const days = this.daysPick.map((item) => {
        return dateFormat(item, 'yyyy-MM-dd')
      })
      fetchOperationData({
        stat_day__range: days.join(','),
      }).then((data) => {
        this.operationData = data
        if (this.typeRadio === 'all') {
          this.typeCheckList = []
          this.typeCheck = ['by_day']
        } else {
          const chartData = data.order_num[`by_day_and_${this.typeRadio}`] || {}
          this.typeCheckList = Object.keys(chartData)
          this.typeCheck = this.typeCheck.filter((item) =>
            this.typeCheckList.includes(item)
          )
        }
      })
    },

    // 控制时间选择Section的顶部悬浮
    registerScroll() {
      const scrollTop = document.getElementById('main_anchor').scrollTop || 0
      if (scrollTop > 240) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    },

    // 单选客户或者类型触发，修改this.typeCheck以触发子组件下面的handleChartDataFilter
    handleTypeRadioChange(type) {
      if (type === 'all') {
        this.typeCheckList = []
        this.typeCheck = ['by_day']
      } else {
        const chartData = this.orderNum[`by_day_and_${type}`] || {}
        const typeList = Object.keys(chartData)
        this.typeCheckList = typeList
        this.typeCheck = []
      }
    },

    // 日期变化触发
    handleDayPick(day) {
      if (day.length) {
        // 点选日期触发
        this.statDay = 0
        this.fetchOperationDataFn()
      } else {
        // 快捷方式选择日期触发
        this.daysPick = []
        this.$set(this.daysPick, 1, subDays(new Date(), 1))
        this.$set(this.daysPick, 0, subDays(new Date(), day))
        this.fetchOperationDataFn()
      }
    },
  },

  created() {
    // 获取总计数据
    fetchOperationDataTotal().then((data) => {
      this.operationDataTotal = data
    })
    this.handleDayPick(7)
  },

  mounted() {
    this.$nextTick(() => {
      window.onresize = () => {
        const sectionRefs = ['orderNum', 'orderTime', 'peopleCount', 'score']
        const chartRefs = ['Line', 'Histogram', 'Pie']
        sectionRefs.forEach((section) => {
          if (this.$refs[section]) {
            chartRefs.forEach((item) => {
              const chartKey = `${section}${item}`
              if (this.$refs[section]['$refs'][chartKey]) {
                if (this.$refs[section]['$refs'][chartKey].myChart) {
                  this.$refs[section]['$refs'][chartKey].myChart.resize()
                }
              }
            })
          }
        })
      }
    })
    // 顶部悬浮事件监听注册
    document
      .getElementById('main_anchor')
      .addEventListener('scroll', this.registerScroll, false)
  },

  beforeDestroy() {
    // 顶部悬浮事件监听销毁
    document
      .getElementById('main_anchor')
      .removeEventListener('scroll', this.registerScroll, false)
  },
}
</script>

<style lang="scss">
.operation_data {
  .el-switch {
    display: flex;
    justify-content: center;
    margin-top: 6px;
    .el-switch__label.is-active {
      color: #333;
    }
  }

  .opd_top {
    background: #fff;
    margin-bottom: 20px;
    margin-top: 20px;
    .opd_top_ul {
      display: flex;
      justify-content: space-around;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
      padding: 20px 0;
      li {
        border-right: 1px solid #ccc;
        flex-grow: 1;
        padding-left: 40px;
        font-size: 14px;
        color: #999;
        &:last-child {
          border-right: 0;
        }
        p {
          margin-bottom: 4px;
        }
        strong {
          font-size: 28px;
          color: #333;
          font-weight: bold;
          text-align: center;
        }
      }
    }
  }

  .audit_title_fixed {
    position: fixed;
    width: calc(100% - 333px);
    top: 64px;
    z-index: 99;
    box-shadow: 0 4px 12px 0 rgba(52, 63, 75, 0.06);
  }

  .opd_select {
    background: #fff;
    transform: all 2s;
    padding: 20px;
    padding-right: 40px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    .opd_timepick {
      display: flex;
      align-items: center;
      .el-radio-group {
        .el-radio-button {
          &:last-child {
            .el-radio-button__inner {
              border-radius: 0;
            }
          }
        }
      }
    }
    .opd_typepick {
      margin-top: 14px;
      display: flex;
      align-items: center;
      .opd_typepick_radio {
        flex-shrink: 0;
      }
      .opd_typepick_check {
        margin-left: 60px;
      }
    }

    .time_timepicker {
      border-left: none;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  .opd_main {
    .opd_section_chart {
      display: flex;
      margin-top: 20px;
    }
    .opd_section {
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
      padding: 20px;
      background: #fff;
      margin-top: 20px;
      color: #333;
      h3 {
        font-size: 20px;
        font-weight: bold;
      }
      h4 {
        font-size: 16px;
        text-align: center;
      }
      ul {
        display: flex;
        justify-content: center;
        li {
          width: 200px;
          border-right: 1px solid #ccc;
          margin-left: 100px;
          &:last-child {
            border-right: 0;
          }
          p {
            font-size: 14px;
            color: #999;
          }
          strong {
            font-size: 24px;
            color: #333;
          }
        }
      }
    }
    .opd_section_num {
    }
    .opd_section_time {
      .time_title {
        display: flex;
        justify-content: center;
        align-items: center;
        p {
          margin-right: 10px;
          font-size: 14px;
          color: #999;
        }
        strong {
          font-size: 24px;
          color: #333;
        }
      }
    }
  }
}
</style>
