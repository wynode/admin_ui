<template>
  <div class="ip_access_list">
    <el-card>
      <EffectForm
        ref="effectForm"
        inline
        size="small"
        label-position="top"
        cancelText="重置"
        :effects="handleFormEffects"
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
import { fetchIpAccessLogList } from '@/apis/all'
import { accessLogListCols } from './tableConfig'
import { accessFields } from './formConfig'
import ip from 'ip'
import { dateFormat } from '@/utils/dateFormat'

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
      return fetchIpAccessLogList
    },

    accessFields() {
      return accessFields(this)
    },

    accessLogListCols() {
      return accessLogListCols(this)
    },
  },

  methods: {
    langtoip(lang) {
      return ip.fromLong(lang)
    },
    handleFilterFn(form) {
      let payload = (payload = {
        ip: form.ip,
        date: form.date,
      })
      this.handleFilter(payload)
    },

    handleFormEffects(subscribe) {
      // subscribe('onFieldInit', (fields) => {
      //   if (fields.date) {
      //     fields.date.defaultValue = new Date()
      //   }
      // })
      subscribe('onFieldChange', 'date', (value, form) => {
        if (value) {
          this.handleFilterFn(form)
        }
      })
      subscribe('onFieldChange', 'time_date', (value, form) => {
        if (value && value.length) {
          this.handleFilterFn(form)
        }
      })
    },
  },

  mounted() {
    this.fetchTableList({ date: dateFormat(new Date(), 'yyMMdd') })
  },
}
</script>

<style lang="scss">
.ip_access_list {
  .el-pagination {
    .el-pagination__total {
      display: none;
    }
  }

  .el-pager {
    display: none;
  }

  .el-button--default {
    display: none;
  }
}
</style>
