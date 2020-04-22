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
import { startOfDay, endOfDay } from 'date-fns'
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
    langtoip(lang) {
      return ip.fromLong(lang)
    },
    handleFilterFn(form) {
      let payload = (payload = {
        ip: form.ip,
        uuid: form.uuid,
      })
      const startTime = form.time_date ? form.time_date[0] : ''
      const endTime = form.time_date ? form.time_date[1] : ''
      if (startTime) {
        payload.startTime = dateFormat(startTime)
        payload.endTime = dateFormat(endTime)
      }
      this.handleFilter(payload)
    },

    handleFormEffects(subscribe) {
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
      this.handleFilterFn({
        time_date: [startOfDay(new Date()), endOfDay(new Date())],
      })
    }
  },
}
</script>

<style></style>
