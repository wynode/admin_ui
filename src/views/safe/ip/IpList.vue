<template>
  <div>
    <el-card>
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
      return fetchIPList
    },

    IpListCols() {
      return IpListCols(this)
    },
  },

  methods: {
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
                await postIP(form)
                this.fetchTableList(this.filtersCache)
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
              ip: row.ip,
              ...form,
            })
            this.fetchTableList(this.filtersCache)
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
        await delIP({ ip: row.ip })
        this.$notify.success('删除成功')
        this.fetchTableList(this.filtersCache)
      }
    },
  },

  mounted() {
    this.fetchTableList()
  },
}
</script>

<style></style>
