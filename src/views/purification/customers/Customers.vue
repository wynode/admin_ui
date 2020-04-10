<template>
  <div>
    <el-card>
      <div class="Df Mb24">
        <el-input
          v-model="filters.search"
          class="g_search Mla"
          placeholder="客户全称、备注"
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
        <el-button size="small" type="primary" @click="newCustomers">
          新增客户
        </el-button>
      </div>

      <Txcel
        v-loading="mixTableLoading"
        element-loading-text="数据加载中"
        class="Txcel"
        :data="tableList"
        :columns="clientListCols"
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
import { fetchManagers } from '@/apis/manager'
import {
  fetchCustomers,
  postCustomers,
  patchCustomers,
  postCustomersPassword,
} from '@/apis/purification'
import { errorFormat } from '@/utils/errorFormat'
import { clientListCols } from './tableConfig'
import { filterFields, filterFieldsMutation } from './formConfig'
import NewCustomerForm from './NewCustomerForm.vue'
import ModifyCustomerPassword from './ModifyCustomerPassword.vue'

const pagerInit = {
  page: 1,
  page_size: 10,
}

const DELAY_TIME = 500

const table = tableMixins({
  pagerInit,
  filtersInit: { search: '' },
  filtersMutateInit: filterFieldsMutation,
})

export default {
  name: 'Customers',

  mixins: [table],

  data() {
    return {
      purifyTypeOpts: [],
      departmentOpts: [],
      managerOpts: [],
    }
  },

  computed: {
    fetchTableListMethod() {
      return fetchCustomers
    },

    clientListCols() {
      return clientListCols(this)
    },

    filterFields() {
      return filterFields(this)
    },
  },

  methods: {
    // 新增客户
    async handleCustomersAdd(dialog, effectForm) {
      const { form, useValidator } = effectForm
      try {
        if (await useValidator()) {
          await postCustomers(form)
          this.$notify.success('新建成功')
          this.pager = { ...pagerInit }
          this.fetchTableList()
          dialog.close()
        }
      } catch (error) {
        const errors = errorFormat(error.data || error)
        effectForm.setFieldError(errors)
      }
    },

    // 编辑客户
    async handleCustomersUpdate(dialog, effectForm, row) {
      const { form, useValidator } = effectForm
      try {
        if (await useValidator()) {
          await patchCustomers(row.id, form)
          this.$notify.success('修改成功')
          this.fetchTableList()
          dialog.close()
        }
      } catch (error) {
        const errors = errorFormat(error.data || error)
        effectForm.setFieldError(errors)
      }
    },

    // 修改客户密码
    async handleCustomersPassword(dialog, effectForm, row) {
      const { form, useValidator } = effectForm
      try {
        if (await useValidator()) {
          await postCustomersPassword({ ...form, id: row.id })
          this.$notify.success('修改成功')
          this.fetchTableList()
          dialog.close()
        }
      } catch (error) {
        const errors = errorFormat(error.data || error)
        effectForm.setFieldError(errors)
      }
    },

    newCustomers() {
      this.$createDialog(
        {
          title: '新增客户',
          onSubmit: debounce((dialog, formRef) => {
            this.handleCustomersAdd(dialog, formRef.$refs.effectForm)
          }, DELAY_TIME),
        },
        () => <NewCustomerForm />
      ).show()
    },

    modifyCustomers(row) {
      this.$createDialog(
        {
          title: '编辑客户',
          onSubmit: debounce((dialog, formRef) => {
            this.handleCustomersUpdate(dialog, formRef.$refs.effectForm, row)
          }, DELAY_TIME),
        },
        () => <NewCustomerForm meta={row} />
      ).show()
    },

    modifyCustomersPassword(row) {
      this.$createDialog(
        {
          title: '修改客户密码',
          width: '600px',
          onSubmit: debounce((dialog, formRef) => {
            this.handleCustomersPassword(dialog, formRef.$refs.effectForm, row)
          }, DELAY_TIME),
        },
        () => <ModifyCustomerPassword meta={row} />
      ).show()
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
  },
}
</script>

<style></style>
