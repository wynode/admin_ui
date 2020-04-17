<template>
  <div class="disk_statis">
    <el-card>
      <Txcel
        element-loading-text="数据加载中"
        class="Txcel Mt8 Mb8 disk_statis_table"
        :data="tableList"
        :columns="[
          {
            label: '属性',
            prop: 'label',
          },
          {
            label: '值',
            prop: 'value',
          },
        ]"
      />
    </el-card>
  </div>
</template>

<script>
import { fetchIOstatis } from '@/apis/all'
import { translate } from '@/utils/mappings'

export default {
  name: 'DiskStatis',

  data() {
    return {
      tableList: [],
    }
  },

  mounted() {
    fetchIOstatis().then((data) => {
      this.tableList = Object.keys(data.result).map((item) => {
        return {
          label: translate(item, 'diskStatis'),
          value: data.result[item],
        }
      })
    })
  },
}
</script>
<style lang="scss">
.disk_statis {
  .disk_statis_table {
    max-width: 800px;
  }
  .el-table__header {
    display: none;
  }
  .el-pagination {
    display: none;
  }
}
</style>
