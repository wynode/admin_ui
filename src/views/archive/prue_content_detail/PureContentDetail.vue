<template>
  <div>
    <el-card>
      <div class="Df Mb24">
        <el-input
          v-model="filters.search"
          class="g_search Mla"
          placeholder="净网内容、内容 ID"
          @keyup.enter.native="handleSearch(true)"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="handleSearch(true)"
          ></el-button>
        </el-input>
      </div>

      <EffectForm
        ref="effectForm"
        inline
        size="small"
        label-position="top"
        cancelText="重置"
        :effects="handleFormEffects"
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
import tableMixins from '@/mixins/table'
import { fetchUserList } from '@/apis/users'
import debounce from 'lodash/debounce'
import { fetchPurifyConfigSimpale } from '@/apis/purification'
import {
  fetchPureContentDetail,
  fetchPureContentDetailExport,
} from '@/apis/archive'
import { fetchArchiveContentDetailCommonStat } from '@/apis/regularfilter'
import { fetchOptions } from '@/apis/options'
import { allErrors } from '@/utils/errorFormat'
import { playDetailCols } from './tableConfig'
import { filterFields, filterFieldsMutation } from './formConfig'
import { dateFormat } from '@/utils/dateFormat'

const pagerInit = { page: 1, page_size: 10 }
let today = new Date()
today.setMonth(today.getMonth() - 2)
today.setDate(1)

let filter1 = {
  search: '',
  create_month: dateFormat(today, 'yyyy-MM-dd'),
}
const table = tableMixins({
  pagerInit,
  filtersInit: filter1,
  filtersMutateInit: filterFieldsMutation,
})
const DELAY_TIME = 500

export default {
  name: 'PureContentDetail',

  mixins: [table],

  data() {
    return {
      purifyTypeOpts: [],
      usersOpts: [],
      thirdTagsOpts: [],
      secondTagsFilterOpts: [],
      contentTypeChoices: [],

      secondTagsOpts: [],
      purifyId: '',
      error_first_result: '',
      error_second_result: '',
    }
  },
  methods: {
    handleFormEffects(subscribe) {
      subscribe('onFieldInit', (fields) => {
        if (fields.create_month) {
          fields.create_month.fieldValue = this.filters.create_month
        }
      })
    },
    handleExport: debounce(async function handleExport() {
      try {
        await fetchPureContentDetailExport(
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
      return fetchPureContentDetail
    },

    playDetailCols() {
      return playDetailCols(this)
    },

    filterFields() {
      return filterFields(this)
    },

    regularConfig() {
      return {
        appName: 'auditorderadminview',
        mutate: filterFieldsMutation,
        appStstc: fetchArchiveContentDetailCommonStat,
      }
    },
  },

  mounted() {
    this.fetchTableList()
    fetchPurifyConfigSimpale({ page_size: 99999 }).then((data) => {
      filter1.create_month = '' // hack change filterinit
      const options = data.results || []
      this.purifyTypeOpts = options.map((opt) => ({
        label: opt.name,
        value: opt.id,
      }))
    })
    fetchUserList({ page_size: 999999 }).then((data) => {
      const users = data.results || []
      this.usersOpts = users.map((user) => ({
        label: user.name,
        value: user.id,
      }))
    })
    fetchOptions('third_tags_filter').then((data) => {
      this.thirdTagsOpts = data[0].options
    })
    fetchOptions('second_tags_filter').then((data) => {
      this.secondTagsFilterOpts = data[0].options
    })
    fetchOptions('content_type').then((data) => {
      this.contentTypeChoices = data || []
    })
  },
}
</script>
