<template>
  <div class="home">
    <el-row :gutter="15">
      <el-col :span="10">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>实时状态</span>
          </div>
          <CurrentData />
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>实时监控</span>
            <ul class="date_data_switch_ul">
              <li
                :class="{ isChoice: currentComponent == 'LineData' }"
                @mouseover="currentComponent = 'LineData'"
              ></li>
              <li
                :class="{ isChoice: currentComponent == 'PieData' }"
                @mouseover="currentComponent = 'PieData'"
              ></li>
            </ul>
          </div>
          <component
            :is="currentComponent"
            :chartData="chartData"
            v-loading="loading"
          ></component>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { dateFormat } from '@/utils/dateFormat'
import { getDateData } from '@/apis/home'
import { getMapOptions } from '@/utils/mappings'

export default {
  data() {
    return {
      currentComponent: 'LineData',
      chartData: [],
      loading: false,
    }
  },
  components: {
    CurrentData: () => import('./CurrentData'),
    LineData: () => import('./LineData'),
    PieData: () => import('./PieData'),
  },

  computed: {
    liveTimeOptions() {
      return getMapOptions('liveTime')
    },
  },

  methods: {
    ListObjectItemAdd(arrayList, start, sliceLength = 1) {
      let obj = {}
      this.liveTimeOptions.forEach((item) => {
        const key = item.value
        for (let index = 0; index < sliceLength; index++) {
          const objItem = arrayList[start + index] || {}
          const objItemValue = objItem[key] || 0
          obj[key] = obj[key] || 0 + objItemValue
        }
        obj[key] = parseInt(obj[key] / sliceLength)
      })
      const middleArrayList = arrayList[start + Math.floor(sliceLength / 2)]
      obj.time = middleArrayList ? middleArrayList.time : arrayList[start].time
      return obj
    },
  },

  mounted() {
    const date = dateFormat(new Date(), 'yyMMdd')
    this.loading = true
    getDateData({ date }).then((data) => {
      const result = data.result || []
      const totalLength = result.length || 0
      const sliceLength = parseInt(totalLength / 25)
      const pieLength = totalLength / sliceLength
      let deputyDateData = []
      for (let index = 0; index < pieLength; index++) {
        deputyDateData[index] = this.ListObjectItemAdd(
          result,
          index * sliceLength,
          sliceLength
        )
      }
      this.loading = false
      this.chartData = deputyDateData
    })
  },
}
</script>

<style lang="scss">
.home {
  .el-card {
    height: 378px;
  }
}
.date_data_switch_ul {
  float: right;
  display: flex;
  align-items: center;
  height: 20px;
  li {
    margin-right: 10px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #e2e2e2;
    &:hover {
      cursor: pointer;
      background-color: #999;
    }
  }
  .isChoice {
    background-color: #999;
  }
}
</style>
