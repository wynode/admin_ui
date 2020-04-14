<template>
  <div class="current_data">
    <el-row :gutter="20">
      <el-col :span="8" v-for="item in liveTimeOptions" :key="item.value">
        <div class="current_col">
          <p>{{ item.label }}</p>
          <span>{{ formatValue(item.value, currentData[item.value]) }}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { getCurrentData } from '@/apis/home'
// import { toPercent } from '@/utils/common'
import { getMapOptions } from '@/utils/mappings'
import { byteToMGb } from '@/utils/common'

export default {
  props: {
    currentData: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    liveTimeOptions() {
      return getMapOptions('liveStatus')
    },
  },

  methods: {
    formatValue(label, value) {
      const flow = [
        'incomeTransfer',
        'incomeAverageTransfer',
        'outcomeTransfer',
        'outcomeAverageTransfer',
      ]
      if (flow.includes(label)) {
        return byteToMGb(value)
      }
      return value
    },
  },

  // methods: {
  //   getCurrentDataFn() {
  //     getCurrentData().then((data) => {
  //       this.currentData = data.result
  //       // const tempArray = [
  //       //   'status10x',
  //       //   'status20x',
  //       //   'status30x',
  //       //   'status40x',
  //       //   'status50x',
  //       // ]
  //       // const total = tempArray.reduce((acc, cur) => {
  //       //   return acc + this.currentData[cur]
  //       // }, 0)

  //       // tempArray.forEach((item) => {
  //       //   const data = this.currentData[item]
  //       //   this.currentData[item] =
  //       //     total == 0 ? `${data}%` : toPercent(data / total, 0)
  //       // })
  //     })
  //   },
  // },

  // mounted() {
  //   const that = this
  //   setInterval(function() {
  //     that.getCurrentDataFn()
  //   }, 3000)
  // },
}
</script>

<style lang="scss">
.current_col {
  height: 84px;
  background-color: #f8f8f8;
  color: #999;
  margin: 10px 0;
  font-size: 12px;
  padding: 12px 15px 8px;
  box-sizing: border-box;
  display: flex;
  word-break: keep-all;
  overflow: hidden;
  flex-direction: column;
  justify-content: space-between;
  span {
    font-size: 30px;
    font-weight: 400;
    color: #009688;
  }
}
</style>
