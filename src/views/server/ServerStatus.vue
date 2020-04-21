<template>
  <div class="server_status">
    <el-card>
      <div slot="header">
        <span>系统当前信息</span>
      </div>
      <div class="server_list">
        <div
          v-for="(value, key, index) in generalInfo.result"
          :key="index"
          class="server_item"
        >
          <p>{{ key | translate('generalInfo') }}</p>
          <span v-if="key === 'serverTime'">{{ value | date }}</span>
          <span v-else>{{ value }}</span>
        </div>
      </div>
    </el-card>
    <el-card class="Mt15">
      <div slot="header">
        <span>cpu信息</span>
      </div>
      <div class="server_list">
        <div
          v-for="(value, key, index) in cpuInfo.result"
          :key="index"
          class="server_item"
        >
          <p>{{ key | translate('generalInfo') }}</p>
          <span v-if="key === 'serverTime'">{{ value | date }}</span>
          <span v-else>{{ value }}</span>
        </div>
      </div>
    </el-card>
    <el-card class="Mt15">
      <div slot="header">
        <span>内存信息</span>
      </div>
      <div class="server_list">
        <div
          v-for="(value, key, index) in memory.result"
          :key="index"
          class="server_item"
        >
          <p>{{ key | translate('generalInfo') }}</p>
          <span v-if="key === 'serverTime'">{{ value | date }}</span>
          <span v-else>{{ value }}</span>
        </div>
      </div>
    </el-card>
    <el-card class="Mt15">
      <div slot="header">
        <span>磁盘分区</span>
      </div>
      <Txcel
        element-loading-text="数据加载中"
        class="Txcel Mt8 Mb8"
        :data="iostatis.result"
        :columns="[
          {
            label: 'device',
            prop: 'device',
          },
          {
            label: 'inProg',
            prop: 'inProg',
          },
          {
            label: 'reads',
            prop: 'reads',
          },
          {
            label: 'time',
            prop: 'time',
          },
          {
            label: 'writes',
            prop: 'writes',
          },
        ]"
      />
    </el-card>
    <el-card class="Mt15">
      <div slot="header">
        <span>内存信息</span>
      </div>
      <Txcel
        element-loading-text="数据加载中"
        class="Txcel Mt8 Mb8"
        :data="diskSplit.result"
        :columns="[
          {
            label: '挂载路径',
            prop: 'mounted',
          },
          {
            label: '文件系统',
            prop: 'fileSystem',
          },
          {
            label: '磁盘容量',
            prop: 'size',
          },
          {
            label: '已使用',
            prop: 'used',
          },
          {
            label: '未使用',
            prop: 'avail',
          },
          {
            label: '已使用占比',
            prop: 'usedPercentage',
          },
        ]"
      />
    </el-card>
  </div>
</template>

<script>
import {
  fetchGeneralInfo,
  fetchCpuInfo,
  fetchDiskSplit,
  fetchMemory,
  fetchIOstatis,
} from '@/apis/all'
export default {
  data() {
    return {
      // key: value
      generalInfo: {},
      cpuInfo: {},
      diskSplit: [],
      memory: {},
      iostatis: [],
    }
  },
  async mounted() {
    this.generalInfo = await fetchGeneralInfo()
    this.cpuInfo = await fetchCpuInfo()
    this.diskSplit = await fetchDiskSplit()
    this.memory = await fetchMemory()
    this.iostatis = await fetchIOstatis()
  },
}
</script>

<style lang="scss">
.server_status {
  .el-pagination {
    display: none;
  }
}
.server_list {
  display: flex;
  flex-wrap: wrap;
  margin-left: -8px;
  margin-top: -6px;
  margin-bottom: 2px;
}
.server_item {
  background-color: #f8f8f8;
  color: #999;
  margin-left: 8px;
  margin-top: 8px;
  font-size: 12px;
  padding: 12px 15px 8px;
  box-sizing: border-box;
  display: flex;
  word-break: keep-all;
  overflow: hidden;
  flex-direction: column;
  justify-content: space-between;
  span {
    font-size: 14px;
    color: #009688;
    margin-top: 4px;
  }
}
</style>
