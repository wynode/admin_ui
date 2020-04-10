<template>
  <el-form
    ref="ruleForm"
    :model="form"
    label-position="center"
    label-width="80px"
  >
    <el-form-item label="角色选择">
      <el-select v-model="form.group_ids" multiple placeholder="请选择">
        <el-option
          v-for="item in roles"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
import { fetchRolesOpts } from '@/apis/role'

export default {
  name: 'RoleAssign',

  data() {
    return {
      form: {},
      roles: {},
    }
  },

  methods: {
    async requestParents() {
      const roles = await fetchRolesOpts()
      this.roles = roles.results || []
    },
  },

  mounted() {
    this.requestParents()
  },
}
</script>
