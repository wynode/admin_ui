<template>
  <div class="radar_data">
    <el-row>
      <el-col :span="11">
        <div class="radar_box">
          <h3>综合能力</h3>
          <RadarMap
            chartId="all"
            chartName="综合能力"
            ref="all"
            :radarData="radarData.all"
          />
        </div>
      </el-col>
      <el-col :span="11" :offset="2">
        <div class="radar_box">
          <h3>法规能力</h3>
          <RadarMap
            chartId="law"
            chartName="法规能力"
            ref="law"
            :radarData="radarData.law"
          />
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <div class="radar_box">
          <h3>鉴政能力</h3>
          <RadarMap
            chartId="political"
            chartName="鉴政能力"
            ref="political"
            :radarData="radarData.political"
          />
        </div>
      </el-col>
      <el-col :span="11" :offset="2">
        <div class="radar_box">
          <h3>鉴黄能力</h3>
          <RadarMap
            chartId="porn"
            chartName="鉴黄能力"
            ref="porn"
            :radarData="radarData.porn"
          />
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <div class="radar_box">
          <h3>鉴恐能力</h3>
          <RadarMap
            chartId="terror"
            chartName="鉴恐能力"
            ref="terror"
            :radarData="radarData.terror"
          />
        </div>
      </el-col>
      <el-col :span="11" :offset="2">
        <div class="radar_box">
          <h3>鉴俗能力</h3>
          <RadarMap
            chartId="vulgar"
            chartName="鉴俗能力"
            ref="vulgar"
            :radarData="radarData.vulgar"
          />
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <div class="radar_box">
          <h3>鉴诈能力</h3>
          <RadarMap
            chartId="fraud"
            chartName="鉴诈能力"
            ref="fraud"
            :radarData="radarData.fraud"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fetchRadarData } from '@/apis/users.js'
import RadarMap from '@/components/echarts/RadarMap.vue'

export default {
  components: {
    RadarMap,
  },
  data() {
    return {
      radarData: {},
    }
  },
  mounted() {
    const { id } = this.$route.params
    fetchRadarData(id).then((data) => {
      this.radarData = data.user_radar || {
        vulgar: {},
        all: {},
        fraud: {},
        law: {},
        political: {},
        porn: {},
        terror: {},
      }
    })
    this.$nextTick(() => {
      window.onresize = () => {
        this.$refs.all.myChart.resize()
        this.$refs.law.myChart.resize()
        this.$refs.political.myChart.resize()
        this.$refs.porn.myChart.resize()
        this.$refs.terror.myChart.resize()
        this.$refs.vulgar.myChart.resize()
        this.$refs.fraud.myChart.resize()
      }
    })
  },
}
</script>

<style lang="scss">
.radar_data {
  .radar_box {
    margin-top: 10px;
    h3 {
      margin-left: 20px;
      font-size: 14px;
      font-weight: 600;
      position: relative;
      color: #333;
      &::before {
        content: '';
        position: absolute;
        left: -18px;
        top: 0;
        width: 0;
        height: 14px;
        border: 4px solid #ccc;
      }
    }
  }
}
</style>
