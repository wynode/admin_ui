<template>
  <div>
    <el-card>
      <div class="Df Mb24">
        <el-input
          v-model="filters.search"
          class="g_search Mla"
          placeholder="关卡名称"
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
        :columns="userExamCols"
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
import { fetchUserListSimple } from '@/apis/users'
import { fetchUserExam, fetchUserExamExport } from '@/apis/checkpoint'
import { fetchOptsPosition, fetchOptsDepartment } from '@/apis/options'
import { allErrors } from '@/utils/errorFormat'
import { userExamCols } from './tableConfig'
import { filterFields, filterFieldsMutation } from './formConfig'

const table = tableMixins({
  pagerInit: { page: 1, page_size: 10 },
  filtersInit: { search: '' },
  filtersMutateInit: filterFieldsMutation,
})

export default {
  name: 'UserExam',

  mixins: [table],

  data() {
    return {
      departmentOpts: [],
      positionOpts: [],
      usersOpts: [],
    }
  },

  computed: {
    fetchTableListMethod() {
      return fetchUserExam
    },

    userExamCols() {
      return userExamCols(this)
    },

    filterFields() {
      return filterFields(this)
    },
  },

  methods: {
    handleExport: debounce(async function handleExport() {
      try {
        await fetchUserExamExport(filterFieldsMutation.parse(this.filtersCache))
        this.$notify.success('导出成功，请稍后在邮件中查看')
      } catch (error) {
        allErrors(error.data || error)
      }
    }, 200),
  },

  mounted() {
    this.fetchTableList()
    fetchOptsPosition().then((data) => {
      this.positionOpts = data || []
    })
    fetchOptsDepartment().then((data) => {
      this.departmentOpts = data || []
    })
    fetchUserListSimple({ page_size: 999999 }).then((data) => {
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
