<template>
  <div>
    <el-card>
      <div class="Df Mb24">
        <el-input
          v-model="filters.search"
          class="g_search Mla"
          placeholder="关卡名称、关卡说明"
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
        ref="checkpointviews"
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
        @cancel="handleFilterResetFn"
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
        <router-link :to="{ name: 'checkPointNew' }" target="_blank">
          <el-button size="small" type="primary" icon="el-icon-plus">
            新增关卡
          </el-button>
        </router-link>

        <router-link
          :to="{ name: 'checkPointSort' }"
          target="_blank"
          class="Ml8"
        >
          <el-button size="small" type="primary" icon="el-icon-sort">
            关卡排序
          </el-button>
        </router-link>
      </div>

      <Txcel
        v-loading="mixTableLoading"
        element-loading-text="数据加载中"
        class="Txcel"
        :data="tableList"
        :columns="checkPointCols"
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
import { fetchManagers } from '@/apis/manager'
import { fetchCheckPoint, postCheckPointStatus } from '@/apis/checkpoint'
import { allErrors } from '@/utils/errorFormat'
import { checkPointCols } from './tableConfig'
import RegularFilter from '@/components/regular_filter'
import { fetchOptsHelpCenter } from '@/apis/options'
import { filterFields, filterFieldsMutation } from './formConfig'
import { fetchCheckPointCommonStat } from '@/apis/regularfilter'

const pagerInit = {
  page: 1,
  page_size: 10,
}

const table = tableMixins({
  pagerInit: pagerInit,
  filtersInit: { search: '' },
  filtersMutateInit: filterFieldsMutation,
})

export default {
  name: 'CheckPoint',

  components: {
    RegularFilter,
  },

  mixins: [table],

  data() {
    return {
      managerOpts: [],
      helpCenterOpts: [],
      regularConfig: {
        appName: 'checkpointviews',
        mutate: filterFieldsMutation,
        appStstc: fetchCheckPointCommonStat,
      },
    }
  },

  computed: {
    fetchTableListMethod() {
      return fetchCheckPoint
    },

    checkPointCols() {
      return checkPointCols(this)
    },

    filterFields() {
      return filterFields(this)
    },
  },

  methods: {
    handleFilterFn(form) {
      this.$refs.checkpointviews.currentFilter.id = 'noset'
      this.handleFilter(form)
    },

    handleFilterResetFn() {
      this.$refs.checkpointviews.currentFilter.id = 'noset'
      this.handleFilterReset()
    },

    async deleteCheckPoint(row) {
      try {
        const shouldDel = await this.$confirm(
          '请确认此删除操作, 是否继续?',
          '提示',
          { type: 'warning' }
        ).catch(() => false)
        if (shouldDel) {
          await postCheckPointStatus({ ids: [row.id], status: 'deleted' })
          this.fetchTableList(this.filtersCache)
          this.$notify.success('删除成功')
        }
      } catch (error) {
        allErrors(error.data || error)
      }
    },
  },

  mounted() {
    this.fetchTableList()
    fetchManagers({ page_size: 99999 }).then((data) => {
      const managers = data.results || []
      this.managerOpts = managers.map((m) => ({
        label: m.staff_name,
        value: m.staff_id,
      }))
    })
    fetchOptsHelpCenter().then((res) => {
      this.helpCenterOpts = res.results
    })
  },
}
</script>

<style></style>
