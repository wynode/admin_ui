<template>
  <div class="gb_wrap">
    <el-card>
      <el-button
        type="primary"
        icon="el-icon-plus"
        size="small"
        @click="handleAddRole"
      >
        新增角色
      </el-button>

      <Txcel
        ref="table"
        v-loading="mixTableLoading"
        :data="tableList"
        :columns="cols"
        :pager="{
          page: pager.page,
          page_size: pager.page_size,
          layout: 'total,prev,pager,next,jumper',
          total: tableTotal,
        }"
        class="Txcel Mt24"
        @change="handleTableChange"
      />
    </el-card>
  </div>
</template>

<script>
import { fetchRoles, deleteRole } from '@/apis/role'
import { roleCols } from './tableConfig'
import table from '@/mixins/table'

const tableMixins = table({
  pagerInit: { page: 1, page_size: 10 },
})

export default {
  mixins: [tableMixins],

  computed: {
    fetchTableListMethod() {
      return fetchRoles
    },

    cols() {
      return roleCols(this)
    },
  },

  methods: {
    handleAddRole() {
      this.$router.push({ name: 'RoleProfile' })
    },

    handleEditRole(row) {
      this.$router.push({ name: 'RoleProfile', params: { id: row.id } })
    },

    async handleDeleteRole(row) {
      await this.$confirm('确定要删除角色吗', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
      await deleteRole(row.id)
      this.$message.success('删除成功')
      this.fetchTableList(this.filtersCache)
    },
  },

  mounted() {
    this.fetchTableList()
  },
}
</script>
