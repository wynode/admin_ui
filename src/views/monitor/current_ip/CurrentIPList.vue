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

    <el-card class="Mt15">
      <Txcel
        v-loading="mixTableLoading"
        element-loading-text="数据加载中"
        class="Txcel"
        :data="tableList"
        :columns="urlListCols"
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
  fetchIPAccessList,
  // fetchUrlInfo,
} from '@/apis/monitor'
import { urlListCols } from './tableConfig'
import { notifyFields } from './formConfig'
import ip from 'ip'
// import { patchIP } from '@/apis/all'
// import EditUrl from './EditUrl'

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
      return fetchIPAccessList
    },
    urlListCols() {
      return urlListCols(this)
    },
    notifyFields() {
      return notifyFields(this)
    },
  },

  methods: {
    handleFilterFn(form) {
      // const payload = {
      //   startDate: form.notify_date[0],
      //   endDate: form.notify_date[1],
      // }
      this.handleFilter(form)
    },

    langtoip(lang) {
      return ip.fromLong(lang)
    },

    handleFormEffects(subscribe) {
      subscribe('onFieldChange', 'orderType', (value, form) => {
        if (value) {
          this.handleFilterFn(form)
        }
      })
    },

    goattack(row) {
      this.$router.push({
        name: 'logAttack',
        query: {
          ip: row.ip,
        },
      })
    },

    goaccess(row) {
      this.$router.push({
        name: 'logAccess',
        query: {
          ip: row.ip,
        },
      })
    },

    goblack() {
      // console.log(row)
      // patchIP({
      //   ip: this.langtoip(row.ip),
      //   type: 2,
      //   note: '12312',
      // })
    },

    gowhite() {
      // console.log(row)
    },
  },

  mounted() {
    this.fetchTableList()
  },
}
</script>

<style></style>
