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
      <Txcel
        v-loading="mixTableLoading"
        element-loading-text="数据加载中"
        class="Txcel"
        :data="tableList"
        :columns="feedbackCols"
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
import { fetchFeedback, patchFeedback } from '@/apis/feedback'
import tableMixins from '@/mixins/table'
import { errorFormat } from '@/utils/errorFormat'
import { feedbackCols } from './tableConfig'
import { filtersFields, filtersMutation } from './formConfig'
import FeedbackForm from './FeedbackForm.vue'

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
      return fetchFeedback
    },

    filtersFields() {
      return filtersFields(this)
    },

    feedbackCols() {
      return feedbackCols(this)
    },
  },

  methods: {
    async handleModifyFeedback(row, instance, slotRef) {
      try {
        if (slotRef.$refs.effectForm) {
          const { effectForm } = slotRef.$refs
          if (await effectForm.useValidator()) {
            await patchFeedback(row.id, slotRef.$refs.effectForm.getForm())
            this.$notify.success('修改成功')
            this.fetchTableList(this.filtersCache)
            instance.close()
          }
        }
      } catch (error) {
        errorFormat(error.data)
      }
    },

    modifyFeedback(row) {
      const effects = (subscribe) => {
        subscribe('onFieldInit', (fields, form) => {
          Object.keys(form.fields).forEach((fieldName) => {
            form.setForm(fieldName, row[fieldName])
          })
        })
      }

      this.$createDialog(
        {
          width: '800px',
          title: '修改状态',
          onSubmit: debounce(async (instance, slotRef) => {
            this.handleModifyFeedback(row, instance, slotRef)
          }, 200),
        },
        () => <FeedbackForm effects={effects} />
      ).show()
    },
  },

  mounted() {
    this.fetchTableList()
  },
}
</script>

<style></style>
