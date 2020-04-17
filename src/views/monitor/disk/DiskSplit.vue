<template>
  <div>
    <el-card>
      <Txcel
        v-loading="mixTableLoading"
        element-loading-text="数据加载中"
        class="Txcel Mt8"
        :data="tableList"
        :columns="diskSplitCols"
        :pager="{
          page: pager.page,
          page_size: pager.page_size,
          layout: 'total,prev,pager,next,jumper',
          total: tableTotal,
        }"
        @change="handleTableChange"
      />
    </el-card>
  </div>
</template>

<script>
import tableMixins from '@/mixins/table'
import { fetchDiskSplit } from '@/apis/all'
import { diskSplitCols } from './tableConfig'

const table = tableMixins({
  pagerInit: { page: 1, page_size: 10 },
})

export default {
  name: 'DiskSplit',

  mixins: [table],

  data() {
    return {}
  },

  computed: {
    fetchTableListMethod() {
      return fetchDiskSplit
    },

    diskSplitCols() {
      return diskSplitCols(this)
    },
  },

  mounted() {
    this.fetchTableList()
  },
}
</script>

<style></style>
