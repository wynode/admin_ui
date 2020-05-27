<template>
  <div class="ip_list">
    <el-card>
      <EffectForm
        ref="effectForm"
        inline
        size="small"
        label-position="top"
        cancelText="重置"
        :effects="handleFormEffects"
        @submit="handleFilter"
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
      <el-button
        size="small"
        type="primary"
        class="Mb20 Mr20"
        @click="handleNewIp"
      >
        新增IP
      </el-button>

      <Txcel
        v-loading="mixTableLoading"
        element-loading-text="数据加载中"
        class="Txcel"
        :data="tableList"
        :columns="IpListCols"
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
import { fetchIPList, postIP, patchIP, delIP } from '@/apis/all'
import { IpListCols } from './tableConfig'
import EditIp from './EditIp'
import { notifyFields } from './formConfig'
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
    notifyFields() {
      return notifyFields(this)
    },
    fetchTableListMethod() {
      return fetchIPList
    },

    IpListCols() {
      return IpListCols(this)
    },
  },

  methods: {
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

    // async fetchTableList() {
    //   this.mixTableLoading = true
    //   const res = await this.fetchTableListMethod(
    //     this.filtersMutate.parse(this.filtersCache)
    //   )
    //   const size = (this.pager.page - 1) * 10
    //   this.tableListall = res.result.list
    //   this.tableListx = res.result.list.slice(size, size + 10) || []
    //   this.tableTotalx = res.result.list.length
    //   this.mixTableLoading = false
    // },

    // handleTableChangex(pager) {
    //   const size = (pager.page - 1) * 10
    //   this.pager = {
    //     ...pager,
    //   }
    //   this.tableListx = this.tableListall.slice(size, size + 10)
    // },
    handleFormEffects(subscribe) {
      subscribe('onFieldInit', (fields) => {
        if (fields.type) {
          fields.type.fieldValue = ''
        }
      })
      subscribe('onFieldChange', 'type', (value, form) => {
        this.handleFilter(form)
      })
    },
    langtoip(lang) {
      return ip.fromLong(lang)
    },

    handleNewIp() {
      this.$createDialog(
        {
          title: '新增IP',
          width: '600px',
          onSubmit: async (instance, slotRef) => {
            if (slotRef.$refs.effectForm) {
              const { effectForm } = slotRef.$refs
              if (await effectForm.useValidator()) {
                const form = slotRef.$refs.effectForm.getForm()
                if (!form.expire) {
                  form.expire = null
                }
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

    modifyUpstream(row) {
      this.$createDialog(
        {
          title: '更新IP',
          width: '600px',
          validate: false,
          onSubmit: async (instance, slotRef) => {
            const form = slotRef.$refs.effectForm.getForm()
            await patchIP({
              ip: this.langtoip(row.ip),
              ...form,
            })
            this.fetchTableList()
            this.$notify.success('修改成功')
            instance.close()
          },
        },
        () => <EditIp meta={row} />
      ).show()
    },

    async delUpstream(row) {
      const ifDel = await this.$confirm('请确认此删除操作, 是否继续?', '提示', {
        type: 'warning',
      }).catch(() => {
        this.$notify.info('操作取消')
        return false
      })

      if (ifDel) {
        await delIP({ ip: this.langtoip(row.ip) })
        this.$notify.success('删除成功')
        this.fetchTableList()
      }
    },
  },

  mounted() {
    this.fetchTableList()
  },
}
</script>

<style lang="scss">
.ip_list {
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
