<template>
  <div class="base_setting">
    <el-card class="Mt15">
      <Txcelb
        v-loading="mixTableLoading"
        element-loading-text="数据加载中"
        class="Txcel"
        :data="tableList1"
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
import Txcelb from './Txcelb'

const table = tableMixins({
  pagerInit: { page: 1, page_size: 10 },
})

export default {
  name: 'UserList',

  mixins: [table],

  components: {
    Txcelb,
  },

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

    tableList1() {
      let tableList = []
      const keys = Object.keys(this.tableList)
      keys.forEach((item) => {
        tableList.push({ item })
        tableList = tableList.concat(this.tableList[item])
      })
      return tableList || []
    },
  },

  methods: {
    modifyUpstream(row) {
      this.$createDialog(
        {
          title: `更新 ${row.item};(${row.note})`,
          showTwo: true,
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
  .header_row {
    font-size: 16px;
    font-weight: bold;
    text-align: left;
    .cell {
      text-align: left;
      margin-left: 10px;
    }
  }
}
</style>
