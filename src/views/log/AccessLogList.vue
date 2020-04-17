<template>
  <div class="access_list">
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
          v-for="field in accessFields"
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
        :columns="accessLogListCols"
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
import { fetchAccessLogList } from '@/apis/all'
import { accessLogListCols } from './tableConfig'
import { accessFields } from './formConfig'

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
      return fetchAccessLogList
    },

    accessFields() {
      return accessFields(this)
    },

    accessLogListCols() {
      return accessLogListCols(this)
    },
  },

  methods: {
    handleFilterFn(form) {
      let payload = (payload = {
        ip: form.ip,
        date: form.date,
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

<style lang="scss">
.access_list {
  .el-pagination {
    .el-pagination__total {
      display: none;
    }
  }

  .el-pager {
    display: none;
  }
}
</style>
