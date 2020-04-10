<template>
  <div class="gb_wrap">
    <el-card v-if="!customer" class="Mb24">
      <div class="Df Mb24">
        <el-input
          v-model="filters.search"
          class="g_search Mla"
          placeholder="净网类型名称、一级标签"
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
      <div v-if="customer" style="color: red; margin-bottom: 10px">
        净网类型修改可能会影响到其他正在运营的业务，请谨慎操作
      </div>
      <el-button
        v-else
        size="small"
        type="primary"
        class="Mb20 Mr20"
        @click="newPureConfig"
      >
        新增净网类型
      </el-button>

      <Txcel
        ref="table"
        v-loading="mixTableLoading"
        class="Txcel"
        :data="tableList"
        :columns="questionCols"
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
import table from '@/mixins/table'
import { errorFormat } from '@/utils/errorFormat'
import {
  fetchPurifyConfig,
  postPurifyConfig,
  patchPurifyConfig,
} from '@/apis/purification'
import { fetchOptions } from '@/apis/options'
import { pureCols } from './tableConfig'
import { filterFields, filtersMutateInit } from './formConfig'
import PureConfigForm from './PureConfigForm.vue'

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
  name: 'PureConfig',

  mixins: [tableMixins],

  props: {
    customer: {
      type: Number,
    },
  },

  data() {
    return {
      categoryOpts: [],
      pureConfigVis: false,
      formError: {},
    }
  },

  computed: {
    fetchTableListMethod() {
      if (this.customer) {
        return this.fetchCustomerPurifyConfig
      }
      return fetchPurifyConfig
    },

    questionCols() {
      return pureCols(this)
    },

    filterFields() {
      return filterFields(this)
    },
  },

  methods: {
    async handlePurifyConfigAdded(dialog, effectForm) {
      const { form, useValidator } = effectForm
      try {
        if (await useValidator()) {
          const payload = { ...form }
          payload.web_expire_seconds *= 60
          payload.order_expire_seconds *= 60
          if (payload.platform === 'only_web') {
            // app审核默认为3分钟
            payload.app_expire_seconds = 3 * 60
          } else {
            payload.app_expire_seconds *= 60
          }
          await postPurifyConfig(payload)
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

    async handlePurifyConfigUpdated(dialog, effectForm, row) {
      const { form, useValidator } = effectForm
      try {
        if (await useValidator()) {
          const payload = { ...form }
          payload.web_expire_seconds *= 60
          payload.order_expire_seconds *= 60
          if (payload.platform === 'only_web') {
            // app审核默认为3分钟
            payload.app_expire_seconds = 3 * 60
          } else {
            payload.app_expire_seconds *= 60
          }
          await patchPurifyConfig(row.id, payload)
          this.$notify.success('修改成功')
          this.pager = { ...pagerInit }
          this.fetchTableList()
          dialog.close()
        }
      } catch (error) {
        const errors = errorFormat(error.data || error)
        effectForm.setFieldError(errors)
      }
    },

    newPureConfig() {
      this.$createDialog(
        {
          title: '新增净网类型',
          onSubmit: debounce((dialog, formRef) => {
            this.handlePurifyConfigAdded(dialog, formRef.$refs.effectForm)
          }, 500),
        },
        () => <PureConfigForm />
      ).show()
    },

    modifyPureConfig(row) {
      this.$createDialog(
        {
          title: '编辑净网类型',
          onSubmit: debounce((dialog, formRef) => {
            this.handlePurifyConfigUpdated(
              dialog,
              formRef.$refs.effectForm,
              row
            )
          }, 500),
        },
        () => <PureConfigForm meta={row} />
      ).show()
    },

    // 通过客户获取分类
    fetchCustomerPurifyConfig(params) {
      params.purifyconfig__customer_id__in = this.customer
      return fetchPurifyConfig(params)
    },
  },

  mounted() {
    this.fetchTableList()
    fetchOptions('purify_category').then((data) => {
      this.categoryOpts = data || []
    })
  },
}
</script>
