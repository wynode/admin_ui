<template>
  <div :id="chartId" style="width: 100%; height:600px;"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/map/js/china.js')
//数据纯属虚构
// import { data } from './helper'

export default {
  props: {
    chartId: {
      type: String,
      default: 'chinaMap',
    },
    chartData: {
      type: Array,
      default: () => [],
    },
    chartName: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      myChart: '',
      yData: [],
      barData: [],
    }
  },

  watch: {
    chartData: {
      deep: true,
      immediate: true,
      handler(newVal) {
        if (newVal.length) {
          const forLength = newVal.length === 1 ? 1 : 10
          this.barData = []
          this.yData = []
          for (var i = 0; i < forLength; i++) {
            this.barData[i] = this.chartData[i]
            this.yData[i] = i + this.chartData[i].name
          }
          this.$nextTick(() => {
            this.myChart = echarts.init(document.getElementById(this.chartId))
            this.myChart.setOption(this.option)
          })
        }
      },
    },
  },

  computed: {
    option() {
      return {
        title: [
          {
            show: true,
            text: '排名情况',
            textStyle: {
              color: '#2D3E53',
              fontSize: 18,
            },
            right: 280,
            top: 100,
          },
        ],
        tooltip: {
          show: true,
          formatter: function(params) {
            return params.name + '：' + params.data['value']
          },
        },
        visualMap: {
          type: 'continuous',
          orient: 'horizontal',
          itemWidth: 10,
          itemHeight: 80,
          text: ['高', '低'],
          showLabel: true,
          seriesIndex: [0],
          min: 0,
          max: this.chartData[0].value,
          inRange: {
            color: ['#3db3aa', '#22aba1', '#009688'],
          },
          textStyle: {
            color: '#7B93A7',
          },
          bottom: 30,
          left: 'left',
        },
        grid: {
          right: 100,
          top: 135,
          bottom: 100,
          width: '20%',
        },
        xAxis: {
          show: false,
        },
        yAxis: {
          type: 'category',
          inverse: true,
          nameGap: 16,
          axisLine: {
            show: false,
            lineStyle: {
              color: '#ddd',
            },
          },
          axisTick: {
            show: false,
            lineStyle: {
              color: '#ddd',
            },
          },
          axisLabel: {
            interval: 0,
            margin: 85,
            textStyle: {
              color: '#455A74',
              align: 'left',
              fontSize: 14,
            },
            rich: {
              a: {
                color: '#fff',
                backgroundColor: '#009688',
                width: 20,
                height: 20,
                align: 'center',
                borderRadius: 2,
              },
              b: {
                color: '#fff',
                backgroundColor: '#3db3aa',
                width: 20,
                height: 20,
                align: 'center',
                borderRadius: 2,
              },
            },
            formatter: function(params) {
              if (parseInt(params.slice(0, 1)) < 3) {
                return [
                  '{a|' +
                    (parseInt(params.slice(0, 1)) + 1) +
                    '}' +
                    '  ' +
                    params.slice(1),
                ].join('\n')
              } else {
                return [
                  '{b|' +
                    (parseInt(params.slice(0, 1)) + 1) +
                    '}' +
                    '  ' +
                    params.slice(1),
                ].join('\n')
              }
            },
          },
          data: this.yData,
        },
        geo: {
          // roam: true,
          map: 'china',
          left: 'left',
          zoom: 0.5,
          right: '340',
          layoutSize: '80%',
          label: {
            emphasis: {
              show: false,
            },
          },
          itemStyle: {
            emphasis: {
              areaColor: '#fcf6bb',
            },
          },
        },
        series: [
          {
            name: 'mapSer',
            type: 'map',
            roam: false,
            geoIndex: 0,
            label: {
              show: false,
            },
            data: this.chartData,
          },
          {
            name: 'barSer',
            type: 'bar',
            roam: false,
            visualMap: false,
            zlevel: 2,
            barMaxWidth: 8,
            barGap: 0,
            itemStyle: {
              normal: {
                color: function(params) {
                  // build a color map as your need.
                  var colorList = [
                    {
                      colorStops: [
                        {
                          offset: 0,
                          color: '#22aba1', // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: '#009688', // 100% 处的颜色
                        },
                      ],
                    },
                    {
                      colorStops: [
                        {
                          offset: 0,
                          color: '#3db3aa', // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: '#22aba1', // 100% 处的颜色
                        },
                      ],
                    },
                  ]
                  if (params.dataIndex < 3) {
                    return colorList[0]
                  } else {
                    return colorList[1]
                  }
                },
                barBorderRadius: 15,
              },
            },
            data: this.barData,
            label: {
              show: true,
              position: 'right',
              color: '#333333',
              fontSize: 14,
              offset: [10, 0],
            },
          },
        ],
      }
    },
  },
}
</script>
