<template>
  <el-form
    ref="ruleForm"
    :model="form"
    label-position="center"
    label-width="80px"
    :rules="rules"
  >
    <el-form-item label="领单等级" prop="group_ids">
      <el-checkbox-group v-model="form.group_ids">
        <el-checkbox v-for="item in levels" :key="item.id" :label="item.id">
          {{ item.name }}
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
  </el-form>
</template>

<script>
import { fetchAssignLevelSimple } from '@/apis/system'

export default {
  name: 'AssignLevelDialog',

  data() {
    return {
      form: {
        group_ids: [],
      },
      levels: [],
    }
  },

  computed: {
    rules() {
      return {
        group_ids: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个领单等级',
            trigger: 'change',
          },
        ],
      }
    },
  },

  mounted() {
    fetchAssignLevelSimple().then((data) => {
      this.levels = data.results || []
    })
  },
}
</script>
