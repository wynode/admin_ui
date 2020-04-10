<template>
  <div :id="chartId" style="width: 100%; height:340px;"></div>
</template>

<script>
require('echarts/lib/chart/pie')
require('echarts/lib/component/legend')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
// const echarts = require('echarts/lib/echarts')
import echarts from 'echarts'

// const pieColorArray = [
//   '#13003e',
//   '#2d0094',
//   '#4c0bc2',
//   '#6736e1',
//   '#845bea',
//   '#937aff',
// ]

export default {
  props: {
    chartId: {
      type: String,
      default: 'pieChart',
    },
    titleName: {
      type: String,
      default: '',
    },
    pieChartData: {
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
    pieChartData: {
      immediate: true,
      deep: true,
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
      Object.keys(this.pieChartData).forEach((item) => {
        if (this.pieChartData[item]) {
          legendData.push(item)
          seriesData.push({
            value: this.pieChartData[item],
            name: item,
          })
        }
      })
      return {
        legendData,
        seriesData,
      }
    },
    option() {
      return {
        title: {
          text: this.titleName,
          left: 80,
          top: 10,
          textStyle: {
            fontSize: 14,
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            return (
              `${params.name}: ${params.value}, ` +
              `${params.percent.toFixed(0)}%`
            )
          },
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          left: '75%',
          y: 'center',
          data: this.commonData.legendData,
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            center: ['45%', '50%'],
            label: {
              formatter: (params) => {
                return `${params.name} ${params.percent.toFixed(0)}%`
              },
            },
            data: this.commonData.seriesData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
            itemStyle: {
              // color: (params) => {
              //   return pieColorArray[params.dataIndex]
              // },
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      }
    },
  },
}
</script>
