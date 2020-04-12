<template>
  <div>
    <el-card>
      <Txcel
        v-loading="mixTableLoading"
        element-loading-text="数据加载中"
        class="Txcel"
        :data="tableList"
        :columns="attackLogListCols"
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
import { fetchAttackLogList } from '@/apis/all'
import { attackLogListCols } from './tableConfig'

const table = tableMixins({
  pagerInit: { page: 1, page_size: 10 },
})

export default {
  name: 'UserList',

  mixins: [table],

  data() {
    return {}
  },

  computed: {
    fetchTableListMethod() {
      return fetchAttackLogList
    },

    attackLogListCols() {
      return attackLogListCols(this)
    },
  },

  mounted() {
    this.fetchTableList()
  },
}
</script>

<style></style>
