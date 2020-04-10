<template>
  <div>
    <el-card v-if="!customer" class="Mb24">
      <div class="Df Mb24">
        <el-input
          v-model="filters.search"
          class="g_search Mla"
          placeholder="业务名称、备注"
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

    <el-card
      :shadow="customer ? 'never' : 'always'"
      :style="customer ? 'border: none' : ''"
      :body-style="customer ? 'padding: 0px' : ''"
    >
      <el-button
        size="small"
        type="primary"
        class="Mb20"
        @click="handleCreateBusiness"
      >
        新增业务
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
import { fetchCustomer } from '@/apis/client'
import {
  fetchCustomerPurifyConf,
  postCustomerPurifyConf,
  patchCustomerPurifyConf,
} from '@/apis/client'
import { fetchPurifyConfig } from '@/apis/purification'
import { rowCols } from './tableConfig'
import { filterFields, filtersMutateInit } from './formConfig'
import EditBusiness from './EditBusiness.vue'
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
  name: 'BusinessList',

  mixins: [tableMixins],

  props: {
    customer: {
      type: Number,
    },
  },

  data() {
    return {
      purifyConfigs: [],
      customers: [],
    }
  },

  computed: {
    fetchTableListMethod() {
      if (this.customer) {
        return this.fetchCustomerPurifyConfByCustomer
      }
      return fetchCustomerPurifyConf
    },

    filterFields() {
      return filterFields(this)
    },

    rowCols() {
      return rowCols(this)
    },
  },

  methods: {
    // 通过客户id获取业务
    fetchCustomerPurifyConfByCustomer(params) {
      params.customer_id__in = this.customer
      return fetchCustomerPurifyConf(params)
    },

    // 新建业务
    async postCreateBusiness(instance, slotRef) {
      try {
        if (slotRef.$refs.effectForm) {
          const { effectForm } = slotRef.$refs
          if (await effectForm.useValidator()) {
            const form = slotRef.$refs.effectForm.getForm()
            await postCustomerPurifyConf({ ...form })
            this.$notify.success('新建业务成功!')
            this.pager = { ...pagerInit }
            this.fetchTableList(this.filtersCache)
            instance.close()
          }
        }
      } catch (error) {
        errorFormat(error.data)
      }
    },

    async handleCreateBusiness() {
      this.$createDialog(
        {
          title: '新建业务',
          onSubmit: debounce(async (instance, slotRef) => {
            this.postCreateBusiness(instance, slotRef)
          }, 200),
        },
        () => (
          <EditBusiness
            purifyConfigs={this.purifyConfigs}
            customer={this.customer}
            customers={this.customers}
          />
        )
      ).show()
    },

    // 编辑业务
    async patchEditBusiness(row, instance, slotRef) {
      try {
        if (slotRef.$refs.effectForm) {
          const { effectForm } = slotRef.$refs
          if (await effectForm.useValidator()) {
            const form = slotRef.$refs.effectForm.getForm()
            await patchCustomerPurifyConf(row.id, { ...form })
            this.$notify.success('编辑业务成功!')
            this.pager = { ...pagerInit }
            this.fetchTableList(this.filtersCache)
            instance.close()
          }
        }
      } catch (error) {
        errorFormat(error.data)
      }
    },

    handleEditBusiness(row) {
      this.$createDialog(
        {
          title: '编辑业务',
          onSubmit: debounce(async (instance, slotRef) => {
            this.patchEditBusiness(row, instance, slotRef)
          }, 200),
        },
        () => (
          <EditBusiness
            meta={row}
            edit={true}
            purifyConfigs={this.purifyConfigs}
            customers={this.customers}
          />
        )
      ).show()
    },

    // 获取净网配置
    fetchPurifyConfigs() {
      fetchPurifyConfig({
        page_size: 10000,
      }).then((response) => {
        this.purifyConfigs = response.results.map((config) => {
          return { label: config.name, value: config.id }
        })
      })
    },

    // 获取所属客户
    fetchCustomers() {
      fetchCustomer({
        page_size: 10000,
      }).then((response) => {
        this.customers = response.results.map((customer) => {
          return { label: customer.name, value: customer.id }
        })
      })
    },
  },

  mounted() {
    this.fetchTableList()
    this.fetchPurifyConfigs()
    this.fetchCustomers()
  },
}
</script>
