<template>
  <div :id="chartId" style="width: 100%; height:300px;"></div>
</template>

<script>
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/grid')
const echarts = require('echarts/lib/echarts')

export default {
  props: {
    chartId: {
      type: String,
      default: 'histogram',
    },
    histogramData: {
      type: Object,
      default: () => {
        return {
          days: [],
          days_total: {},
        }
      },
    },
    chartName: {
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
    histogramData: {
      deep: true,
      handler(newVal) {
        if (newVal) {
          this.myChart = echarts.init(document.getElementById(this.chartId))
          this.myChart.setOption(this.option)
        }
      },
    },
  },

  computed: {
    option() {
      return {
        color: ['#3398DB'],
        tooltip: {
          formatter: (params) => {
            let pvalue = params.value
            if (this.chartId === 'correct_rate') {
              pvalue = `${Number(pvalue * 100).toFixed(2)}%`
            } else if (this.chartId === 'correct_rate_x') {
              pvalue = `${Number(pvalue).toFixed(2)}%`
            }
            return `${params.seriesName}<br/>
            <i style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background:${params
              .color.colorStops[0].color || '#845bea'}"></i>
            ${params.name}: ${pvalue}`
          },
        },
        grid: {
          top: '10%',
          left: '6%',
          right: '6%',
          bottom: '4%',
          containLabel: true,
          show: false,
        },
        xAxis: [
          {
            type: 'category',
            data: this.histogramData.days.map((day) => day.day.slice(5)),
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
        series: [
          {
            name: this.chartName,
            type: 'bar',
            barWidth: '94%',
            data: this.histogramData.days.map((day) => day.data),
            itemStyle: {
              normal: {
                barBorderRadius: 4,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#845bea' },
                  { offset: 1, color: '#6335d6' },
                ]),
              },
              emphasis: {
                barBorderRadius: 4,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#caaaff' },
                  { offset: 1, color: '#a784ff' },
                ]),
              },
            },
          },
        ],
      }
    },
  },
}
</script>
