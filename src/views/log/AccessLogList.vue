<template>
  <div class="access_list">
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
import { fetchAccessLogList } from '@/apis/all'
import { accessLogListCols } from './tableConfig'
import { accessFields } from './formConfig'
import ip from 'ip'

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
    langtoip(lang) {
      return ip.fromLong(lang)
    },
    handleFilterFn(form) {
      let payload = (payload = {
        ip: form.ip,
        date: form.date,
        uuid: form.uuid,
      })
      const startTime = form.time_date ? form.time_date[0] : ''
      const endTime = form.time_date ? form.time_date[1] : ''
      if (startTime) {
        payload.startTime = startTime
        payload.endTime = endTime
      }
      this.handleFilter(payload)
    },

    handleFormEffects(subscribe) {
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

    goSelfIp(row) {
      const { getForm, setForm } = this.$refs.effectForm
      setForm('ip', this.langtoip(row.ip))
      const data = getForm()
      this.handleFilterFn(data)
    },

    goSelfUuid(row) {
      const { getForm, setForm } = this.$refs.effectForm
      setForm('uuid', row.uuid)
      const data = getForm()
      this.handleFilterFn(data)
    },
  },

  mounted() {
    const { ip, uuid } = this.$route.query
    if (ip || uuid) {
      this.$nextTick(() => {
        const { getForm, setForm } = this.$refs.effectForm
        if (ip) {
          setForm('ip', this.langtoip(ip))
        }
        if (uuid) {
          setForm('uuid', uuid)
        }
        const data = getForm()
        this.handleFilterFn(data)
      })
    } else {
      this.fetchTableList()
    }
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
