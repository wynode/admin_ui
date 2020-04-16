<template>
  <div class="base_setting">
    <el-card class="Mt15">
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
import { fetchBaseSetting, patchBaseSetting } from '@/apis/all'
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
      return fetchBaseSetting
    },

    IpListCols() {
      return IpListCols(this)
    },
  },

  methods: {
    modifyUpstream(row) {
      this.$createDialog(
        {
          title: `更新${row.item}`,
          width: '600px',
          validate: false,
          onSubmit: async (instance, slotRef) => {
            const form = slotRef.$refs.effectForm.getForm()
            await patchBaseSetting({
              key: row.item,
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
  },

  mounted() {
    this.fetchTableList()
  },
}
</script>

<style lang="scss">
.base_setting {
  .el-pagination {
    display: none;
  }
  .txcel_wrap {
    padding: 15px 0;
  }
}
</style>
