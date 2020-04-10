<template>
  <div :id="chartId" style="width: 100%; height:320px;"></div>
</template>

<script>
require('echarts/lib/chart/line')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/grid')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
import echarts from 'echarts'

export default {
  props: {
    chartId: {
      type: String,
      default: 'lineChart',
    },
    titleName: {
      type: String,
      default: '',
    },
    lineData: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      myChart: '',
    }
  },

  watch: {
    lineData: {
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
      const lineDataArray = Object.keys(this.lineData)
      if (!lineDataArray.length) {
        return {
          legendData,
          seriesData,
          xAxisData,
        }
      }
      xAxisData = this.lineData[lineDataArray[0]].map((val) => {
        return val.stat_day.slice(5)
      })
      lineDataArray.forEach((key) => {
        const noEmptyValArray = this.lineData[key].filter((item) => item !== 0)
        if (noEmptyValArray.length) {
          legendData.push(key)
          seriesData.push({
            name: key === 'by_day' ? '所有' : key,
            type: 'line',
            smooth: true,
            label: {
              normal: {
                show: lineDataArray.length <= 1,
                position: 'top',
              },
            },
            data: this.lineData[key].map((val) => {
              return {
                label: val.stat_day.slice(5),
                value:
                  this.chartId === 'orderTimeLine'
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
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {},
        //   },
        // },
        legend: {
          data: this.commonData.legendData,
          top: 10,
          left: 100,
          right: 40,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
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
