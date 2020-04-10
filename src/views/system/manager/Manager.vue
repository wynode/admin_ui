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
        @click="checkSelection() && handleAssignRoles()"
      >
        分配角色
      </el-button>

      <txcel
        ref="table"
        v-loading="mixTableLoading"
        class="Txcel"
        :data="tableList"
        :columns="managerCols"
        :rowSelection="{ onChange: handleStaffSelection }"
        :pager="{
          page: pager.page,
          page_size: pager.page_size,
          layout: 'total,prev,pager,next,jumper',
          total: tableTotal,
        }"
        @change="handleTableChange"
      ></txcel>
    </el-card>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import table from '@/mixins/table'
import { postAssignRole, fetchManagers } from '@/apis/manager'
import { fetchOptsPosition } from '@/apis/options'
import { allErrors } from '@/utils/errorFormat'
import { managerCols } from './tableConfig'
import { filterFields, filtersMutate } from './formConfig'
import RoleAssign from './RoleAssign.vue'

const tableMixins = table({
  pagerInit: { page: 1, page_size: 10 },
  filtersInit: { search: '' },
  filtersMutateInit: filtersMutate,
})

export default {
  name: 'Manager',

  mixins: [tableMixins],

  data() {
    return {
      userList: [],
      positionOpts: [],
    }
  },

  computed: {
    fetchTableListMethod() {
      return fetchManagers
    },

    filterFields() {
      return filterFields(this)
    },

    managerCols() {
      return managerCols(this)
    },
  },

  methods: {
    checkSelection() {
      if (this.userList.length <= 0) {
        this.$notify.info('请勾选员工')
        return false
      }
      return true
    },

    handleStaffSelection(staffs) {
      this.userList = staffs.map((s) => s.id)
    },

    // 分配角色
    async handleAssignRoles() {
      this.$createDialog(
        {
          title: '分配角色',
          width: '700px',
          onSubmit: debounce(async (instance, childVM) => {
            if (childVM) {
              try {
                await postAssignRole({
                  user_list: this.userList,
                  role_list: childVM.form.group_ids,
                })
                this.$message.success('角色添加成功!')
                this.fetchTableList(this.filtersCache)
                instance.close()
              } catch (error) {
                allErrors(error.data || error)
              }
            }
          }, 200),
        },
        () => <RoleAssign />
      ).show()
    },
  },

  mounted() {
    this.fetchTableList()
    fetchOptsPosition().then((data) => {
      this.positionOpts = data || []
    })
  },
}
</script>
