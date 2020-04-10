<template>
  <div class="gb_wrap">
    <el-card class="Mb24">
      <div class="Df Mb24">
        <el-input
          v-model="filters.search"
          class="g_search Mla"
          placeholder="姓名、用户名、手机号"
          @keyup.enter.native="handleSearch"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="handleSearch"
          ></el-button>
        </el-input>
      </div>

      <EffectForm
        ref="effectForm"
        inline
        size="small"
        label-position="top"
        cancelText="重置"
        @submit="handleFilter"
        @cancel="handleFilterReset"
      >
        <EffectFormField
          v-for="field in filterFields"
          v-bind="field"
          :key="field.name"
        />
      </EffectForm>
    </el-card>

    <el-card>
      <el-button
        size="small"
        type="primary"
        class="Mb20"
        @click="handleCreateAppVersion"
      >
        新建
      </el-button>

      <Txcel
        ref="table"
        v-loading="mixTableLoading"
        class="Txcel"
        :data="tableList"
        :columns="rowCols"
        :pager="{
          page: pager.page,
          page_size: pager.page_size,
          layout: 'total,prev,pager,next,jumper',
          total: tableTotal,
        }"
        @change="handleTableChange"
      />
    </el-card>

    <EditAppVersion ref="dialog" v-bind="dialogAttrs" v-on="dialogEvents" />
  </div>
</template>

<script>
import table from '@/mixins/table'
import {
  postAppVerion,
  fetchAppVerions,
  patchAppVerion,
  deleteAppVerion,
} from '@/apis/system'
import { rowCols } from './tableConfig'
import { filterFields, filtersMutateInit } from './formConfig'
import AssignTemplate from './EditAppVersion.vue'

const pagerInit = {
  page: 1,
  page_size: 10,
}

const tableMixins = table({
  pagerInit,
  filtersInit: { search: '' },
  filtersMutateInit,
})

export default {
  name: 'AppVersion',

  mixins: [tableMixins],

  components: {
    EditAppVersion: AssignTemplate,
  },

  data() {
    return {
      dialogAttrs: {},
      dialogEvents: {},
    }
  },

  computed: {
    fetchTableListMethod() {
      return fetchAppVerions
    },

    filterFields() {
      return filterFields(this)
    },

    rowCols() {
      return rowCols(this)
    },
  },

  methods: {
    // 新建版本
    async handleCreateAppVersion() {
      const that = this

      this.dialogAttrs = {
        title: '新建版本',
      }

      this.dialogEvents = {
        onSubmit(form, instance) {
          postAppVerion({ ...form }).then(() => {
            that.$message.success('新建版本成功!')
            that.pager = { ...pagerInit }
            that.fetchTableList()
            instance.visible = false
          })
        },
        onCancel(instance) {
          instance.visible = false
        },
      }

      this.$refs.dialog.visible = true
    },

    handleEditAppVersion(row) {
      const that = this
      this.dialogAttrs = {
        title: '编辑版本',
      }

      this.dialogEvents = {
        onSubmit(form, instance) {
          patchAppVerion(row.id, { ...form }).then(() => {
            that.$message.success('编辑版本成功!')
            that.fetchTableList(that.filtersCache)
            instance.visible = false
          })
        },
        onCancel(instance) {
          instance.visible = false
        },
      }

      this.$refs.dialog.setForm(row)
      this.$refs.dialog.visible = true
    },

    async handleDeleteAppVersion(row) {
      const ifDel = await this.$confirm('确定要删除版本吗', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch(() => {
        this.$notify.info('操作已取消')
        return false
      })

      if (ifDel) {
        await deleteAppVerion(row.id)
        this.$message.success('删除成功')
        this.fetchTableList(this.filtersCache)
      }
    },

    async handleChangeStatusAppVersion(row) {
      const ifChange = await this.$confirm('确定要改变版本状态吗', '修改', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch(() => {
        this.$notify.info('操作已取消')
        return false
      })

      if (ifChange) {
        await patchAppVerion(row.id, {
          status: parseInt(row.status) === 1 ? 0 : 1,
        })
        this.$message.success('修改成功')
        this.fetchTableList(this.filtersCache)
      }
    },
  },

  mounted() {
    this.fetchTableList()
  },
}
</script>
