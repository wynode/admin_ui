<template>
  <div>
    <el-card>
      <EffectForm
        ref="effectForm"
        inline
        size="small"
        label-position="top"
        cancelText="重置"
        @submit="handleFilterFn"
        @cancel="handleFilterReset"
      >
        <EffectFormField
          v-for="field in attackFields"
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
        :columns="attackLogListCols"
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
import { fetchAttackLogList } from '@/apis/all'
import { attackFields } from './formConfig'
import { attackLogListCols } from './tableConfig'

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
      return fetchAttackLogList
    },

    attackFields() {
      return attackFields(this)
    },

    attackLogListCols() {
      return attackLogListCols(this)
    },
  },

  methods: {
    handleFilterFn(form) {
      let payload = (payload = {
        ip: form.ip,
      })
      const startTime = form.time_date ? form.time_date[0] : ''
      const endTime = form.time_date ? form.time_date[1] : ''
      if (startTime) {
        payload.startTime = startTime
        payload.endTime = endTime
      }
      this.handleFilter(payload)
    },
  },

  mounted() {
    this.fetchTableList()
  },
}
</script>

<style></style>
