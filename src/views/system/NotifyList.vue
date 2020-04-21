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
        :needToolBtnGroup="false"
        @submit="handleFilterFn"
        @cancel="handleFilterReset"
      >
        <EffectFormField
          v-for="field in notifyFields"
          v-bind="field"
          :key="field.name"
        />
      </EffectForm>
    </el-card>

    <el-card class="Mt16">
      <Txcel
        v-loading="mixTableLoading"
        element-loading-text="数据加载中"
        class="Txcel"
        :data="tableList"
        :columns="notifyListCols"
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
import { fetchNotifyList } from '@/apis/system'
import { notifyListCols } from './tableConfig'
import { notifyFields } from './formConfig'

const table = tableMixins({
  pagerInit: { page: 1, page_size: 10 },
  filtersInit: { search: '' },
})

export default {
  name: 'NotifyList',

  mixins: [table],

  data() {
    return {}
  },

  computed: {
    fetchTableListMethod() {
      return fetchNotifyList
    },

    notifyFields() {
      return notifyFields(this)
    },

    notifyListCols() {
      return notifyListCols(this)
    },
  },

  methods: {
    handleFilterFn(form) {
      let payload = {}
      if (form.notify_date) {
        payload = {
          startDate: form.notify_date[0],
          endDate: form.notify_date[1],
        }
      }
      this.handleFilter(payload)
    },

    handleFormEffects(subscribe) {
      subscribe('onFieldChange', 'notify_date', (value, form) => {
        this.handleFilterFn(form)
      })
    },
  },

  mounted() {
    this.fetchTableList()
  },
}
</script>

<style></style>
