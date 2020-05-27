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
      <Txcelx
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
import Txcelx from './Txcelx'
import {
  fetchIPAccessList,
  // fetchUrlInfo,
} from '@/apis/monitor'
import { urlListCols } from './tableConfig'
import { notifyFields } from './formConfig'
import ip from 'ip'
import { postIP, delIP } from '@/apis/all'

import EditIp from './EditIp'
import EditWhite from './EditWhite'
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

  components: {
    Txcelx,
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

    goipHistory(row) {
      this.$router.push({
        name: 'monitorIpHistory',
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

    goblack(row) {
      this.$createDialog(
        {
          title: '拉黑IP',
          width: '600px',
          onSubmit: async (instance, slotRef) => {
            if (slotRef.$refs.effectForm) {
              const { effectForm } = slotRef.$refs
              if (await effectForm.useValidator()) {
                const form = slotRef.$refs.effectForm.getForm()
                if (!form.expire) {
                  form.expire = null
                }
                form.type = 2
                form.ip = this.langtoip(row.ip)
                await postIP(form)
                this.fetchTableList()
                this.$notify.success('新增成功')
                instance.close()
              }
            }
          },
        },
        () => <EditIp />
      ).show()
    },

    async gowhite(row) {
      this.$createDialog(
        {
          title: 'IP加入白名单',
          width: '600px',
          onSubmit: async (instance, slotRef) => {
            if (slotRef.$refs.effectForm) {
              const { effectForm } = slotRef.$refs
              if (await effectForm.useValidator()) {
                const form = slotRef.$refs.effectForm.getForm()

                form.type = 1
                form.ip = this.langtoip(row.ip)
                await postIP(form)
                this.fetchTableList()
                this.$notify.success('IP加入白名单成功')
                instance.close()
              }
            }
          },
        },
        () => <EditWhite />
      ).show()
    },

    async delblackorwhite(row) {
      const ifDel = await this.$confirm(
        '请确认将该IP黑白名单记录删除, 是否继续?',
        '提示',
        {
          type: 'warning',
        }
      ).catch(() => {
        this.$notify.info('操作取消')
        return false
      })

      if (ifDel) {
        await delIP({ ip: this.langtoip(row.ip) })
        this.$notify.success('加入白名单成功')
        this.fetchTableList()
      }
    },
  },

  mounted() {
    this.fetchTableList({ orderType: 1 })
  },
}
</script>

<style></style>
