<template>
  <div>
    <el-card>
      <div class="Df Mb24">
        <el-input
          v-model="filters.search"
          class="g_search Mla"
          placeholder="姓名、工号"
          @keyup.enter.native="handleSearch"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="handleSearch"
          ></el-button>
        </el-input>
      </div>

      <regular-filter
        ref="userprofileadminview"
        :form-ref="$refs.effectForm"
        v-bind="regularConfig"
        :search="filters.search"
        @change="handleRegulareFilter"
      ></regular-filter>

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

    <el-card class="Mt24">
      <div class="Mb16">
        <el-button size="small" type="primary" @click="handleUpdateUserStatus">
          编辑用户状态
        </el-button>
        <el-button
          size="small"
          type="primary"
          class="Mb20"
          @click="checkSelection() && handleAssignRoles()"
        >
          分配角色
        </el-button>
        <el-button
          size="small"
          type="primary"
          @click="
            handleExportCSV('/user/admin/userprofile/csv_view/', '用户导出')
          "
        >
          导出
        </el-button>
        <el-button
          size="small"
          type="primary"
          class="Mb20"
          @click="checkSelection() && handleAssignLevel()"
        >
          分配派单等级
        </el-button>
      </div>

      <Txcel
        v-loading="mixTableLoading"
        element-loading-text="数据加载中"
        class="Txcel"
        :data="tableList"
        :columns="userListCols"
        :rowSelection="{ onChange: handleSelectionChange }"
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
import {
  fetchUserList,
  putUsersStatus,
  postAssignRole,
  postUserAssignLevel,
} from '@/apis/users'
import { fetchOptsPosition, fetchOptsDepartment } from '@/apis/options'
import { getMapOptions } from '@/utils/mappings'
import { allErrors } from '@/utils/errorFormat'
import debounce from 'lodash/debounce'
import { fetchRolesOpts } from '@/apis/role'
import { userListCols } from './tableConfig'
import RoleAssign from './RoleAssign.vue'
import AssignLevelDialog from './AssignLevelDialog.vue'
import { filterFields, filterFieldsMutation } from './formConfig'
import { UserprofileadminviewCommonStat } from '@/apis/regularfilter'
import RegularFilter from '@/components/regular_filter'

const table = tableMixins({
  pagerInit: { page: 1, page_size: 10 },
  filtersInit: { search: '' },
  filtersMutateInit: filterFieldsMutation,
})

export default {
  name: 'UserList',

  mixins: [table],

  components: {
    RegularFilter,
  },

  data() {
    return {
      modifyUserStatus: '',
      selectedUsers: [],
      departmentOpts: [],
      positionOpts: [],
      rolesList: [],
    }
  },

  computed: {
    fetchTableListMethod() {
      return fetchUserList
    },

    userListCols() {
      return userListCols(this)
    },

    filterFields() {
      return filterFields(this)
    },

    userStatusOpts() {
      return getMapOptions('userStatus')
    },
    regularConfig() {
      return {
        appName: 'userprofileadminview',
        mutate: filterFieldsMutation,
        appStstc: UserprofileadminviewCommonStat,
      }
    },
  },

  methods: {
    checkSelection() {
      if (this.selectedUsers.length <= 0) {
        this.$notify.info('请勾选员工')
        return false
      }
      return true
    },

    handleSelectionChange(selected) {
      this.selectedUsers = selected.map((user) => user.id)
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
                  user_list: this.selectedUsers,
                  role_list: childVM.form.group_ids,
                })
                this.$message.success('角色添加成功!')
                this.fetchTableList(this.filtesrCache)
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

    // 分配领单等级
    async handleAssignLevel() {
      this.$createDialog(
        {
          title: '分配领单等级',
          width: '700px',
          onSubmit: debounce(async (instance, childVM) => {
            if (childVM) {
              try {
                if (!childVM.form.group_ids.length) {
                  this.$message.info('请选择领单等级')
                  return
                }
                await postUserAssignLevel({
                  user_list: this.selectedUsers,
                  level_list: childVM.form.group_ids,
                })
                this.$message.success('领单等级编辑成功!')
                this.fetchTableList(this.filtesrCache)
                instance.close()
              } catch (error) {
                allErrors(error.data || error)
              }
            }
          }, 200),
        },
        () => <AssignLevelDialog />
      ).show()
    },

    handleUpdateUserStatus() {
      if (this.selectedUsers.length > 0) {
        this.$createDialog(
          {
            title: '编辑用户状态',
            validate: false,
            onSubmit: async (instance) => {
              try {
                await putUsersStatus({
                  ids: this.selectedUsers,
                  status: this.modifyUserStatus,
                })
                this.fetchTableList(this.filtersCache)
                this.$notify.success('修改成功')
                instance.close()
              } catch (error) {
                allErrors(error.data || error)
              }
            },
            onCancel: () => {
              this.modifyUserStatus = ''
            },
          },
          () => (
            <el-radio-group vModel={this.modifyUserStatus}>
              {this.userStatusOpts.map((status) => {
                return <el-radio label={status.value}>{status.label}</el-radio>
              })}
            </el-radio-group>
          )
        ).show()
      } else {
        this.$notify.info('请选择用户')
      }
    },
  },

  mounted() {
    this.fetchTableList()
    fetchOptsPosition().then((data) => {
      this.positionOpts = data || []
    })
    fetchOptsDepartment().then((data) => {
      this.departmentOpts = data || []
    })
    fetchRolesOpts().then((data) => {
      this.rolesList = data.results.map((role) => {
        return {
          label: role.name,
          value: role.id,
        }
      })
    })
  },
}
</script>

<style></style>
