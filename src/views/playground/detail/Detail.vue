<template>
  <div>
    <el-card>
      <div class="Df Mb24">
        <el-input
          v-model="filters.search"
          class="g_search Mla"
          placeholder="净网内容、内容id"
          @keyup.enter.native="handleSearch"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="handleSearch"
          ></el-button>
        </el-input>
      </div>

      <regular-filter
        ref="userpracticeansweradminview"
        :form-ref="$refs.effectForm"
        v-bind="regularConfig"
        :search="filters.search"
        @change="handleRegulareFilter"
      ></regular-filter>

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
      <div class="Mb16">
        <el-button size="small" type="primary" @click="handleExport">
          导出
        </el-button>
      </div>

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
import debounce from 'lodash/debounce'
import tableMixins from '@/mixins/table'
import { fetchPurifyConfigSimpale } from '@/apis/purification'
import {
  fetchDetailCommonStat,
  fetchPlaygroundDetailList,
  fetchDetailOptsDepartment,
  fetchDetailOptsPosition,
  fetchPlaygroundDetailExport,
  fetchDetailUserList,
} from '@/apis/playground'
import { allErrors } from '@/utils/errorFormat'
import { playDetailCols } from './tableConfig'
import { filterFields, filterFieldsMutation } from './formConfig'
import RegularFilter from '@/components/regular_filter'
const DELAY_TIME = 500
const table = tableMixins({
  pagerInit: { page: 1, page_size: 10 },
  filtersInit: { search: '' },
  filtersMutateInit: filterFieldsMutation,
})

export default {
  name: 'Detail',

  mixins: [table],

  components: {
    RegularFilter,
  },

  data() {
    return {
      purifyTypeOpts: [],
      departmentOpts: [],
      usersOpts: [],
      positionOpts: [],
      regularConfig: {
        appName: 'userpracticeansweradminview',
        mutate: filterFieldsMutation,
        appStstc: fetchDetailCommonStat,
      },
    }
  },

  methods: {
    // 导出
    handleExport: debounce(async function handleExport() {
      try {
        await fetchPlaygroundDetailExport(
          filterFieldsMutation.parse(this.filtersCache)
        )
        this.$notify.success('导出成功，请稍后在邮件中查看')
      } catch (error) {
        allErrors(error.data || error)
      }
    }, DELAY_TIME),
  },

  computed: {
    fetchTableListMethod() {
      return fetchPlaygroundDetailList
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
    fetchDetailOptsPosition().then((data) => {
      this.positionOpts = data || []
    })
    fetchPurifyConfigSimpale({ page_size: 999999 }).then((data) => {
      const purify = data.results || []
      // 筛选下净网类型名称
      this.purifyTypeOpts = purify.map((item) => {
        return {
          label: item.name,
          value: item.id,
        }
      })
    })
    // 筛选下所在部门
    fetchDetailOptsDepartment().then((data) => {
      this.departmentOpts = data || []
    })
    // 筛选下练习人
    fetchDetailUserList({ page_size: 999999 }).then((data) => {
      const users = data.results || []
      this.usersOpts = users.map((user) => ({
        label: user.name,
        value: user.id,
      }))
    })
  },
}
</script>

<style></style>
