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
      handler() {
        this.$nextTick(() => {
          if (!this.myChart) {
            this.myChart = echarts.init(document.getElementById(this.chartId))
          }
          // this.myChart.setOption(this.option)
          this.myChart.clear()
          // if (Object.keys(newVal).length) {
          this.myChart.setOption(this.option)
          // }
        })
      },
    },
  },

  computed: {
    dataTotal() {
      return (
        Object.values(this.chartData).reduce((acc, cur) => acc + cur, 0) || 1
      )
    },
    commonData() {
      let legendData = []
      let seriesData = []
      let xAxisData = []
      const chartDataArray = Object.keys(this.chartData)
      xAxisData = chartDataArray
      legendData = chartDataArray
      seriesData.push({
        // name: key,
        type: 'bar',
        // stack: '总量',
        label: {
          show: true,
          position: 'top',
        },
        barWidth: '50%',
        itemStyle: {
          normal: {
            barBorderRadius: 4,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgb(0,150,136)' },
              { offset: 1, color: 'rgb(0,150,136, 0.9)' },
            ]),
          },
          emphasis: {
            barBorderRadius: 4,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgb(0,150,136) ' },
              { offset: 1, color: 'rgb(0,150,136, 0.9)' },
            ]),
          },
        },
        data: Object.values(this.chartData),
      })
      return {
        legendData,
        seriesData,
        xAxisData,
      }
    },
    option() {
      return {
        // title: {
        //   text: this.titleName,
        //   top: 10,
        //   textStyle: {
        //     fontSize: 14,
        //   },
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          // formatter: (params) => {
          //   console.log(params.value)
          //   const divisor = (params.value / this.dataTotal) * 100 || 0
          //   return `${params.value} ${divisor.toFixed(2)}%`
          // },
          formatter: (params) => {
            const divisor = (params[0].value / this.dataTotal) * 100 || 0
            return `${params[0].name}<br />次数：${
              params[0].value
            }<br />占比：${divisor.toFixed(2)}%`
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
          bottom: '2%',
          top: '8%',
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
