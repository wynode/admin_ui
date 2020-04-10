<template>
  <div :id="chartId" style="width: 100%; height:300px;"></div>
</template>

<script>
require('echarts/lib/chart/radar')
require('echarts/lib/component/tooltip')
const echarts = require('echarts/lib/echarts')

import { getArray } from '@/utils/mappings'

export default {
  props: {
    chartId: {
      type: String,
      default: 'radar',
    },
    radarData: {
      type: Object,
      default: () => {},
    },
    chartName: {
      type: String,
      default: '能力矩阵',
    },
  },

  data() {
    return {
      myChart: '',
    }
  },

  watch: {
    radarData: {
      deep: true,
      handler() {
        this.myChart = echarts.init(document.getElementById(this.chartId))
        this.myChart.setOption(this.option)
      },
    },
  },
  computed: {
    option() {
      return {
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            const head = `${params.name} <br>`
            const bodyArray = getArray('radarType').map((radar, index) => {
              return `${radar[1]} : ${params.value[index]}<br>`
            })
            const body = bodyArray.join('')
            return head + body
          },
        },
        radar: {
          indicator: getArray('radarType').map((radar) => {
            return {
              text: `${radar[1]} ${Number(this.radarData[radar[0]]).toFixed()}`,
              max: 100,
            }
          }),
          center: ['50%', '50%'],
          radius: 90,
        },
        series: [
          {
            type: 'radar',
            tooltip: {
              trigger: 'item',
            },
            itemStyle: {
              normal: {
                color: '#845bea',
                areaStyle: {
                  type: 'default',
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: '#845bea', // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#6335d6', // 100% 处的颜色
                      },
                    ],
                    global: false, // 缺省为 false
                  },
                },
                lineStyle: {
                  color: '#845bea',
                },
              },
            },
            data: [
              {
                value: getArray('radarType').map((radar) => {
                  return this.radarData
                    ? Number(this.radarData[radar[0]]).toFixed()
                    : 0
                }),
                name: this.chartName,
              },
            ],
          },
        ],
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
