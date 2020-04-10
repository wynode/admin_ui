<template>
  <div>
    <div class="Mb16">
      <el-button size="small" type="primary" @click="newPurifyConfig">
        新增净网配置
      </el-button>
    </div>

    <Txcel
      v-loading="mixTableLoading"
      element-loading-text="数据加载中"
      class="Txcel"
      :data="tableList"
      :columns="purifyConfigCols"
      :pager="{
        page: pager.page,
        page_size: pager.page_size,
        layout: 'total,prev,pager,next,jumper',
        total: tableTotal,
      }"
      @change="handleTableChange"
    />
  </div>
</template>

<script>
import {
  fetchCustomerPurifyConfig,
  postCustomerPurifyConfig,
  patchCustomerPurifyConfig,
  fetchPurifyConfigSimpale,
} from '@/apis/purification.js'
import debounce from 'lodash/debounce'
import tableMixins from '@/mixins/table'
import { purifyConfigCols } from './tableConfig'
import { errorFormat } from '@/utils/errorFormat'
import PurifyConfigForm from './PurifyConfigForm.vue'

const pagerInit = {
  page: 1,
  page_size: 10,
}

const filterInit = {
  customer_id: '',
}

const table = tableMixins({
  pagerInit,
  filterInit,
})
const DELAY_TIME = 500

export default {
  data() {
    return {
      purifyConfigOptions: [],
    }
  },

  mixins: [table],
  computed: {
    fetchTableListMethod() {
      return fetchCustomerPurifyConfig
    },

    purifyConfigCols() {
      return purifyConfigCols(this)
    },
  },
  methods: {
    // 新增净网配置
    async handleNewPurifyConfig(dialog, effectForm) {
      const { form, useValidator } = effectForm
      try {
        if (await useValidator()) {
          const { id } = this.$route.params
          await postCustomerPurifyConfig({ ...form, customer: id })
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

    // 编辑净网配置
    async handleEditPurifyConfig(dialog, effectForm, row) {
      const { form, useValidator } = effectForm
      try {
        if (await useValidator()) {
          await patchCustomerPurifyConfig(row.id, form)
          this.$notify.success('修改成功')
          // const { id } = this.$route.params
          this.fetchTableList()
          dialog.close()
        }
      } catch (error) {
        const errors = errorFormat(error.data || error)
        effectForm.setFieldError(errors)
      }
    },

    newPurifyConfig() {
      this.$createDialog(
        {
          title: '新增净网配置',
          onSubmit: debounce((dialog, formRef) => {
            this.handleNewPurifyConfig(dialog, formRef.$refs.effectForm)
          }, DELAY_TIME),
        },
        () => (
          <PurifyConfigForm purifyConfigOptions={this.purifyConfigOptions} />
        )
      ).show()
    },

    editPurifyConfig(row) {
      this.$createDialog(
        {
          title: '编辑净网配置',
          onSubmit: debounce((dialog, formRef) => {
            this.handleEditPurifyConfig(dialog, formRef.$refs.effectForm, row)
          }, DELAY_TIME),
        },
        () => (
          <PurifyConfigForm
            meta={row}
            purifyConfigOptions={this.purifyConfigOptions}
          />
        )
      ).show()
    },
  },
  mounted() {
    const { id } = this.$route.params
    this.filters.customer_id = id
    this.fetchTableList()
    fetchPurifyConfigSimpale().then((res) => {
      this.purifyConfigOptions = res.results.map((item) => {
        return {
          label: item.name,
          value: item.id,
        }
      })
    })
  },
}
</script>
