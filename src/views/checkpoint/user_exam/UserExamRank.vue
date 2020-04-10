<template>
  <el-card>
    <div class="Mb24">
      <el-button type="primary" size="small" @click="handleExport">
        导出
      </el-button>
    </div>

    <Txcel
      v-loading="mixTableLoading"
      class="Txcel"
      :data="tableList"
      :columns="userExamRankingCols"
      :pager="{
        page: pager.page,
        page_size: pager.page_size,
        layout: 'total,prev,pager,next,jumper',
        total: tableTotal,
      }"
      @change="handleTableChange"
    />
  </el-card>
</template>

<script>
import debounce from 'lodash/debounce'
import {
  fetchUserExamRanking,
  fetchUserExamRankingExport,
} from '@/apis/checkpoint'
import tableMixins from '@/mixins/table'
import { allErrors } from '@/utils/errorFormat'
import { userExamRankingCols } from './tableConfig'

const table = tableMixins({
  pagerInit: { page: 1, page_size: 20 },
})

export default {
  name: 'UserExamRank',

  mixins: [table],

  computed: {
    fetchTableListMethod() {
      return fetchUserExamRanking
    },

    userExamRankingCols() {
      return userExamRankingCols(this)
    },
  },

  methods: {
    handleExport: debounce(async function handleExport() {
      try {
        await fetchUserExamRankingExport()
        this.$notify.success('导出成功，请稍后在邮件中查看')
      } catch (error) {
        allErrors(error.data || error)
      }
    }, 200),
  },

  mounted() {
    this.fetchTableList()
  },
}
</script>

<style></style>
