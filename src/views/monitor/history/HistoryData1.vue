<template>
  <div class="history">
    <el-card>
      <EffectForm
        ref="effectForm"
        inline
        size="small"
        label-position="top"
        cancelText="重置"
        @submit="handleFilter"
        @cancel="handleFilterReset"
      >
        <EffectFormField
          v-for="field in filterFields"
          v-bind="field"
          :key="field.name"
        />
      </EffectForm>
    </el-card>

    <el-card class="Mt15 Pb15">
      <el-tabs v-model="activeName">
        <el-tab-pane label="趋势图" name="LineData"></el-tab-pane>
        <el-tab-pane label="占比图" name="PieData"></el-tab-pane>
      </el-tabs>
      <component
        :is="activeName"
        :chartData="chartData"
        v-loading="loading"
      ></component>
    </el-card>
  </div>
</template>

<script>
import { dateFormat } from '@/utils/dateFormat'
import { getDateData } from '@/apis/home'
import { getMapOptions } from '@/utils/mappings'
import { filterFields } from './formConfig'

export default {
  name: 'HistoryData',

  components: {
    LineData: () => import('./LineData'),
    PieData: () => import('./PieData'),
  },

  data() {
    return {
      activeName: 'LineData',
      chartData: [],
      loading: false,
    }
  },

  computed: {
    filterFields() {
      return filterFields(this)
    },

    liveTimeOptions() {
      return getMapOptions('liveTime')
    },
  },

  methods: {
    handleFilter(form) {
      this.getDateDataFn(form.date)
    },

    handleFilterReset() {
      const date = dateFormat(new Date(), 'yyMMdd')
      this.getDateDataFn(date)
    },

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

    getDateDataFn(date) {
      this.loading = true
      getDateData({ date }).then((data) => {
        let result = data.result || []
        if (result.length == 0) {
          for (let i = 0; i < 1000; i++) {
            result[i] = {}
          }
        }
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
  },

  mounted() {
    const date = dateFormat(new Date(), 'yyMMdd')
    this.getDateDataFn(date)
  },
}
</script>

<style lang="scss">
.history {
  .date_data_switch_ul {
    float: left;
  }
}
</style>
