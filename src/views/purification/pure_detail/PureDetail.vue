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

      <RegularFilter
        ref="usersuborderansweradminview"
        v-bind="regularConfig"
        :form-ref="$refs.effectForm"
        :search="filters.search"
        @change="handleRegulareFilter"
      />

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
import tableMixins from '@/mixins/table'
import { fetchUserList } from '@/apis/users'
import debounce from 'lodash/debounce'
import {
  fetchPureDetail,
  fetchPurifyConfigSimpale,
  fetchPureDetailExport,
} from '@/apis/purification'
import { fetchPurifyDetailCommonStat } from '@/apis/regularfilter'
import {
  fetchOptions,
  fetchOptsPosition,
  fetchOptsDepartment,
} from '@/apis/options'
import RegularFilter from '@/components/regular_filter'
import { playDetailCols } from './tableConfig'
import { filterFields, filterFieldsMutation } from './formConfig'
import { allErrors } from '@/utils/errorFormat'

const table = tableMixins({
  pagerInit: { page: 1, page_size: 10 },
  filtersInit: { search: '', order_content_id__in: '' },
  filtersMutateInit: filterFieldsMutation,
})
const DELAY_TIME = 500

export default {
  name: 'PureDetail',

  mixins: [table],

  components: {
    RegularFilter,
  },

  data() {
    return {
      purifyTypeOpts: [],
      thirdTagsOpts: [],
      secondTagsFilterOpts: [],
      departmentOpts: [],
      usersOpts: [],
      positionOpts: [],
      contentTypeChoices: [],
    }
  },

  computed: {
    fetchTableListMethod() {
      return fetchPureDetail
    },

    playDetailCols() {
      return playDetailCols(this)
    },

    filterFields() {
      return filterFields(this)
    },

    regularConfig() {
      return {
        appName: 'usersuborderansweradminview',
        mutate: filterFieldsMutation,
        appStstc: fetchPurifyDetailCommonStat,
      }
    },
  },

  methods: {
    handleExport: debounce(async function handleExport() {
      try {
        await fetchPureDetailExport(
          filterFieldsMutation.parse(this.filtersCache)
        )
        this.$notify.success('导出成功，请稍后在邮件中查看')
      } catch (error) {
        allErrors(error.data || error)
      }
    }, DELAY_TIME),
  },

  mounted() {
    if (this.$route.query.order__content_id__in) {
      this.filters.order__content_id__in = this.$route.query.order__content_id__in
    }
    fetchOptions('third_tags_filter').then((data) => {
      this.thirdTagsOpts = data[0].options
    })
    fetchOptions('second_tags_filter').then((data) => {
      this.secondTagsFilterOpts = data[0].options
    })
    fetchOptions('content_type').then((data) => {
      this.contentTypeChoices = data || []
    })
    this.fetchTableList()
    fetchOptsPosition().then((data) => {
      this.positionOpts = data || []
    })
    fetchOptsDepartment().then((data) => {
      this.departmentOpts = data || []
    })
    fetchPurifyConfigSimpale({ page_size: 99999 }).then((data) => {
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
  },
}
</script>
