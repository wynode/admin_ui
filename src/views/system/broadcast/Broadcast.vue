<template>
  <div>
    <el-card class="Mb24">
      <EffectForm
        ref="effectForm"
        inline
        label-position="top"
        size="small"
        @submit="handleFilter"
        @cancel="handleFilterReset"
      >
        <EffectFormField
          v-for="field in filtersFields"
          :key="field.name"
          v-bind="field"
        />
      </EffectForm>
    </el-card>

    <el-card>
      <div class="Mb24">
        <el-button size="small" type="primary" @click="newBroadcast">
          新增广播
        </el-button>
      </div>

      <Txcel
        v-loading="mixTableLoading"
        element-loading-text="数据加载中"
        class="Txcel"
        :data="tableList"
        :columns="geniusCols"
        :pager="{
          layout: 'total,prev,pager,next,jumper',
          page: pager.page,
          page_size: pager.page_size,
          total: tableTotal,
        }"
        @change="handleTableChange"
      />
    </el-card>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import {
  fetchBroadcastSetting,
  postBroadcastSetting,
  patchBroadcastSetting,
  deleteBroadcastSetting,
} from '@/apis/system'
import tableMixins from '@/mixins/table'
import { allErrors, errorFormat } from '@/utils/errorFormat'
import { geniusCols } from './tableConfig'
import { filtersFields, filtersMutation } from './formConfig'
import BroadcastForm from './BroadcastForm.vue'

const pagerInit = {
  page: 1,
  page_size: 10,
}
const table = tableMixins({
  pagerInit,
  filtersMutateInit: filtersMutation,
})

export default {
  name: 'Broadcast',

  mixins: [table],

  computed: {
    fetchTableListMethod() {
      return fetchBroadcastSetting
    },

    filtersFields() {
      return filtersFields(this)
    },

    geniusCols() {
      return geniusCols(this)
    },
  },

  methods: {
    async handleNewBroadcast(instance, slotRef) {
      try {
        if (slotRef.$refs.effectForm) {
          const { effectForm } = slotRef.$refs
          if (await effectForm.useValidator()) {
            await postBroadcastSetting(slotRef.$refs.effectForm.getForm())
            this.$notify.success('新增成功')
            this.pager = { ...pagerInit }
            this.fetchTableList()
            instance.close()
          }
        }
      } catch (error) {
        errorFormat(error.data)
      }
    },

    async handleModifyBroadcast(row, instance, slotRef) {
      try {
        if (slotRef.$refs.effectForm) {
          const { effectForm } = slotRef.$refs
          if (await effectForm.useValidator()) {
            await patchBroadcastSetting(
              row.id,
              slotRef.$refs.effectForm.getForm()
            )
            this.$notify.success('修改成功')
            this.fetchTableList(this.filtersCache)
            instance.close()
          }
        }
      } catch (error) {
        errorFormat(error.data)
      }
    },

    newBroadcast() {
      this.$createDialog(
        {
          title: '新增广播',
          onSubmit: debounce(async (instance, slotRef) => {
            this.handleNewBroadcast(instance, slotRef)
          }, 200),
        },
        () => <BroadcastForm />
      ).show()
    },

    modifyBroadcast(row) {
      const effects = (subscribe) => {
        subscribe('onFieldInit', (fields, form) => {
          Object.keys(form.fields).forEach((fieldName) => {
            form.setForm(fieldName, row[fieldName])
          })
        })
      }

      this.$createDialog(
        {
          title: '修改广播',
          onSubmit: debounce(async (instance, slotRef) => {
            this.handleModifyBroadcast(row, instance, slotRef)
          }, 200),
        },
        () => <BroadcastForm effects={effects} />
      ).show()
    },

    async delBroadcast(row) {
      const ifDel = await this.$confirm('请确认此删除操作, 是否继续?', '提示', {
        type: 'warning',
      }).catch(() => {
        this.$notify.info('操作取消')
        return false
      })

      if (ifDel) {
        try {
          await deleteBroadcastSetting(row.id)
          this.$notify.success('删除成功')
          this.fetchTableList(this.filtersCache)
        } catch (error) {
          allErrors(error.data || error)
        }
      }
    },
  },

  mounted() {
    this.fetchTableList()
  },
}
</script>

<style></style>
