<template>
  <Txcel
    ref="table"
    v-loading="mixTableLoading"
    class="Txcel"
    :data="tableList"
    :columns="rowCols"
    :pager="{
      page: pager.page,
      page_size: pager.page_size,
      layout: 'total,prev,pager,next,jumper',
      total: tableTotal,
    }"
    @change="handleTableChange"
  />
</template>

<script>
import table from '@/mixins/table'
import { rowCols } from './tableConfig'
import { fetchLessonRemark } from '@/apis/training'

const pagerInit = {
  page: 1,
  page_size: 10,
}

const tableMixins = table({
  pagerInit,
})
export default {
  name: 'LessonRemark',

  mixins: [tableMixins],

  computed: {
    fetchTableListMethod() {
      return fetchLessonRemark
    },

    rowCols() {
      return rowCols(this)
    },
  },

  mounted() {
    const { id } = this.$route.params
    this.fetchTableList({
      lesson_id__in: id,
    })
  },
}
</script>
