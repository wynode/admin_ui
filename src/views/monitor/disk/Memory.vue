<template>
  <div class="memory">
    <el-card>
      <Txcel
        element-loading-text="数据加载中"
        class="Txcel Mt8 Mb8 memory_table"
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
import { fetchMemory } from '@/apis/all'
import { translate } from '@/utils/mappings'

export default {
  name: 'memory',

  data() {
    return {
      tableList: [],
    }
  },

  mounted() {
    fetchMemory().then((data) => {
      this.tableList = Object.keys(data.result).map((item) => {
        return {
          label: translate(item, 'memory'),
          value: data.result[item],
        }
      })
    })
  },
}
</script>
<style lang="scss">
.memory {
  .memory_table {
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
