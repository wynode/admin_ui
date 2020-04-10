<template>
  <div>
    <el-form :model="form" ref="form" label-position="left" :rules="rules">
      <el-card class="Mb24">
        <h1 slot="header" class="Fwb Fz20">角色信息</h1>

        <el-form-item prop="name" label="角色名称:">
          <el-input
            v-model="form.name"
            size="small"
            style="width:200px"
          ></el-input>
        </el-form-item>
      </el-card>

      <el-card>
        <h1 slot="header" class="Fwb Fz20">角色权限</h1>

        <el-form-item>
          <el-table
            ref="roleTable"
            :data="permsData"
            border
            class="el_table_ow"
            @select="handleSelectRow"
            @select-all="handleSelectAll"
          >
            <el-table-column align="center" type="selection"></el-table-column>
            <el-table-column :resizable="false" label="功能模块" :width="150">
              <template slot-scope="scope">
                {{ scope.row.business_module }}
              </template>
            </el-table-column>

            <el-table-column :resizable="false" label="权限设置">
              <template slot-scope="scope">
                <el-checkbox-group
                  v-model="form.perms"
                  @change="toggleRowSelection"
                  class="A"
                >
                  <el-checkbox
                    v-for="(perm, index) in scope.row.perms"
                    :label="perm.codename"
                    :key="`${perm.codename}-${index}`"
                  >
                    {{ perm.name }}
                  </el-checkbox>
                </el-checkbox-group>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>

        <div class="btn-wrap TaEnd">
          <el-button @click="$router.back()" icon="el-icon-back">
            返回
          </el-button>
          <el-button type="primary" @click="handleSubmit" :loading="btnLoading">
            确定
          </el-button>
        </div>
      </el-card>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import pullAll from 'lodash/pullAll'
import uniq from 'lodash/uniq'
import { fetchRoleById, postRole, patchRole } from '@/apis/role'
import { allErrors } from '@/utils/errorFormat'

const formInit = {
  name: '',
  perms: [],
}

export default {
  name: 'RoleProfile',

  data() {
    return {
      form: { ...formInit },
      btnLoading: false,
    }
  },

  computed: {
    ...mapState('role', {
      permsData: (state) => state.permsConfig,
    }),
    ...mapGetters('role', ['allPerms']),

    rules() {
      return {
        filing_type: [
          { required: true, message: '请选择报备类型', trigger: 'blur' },
        ],
      }
    },

    title() {
      return `${this.type === 'add' ? '添加' : '编辑'}角色`
    },

    roleId() {
      return this.$route.params.id
    },

    type() {
      return this.roleId ? 'edit' : 'add'
    },
  },

  methods: {
    ...mapActions('role', ['fetchPermsConfig']),

    handleSelectRow(selection, row) {
      const permsArray = row.perms.map((item) => item.codename)
      let formsPerms = cloneDeep(this.form.perms)
      const isFullChose = permsArray.every((per) =>
        this.form.perms.includes(per)
      )
      if (isFullChose) {
        pullAll(formsPerms, permsArray)
      } else {
        formsPerms = uniq([...formsPerms, ...permsArray])
      }
      this.form.perms = []
      this.form.perms = formsPerms
    },

    handleSelectAll(selection) {
      this.form.perms = selection.length === 0 ? [] : this.allPerms
    },

    toggleRowSelection() {
      this.permsData.forEach((row) => {
        const len = row.perms.filter((item) =>
          this.form.perms.includes(item.codename)
        )
        this.$nextTick(() => {
          this.$refs.roleTable.toggleRowSelection(
            row,
            len.length === row.perms.length
          )
        })
      })
    },

    async handleSubmit() {
      this.btnLoading = true

      try {
        if (this.roleId != null) {
          await patchRole(this.roleId, this.form)
        } else {
          await postRole(this.form)
        }
        this.$message.success(`${this.title}成功`)
        this.btnLoading = false
        this.$router.back()
      } catch (error) {
        allErrors(error.data)
      } finally {
        this.btnLoading = false
      }
    },

    async fetchRoleById() {
      const data = await fetchRoleById(this.roleId)
      this.form = data
      this.toggleRowSelection()
    },
  },

  mounted() {
    this.fetchPermsConfig()
    if (this.roleId) {
      this.fetchRoleById()
    }
  },
}
</script>
