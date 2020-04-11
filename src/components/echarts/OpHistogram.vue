<template>
  <div :id="chartId" style="width: 100%; height:300px;"></div>
</template>

<script>
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
require('echarts/lib/component/grid')
const echarts = require('echarts/lib/echarts')

export default {
  props: {
    chartId: {
      type: String,
      default: 'histogram',
    },
    chartData: {
      type: Object,
      default: () => {},
    },
    titleName: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      myChart: '',
    }
  },

  watch: {
    chartData: {
      deep: true,
      immediate: true,
      handler(newVal) {
        this.$nextTick(() => {
          if (!this.myChart) {
            this.myChart = echarts.init(document.getElementById(this.chartId))
          }
          this.myChart.clear()
          if (Object.keys(newVal).length) {
            this.myChart.setOption(this.option)
          }
        })
      },
    },
  },

  computed: {
    commonData() {
      let legendData = []
      let seriesData = []
      let xAxisData = []
      const chartDataArray = Object.keys(this.chartData)
      xAxisData = this.chartData[chartDataArray[0]].map((val) => {
        return val.stat_day.slice(5)
      })
      chartDataArray.forEach((key) => {
        const noEmptyValArray = this.chartData[key].filter((item) => item !== 0)
        if (noEmptyValArray.length) {
          legendData.push(key)
          seriesData.push({
            name: key === 'by_day' ? '所有' : key,
            type: 'bar',
            stack: '总量',
            label: {
              show: chartDataArray.length <= 1,
              position: 'top',
            },
            data: this.chartData[key].map((val) => {
              return {
                label: val.stat_day.slice(5),
                value:
                  this.chartId === 'orderTimeHistogram'
                    ? Number(val.val / 60).toFixed(2)
                    : val.val,
              }
            }),
          })
        }
      })
      return {
        legendData,
        seriesData,
        xAxisData,
      }
    },
    option() {
      return {
        title: {
          text: this.titleName,
          top: 10,
          textStyle: {
            fontSize: 14,
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {
          data: this.commonData.legendData,
          top: 10,
          left: 100,
          right: 40,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: this.commonData.xAxisData,
        },
        yAxis: {
          type: 'value',
        },
        series: this.commonData.seriesData,
      }
    },
  },
}
</script>
