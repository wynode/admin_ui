<template>
  <div>
    <el-card>
      <EffectForm
        ref="effectForm"
        inline
        size="small"
        label-position="top"
        cancelText="重置"
        :effects="handleFormEffects"
        @submit="handleFilter"
        @cancel="handleFilterReset"
        :needToolBtnGroup="false"
      >
        <EffectFormField
          v-for="field in FormFields"
          v-bind="field"
          :key="field.name"
        />
      </EffectForm>
    </el-card>
    <el-card class="Mt15">
      <el-button
        size="small"
        type="primary"
        class="Mb20 Mr20"
        @click="handleNewParams"
      >
        新增ip国家禁用
      </el-button>

      <Txcel
        v-loading="mixTableLoading"
        element-loading-text="数据加载中"
        class="Txcel"
        :data="tableList"
        :columns="paramsListCols"
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
import {
  fetchCountryIPForbidden,
  postCountryIPForbidden,
  patchCountryIPForbidden,
  delCountryIPForbidden,
} from '@/apis/all'
import { paramsListCols } from './tableConfig'
import EditCountryIp from './EditCountryIp'
import { FormFields } from './formConfig'

const table = tableMixins({
  pagerInit: { page: 1, page_size: 10 },
})

export default {
  name: 'UserList',

  mixins: [table],

  data() {
    return {}
  },

  computed: {
    fetchTableListMethod() {
      return fetchCountryIPForbidden
    },

    paramsListCols() {
      return paramsListCols(this)
    },

    FormFields() {
      return FormFields(this)
    },
  },

  methods: {
    handleFormEffects(subscribe) {
      subscribe('onFieldChange', 'isForbidden', (value, form) => {
        this.handleFilter(form)
      })
    },
    handleNewParams() {
      this.$createDialog(
        {
          title: '新增ip国家禁用',
          width: '600px',
          onSubmit: async (instance, slotRef) => {
            if (slotRef.$refs.effectForm) {
              const { effectForm } = slotRef.$refs
              if (await effectForm.useValidator()) {
                const form = slotRef.$refs.effectForm.getForm()
                await postCountryIPForbidden(form)
                this.fetchTableList(this.filtersCache)
                this.$notify.success('新增成功')
                instance.close()
              }
            }
          },
        },
        () => <EditCountryIp />
      ).show()
    },

    modifyParams(row) {
      this.$createDialog(
        {
          title: '修改ip国家禁用',
          width: '600px',
          validate: false,
          onSubmit: async (instance, slotRef) => {
            const form = slotRef.$refs.effectForm.getForm()
            await patchCountryIPForbidden({
              id: row.id,
              ...form,
            })
            this.fetchTableList(this.filtersCache)
            this.$notify.success('修改成功')
            instance.close()
          },
        },
        () => <EditCountryIp meta={row} />
      ).show()
    },

    async delParams(row) {
      const ifDel = await this.$confirm('请确认此删除操作, 是否继续?', '提示', {
        type: 'warning',
      }).catch(() => {
        this.$notify.info('操作取消')
        return false
      })

      if (ifDel) {
        await delCountryIPForbidden({ id: row.id })
        this.$notify.success('删除成功')
        this.fetchTableList(this.filtersCache)
      }
    },
  },

  mounted() {
    this.fetchTableList()
  },
}
</script>

<style></style>
