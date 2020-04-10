<template>
  <div>
    <el-card class="Mb24">
      <div class="Df Mb24">
        <el-input
          v-model="filters.search"
          class="g_search Mla"
          placeholder="客户名称、主账户、电话"
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

    <el-card>
      <el-button
        size="small"
        type="primary"
        class="Mb20"
        @click="handleCreateCustomer"
      >
        新增客户
      </el-button>

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
    </el-card>
  </div>
</template>

<script>
import table from '@/mixins/table'
import { postCustomer, fetchCustomer, patchCustomer } from '@/apis/client'
import { rowCols } from './tableConfig'
import { filterFields, filtersMutateInit } from './formConfig'
import EditCustomer from './EditCustomer.vue'
import debounce from 'lodash/debounce'
import { errorFormat } from '@/utils/errorFormat'

const pagerInit = {
  page: 1,
  page_size: 10,
}

const tableMixins = table({
  pagerInit,
  filtersInit: { search: '' },
  filtersMutateInit,
})

export default {
  name: 'CustomerList',

  mixins: [tableMixins],

  data() {
    return {
      lessonCategory: [],
      selectRelatedLessonsOptions: [],
      parentCustomers: [],
    }
  },

  computed: {
    fetchTableListMethod() {
      return fetchCustomer
    },

    filterFields() {
      return filterFields(this)
    },

    rowCols() {
      return rowCols(this)
    },
  },

  methods: {
    // 新建客户
    async postCreateCustomer(instance, slotRef) {
      try {
        if (slotRef.$refs.effectForm) {
          const { effectForm } = slotRef.$refs
          if (await effectForm.useValidator()) {
            const form = slotRef.$refs.effectForm.getForm()
            await postCustomer({ ...form })
            this.$notify.success('新建客户成功!')
            this.pager = { ...pagerInit }
            this.fetchTableList(this.filtersCache)
            this.fetchParentCustomer()
            instance.close()
          }
        }
      } catch (error) {
        errorFormat(error.data)
        this.$notify.error(error.data.msg || '新建失败!')
      }
    },
    async handleCreateCustomer() {
      this.$createDialog(
        {
          title: '新建客户',
          onSubmit: debounce(async (instance, slotRef) => {
            this.postCreateCustomer(instance, slotRef)
          }, 200),
        },
        () => <EditCustomer />
      ).show()
    },

    // 编辑客户
    async patchEditCustomer(row, instance, slotRef) {
      try {
        if (slotRef.$refs.effectForm) {
          const { effectForm } = slotRef.$refs
          if (await effectForm.useValidator()) {
            const form = slotRef.$refs.effectForm.getForm()
            await patchCustomer(row.id, { ...form })
            this.$notify.success('编辑客户成功!')
            this.pager = { ...pagerInit }
            this.fetchTableList(this.filtersCache)
            this.fetchParentCustomer()
            instance.close()
          }
        }
      } catch (error) {
        errorFormat(error.data)
      }
    },
    handleEditCustomer(row) {
      this.$createDialog(
        {
          title: '编辑客户',
          onSubmit: debounce(async (instance, slotRef) => {
            this.patchEditCustomer(row, instance, slotRef)
          }, 200),
        },
        () => <EditCustomer meta={row} />
      ).show()
    },

    // 获取上级客户列表
    fetchParentCustomer() {
      fetchCustomer({
        page_size: 10000,
      }).then((response) => {
        let parentCustomers = []
        response.results.forEach((customer) => {
          if (customer.client_type === 'client') {
            parentCustomers.push({
              label: customer.name,
              value: customer.id,
            })
          }
        })
        this.parentCustomers = parentCustomers
      })
    },
  },

  mounted() {
    this.fetchTableList()
    this.fetchParentCustomer()
  },
}
</script>

<style scoped></style>
