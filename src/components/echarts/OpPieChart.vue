<template>
  <div :id="chartId" style="width: 100%; height:300px;"></div>
</template>

<script>
require('echarts/lib/chart/pie')
require('echarts/lib/component/legend')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
// const echarts = require('echarts/lib/echarts')
import echarts from 'echarts'

const pieColorArray = [
  '#009688',
  '#1E9FFF',
  '#83C897',
  '#FFB980',
  '#D87A80',
  '#647994',
  '#011e3c',
  '#b1709b',
  '#ae94de',
  '#798dd4',
  '#a6d1d0',
  '#79adb6',
  '#f1e0c8',
]

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
    chartData: {
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
    chartData: {
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
      Object.keys(this.chartData).forEach((item) => {
        legendData.push(item)
        seriesData.push({
          value: this.chartData[item],
          name: item,
        })
      })
      return {
        legendData,
        seriesData,
      }
    },
    option() {
      return {
        // title: {
        //   text: this.titleName,
        //   // left: 100,
        //   top: 10,
        //   textStyle: {
        //     fontSize: 14,
        //   },
        // },
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
          left: '0',
          y: '0',
          data: this.commonData.legendData,
        },
        series: [
          {
            type: 'pie',
            // radius: ['45%', '65%'],
            radius: '60%',
            center: ['50%', '50%'],
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
              color: (params) => {
                return pieColorArray[params.dataIndex] || '#ae94de'
              },
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
