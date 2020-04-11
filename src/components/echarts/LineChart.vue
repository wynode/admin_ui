<template>
  <div :id="chartId" style="width: 100%; height:300px;"></div>
</template>

<script>
require('echarts/lib/chart/line')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/grid')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
import echarts from 'echarts'
import { dateFormat } from '@/utils/dateFormat'
import { getMapOptions } from '@/utils/mappings'

const colorBoard = {
  qps: '#011E3C',
  incomeTransfer: '#28ACB8',
  requestTimes: '#5142B3',
  status10x: '#5142B3',
  status20x: '#929CB5',
  status30x: '#70a6ff',
  status40x: '#b3b2e1',
  status50x: '#8a7bd4',
  attackTimes: '#01AAED',
}

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
    chartData: {
      type: Array,
      default: () => [],
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
          if (newVal.length) {
            this.myChart.setOption(this.option)
          }
        })
      },
    },
  },

  computed: {
    liveTimeOptions() {
      return getMapOptions('liveTime')
    },

    commonData() {
      let legendData = []
      let seriesData = []
      let xAxisData = []
      if (!this.chartData.length) {
        return {
          legendData,
          seriesData,
          xAxisData,
        }
      }
      xAxisData = this.chartData.map((val) => {
        return dateFormat(val.time * 1000).slice(11, 16)
      })

      this.liveTimeOptions.forEach((item) => {
        legendData.push(item.label)
        seriesData.push({
          name: item.label,
          type: 'line',
          smooth: true,
          itemStyle: {
            color: colorBoard[item.value] || '#fff',
          },
          lineStyle: {
            width: 2,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: colorBoard[item.value] || '#fff',
              },
              {
                offset: 0.5,
                color: colorBoard[item.value] || '#fff',
              },
              {
                offset: 1.0,
                color: '#fff',
              },
            ]),
          },
          data: this.chartData.map((val) => val[item.value]),
        })
      })
      return {
        legendData,
        seriesData,
        xAxisData,
      }
    },

    option() {
      return {
        // title: [
        // {
        //   text: this.titleName,
        //   top: 10,
        //   textStyle: {
        //     fontSize: 14,
        //   },
        // },
        // ],
        tooltip: {
          trigger: 'axis',
        },
        grid: {
          left: '3%',
          right: '3%',
          bottom: '1%',
          top: '5%',
          containLabel: true,
        },
        // legend: {
        //   show: this.chartData.length > 1,
        //   data: this.commonData.legendData,
        //   top: 20,
        //   left: 'center',
        //   icon: 'rect',
        //   itemGap: 80,
        //   itemHeight: 4,
        //   itemWidth: 40,
        // },
        xAxis: {
          type: 'category',
          splitLine: {
            show: true,
            lineStyle: {
              color: '#ccc',
              opacity: 0.5,
            },
          },
          boundaryGap: false,
          data: this.commonData.xAxisData,
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              color: '#ccc',
              opacity: 0.5,
            },
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['#f6f6f6', '#fff'],
            },
          },
        },

        series: this.commonData.seriesData,
      }
    },
  },
}
</script>
