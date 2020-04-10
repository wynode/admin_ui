<template>
  <div :id="chartId" style="width: 100%; height:300px;"></div>
</template>

<script>
require('echarts/lib/chart/pie')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
const echarts = require('echarts/lib/echarts')

import { getArray } from '@/utils/mappings'

// const pieColorSet = {
//   exam_law_count: '#13003e',
//   exam_political_count: '#2d0094',
//   exam_porn_count: '#4c0bc2',
//   exam_terror_count: '#6736e1',
//   exam_vulgar_count: '#845bea',
//   exam_fraud_count: '#937aff',
// }

const pieColorArray = [
  '#13003e',
  '#2d0094',
  '#4c0bc2',
  '#6736e1',
  '#845bea',
  '#937aff',
]

export default {
  props: {
    chartId: {
      type: String,
      default: 'pieChart',
    },
    pieDataName: {
      type: String,
      default: 'questionCategoryStat',
    },
    pieChartData: {
      type: Object,
      default: () => {
        return {
          days: [],
          days_total: {},
        }
      },
    },
  },
  data() {
    return {
      myChart: '',
    }
  },

  watch: {
    pieChartData: {
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
          orient: 'vertical',
          right: 5,
          y: 'center',
          data: getArray(this.pieDataName).map((val) => {
            return val[1]
          }),
        },
        series: [
          {
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            label: {
              normal: {
                formatter: (params) => {
                  return params.percent.toFixed(0) + '%'
                },
                position: 'inner',
              },
            },
            data: getArray(this.pieDataName).map((val) => {
              return {
                value: this.pieChartData.days[val[0]],
                name: val[1],
              }
            }),
            itemStyle: {
              color: (params) => {
                return pieColorArray[params.dataIndex]
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

<style lang="scss" scoped></style>
