<template>
  <div>
    <el-card>
      <div class="Df Mb24">
        <el-input
          v-model="filters.search"
          class="g_search Mla"
          placeholder="姓名"
          @keyup.enter.native="handleSearch"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="handleSearch"
          ></el-button>
        </el-input>
      </div>

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

    <el-card class="Mt24">
      <Txcel
        v-loading="mixTableLoading"
        element-loading-text="数据加载中"
        class="Txcel"
        :data="tableList"
        :columns="playDetailCols"
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
import {
  fetchPlaygroundRankingList,
  fetchRankingOptsDepartment,
  fetchRankingOptsPosition,
} from '@/apis/playground'
import { playDetailCols } from './tableConfig'
import { filterFields, filterFieldsMutation } from './formConfig'

const table = tableMixins({
  pagerInit: { page: 1, page_size: 10 },
  filtersInit: { search: '' },
  filtersMutateInit: filterFieldsMutation,
})

export default {
  name: 'Detail',

  mixins: [table],

  data() {
    return {
      purifyTypeOpts: [],
      departmentOpts: [],
      usersOpts: [],
      positionOpts: [],
    }
  },

  computed: {
    fetchTableListMethod() {
      return fetchPlaygroundRankingList
    },

    playDetailCols() {
      return playDetailCols(this)
    },

    filterFields() {
      return filterFields(this)
    },
  },

  mounted() {
    this.fetchTableList()
    // 筛选下岗位名称
    fetchRankingOptsPosition().then((data) => {
      this.positionOpts = data || []
    })
    // 筛选下所在部门
    fetchRankingOptsDepartment().then((data) => {
      this.departmentOpts = data || []
    })
  },
}
</script>

<style></style>
